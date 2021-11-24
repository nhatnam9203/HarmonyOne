import React from "react";
import {
  useAxiosQuery,
  useAxiosMutation,
  getCategoryByMerchant,
  getProduct,
  getExtra,
  archiveCategory,
  restoreCategory,
  exportProduct
} from '@src/apis';

import { Platform } from "react-native";
import { service, product, category, extra, app } from '@redux/slices';
import { useSelector, useDispatch } from "react-redux";
import { colors } from "@shared/themes";
import { useTranslation } from "react-i18next";
import Share from "react-native-share";

import NavigationService from '@navigation/NavigationService';
import RNFetchBlob from 'rn-fetch-blob';

export const useProps = (props) => {
  const dispatch = useDispatch();

  const dialogDeleteCategoryRef = React.useRef();
  const diaglogExport = React.useRef();

  const [valueSearch, setSearchValue] = React.useState("");
  const [tempCategory, setTempCategory] = React.useState("");
  const [isRefresh, setRefresh] = React.useState(false);

  const [isNeedToOrder, setNeedToOrder] = React.useState(false);
  const [exportType, setExportType] = React.useState("PDF")

  const {
    product: { products },
    extra: { extras },
    auth: { staff }
  } = useSelector(state => state);

  const categoryList = useSelector(state => state.category.category);

  const [t] = useTranslation();

  const [, getCategoryList] = useAxiosQuery({
    ...getCategoryByMerchant(staff.merchantId),
    isLoadingDefault: true,
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(category.setCategoryList(data));
    },
  });

  const [, getProductList] = useAxiosQuery({
    ...getProduct(staff.merchantId),
    isLoadingDefault: true,
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(product.setProductList(data));
      setRefresh(false)
    },
  });


  const [, submitArchiveCategory] = useAxiosMutation({
    ...archiveCategory(),
    isLoadingDefault: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        getCategoryList();
      }
    },
  });

  const [, submitRestoreCategory] = useAxiosMutation({
    ...restoreCategory(),
    isLoadingDefault: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        getCategoryList();
      }
    },
  });

  const [, getLinkExportProduct] = useAxiosQuery({
    ...exportProduct(staff?.merchantId, isNeedToOrder, exportType),
    enabled: false,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(app.showLoading());
        handleFileDownloaed(data);
      }
    }
  });

  const handleFileDownloaed = async (data) => {
    const dirs = RNFetchBlob.fs.dirs;
    const fileName = "Inventory";
    const extension = exportType == "EXCEL" ? "CSV" : exportType;
    const fileDownload = await RNFetchBlob.config({
      title: `${fileName}.${extension}`,
      fileCache: true,
      appendExt: `${extension}`,
      useDownloadManager: true,
      mediaScannable: true,
      notification: true,
      description: 'File downloaded by download manager.',
      path: `${dirs.DocumentDir}/${fileName}.${extension}`,
    }).fetch('GET', data.path, {});

    const pathFileInventory = await fileDownload.path();

    if (Platform.OS === 'ios') {
      await RNFetchBlob.ios.previewDocument(pathFileInventory)
    } else {
      // const android = await RNFetchBlob.android;
      // await android.actionViewIntent(pathFileInventory, 'application/vnd.android.package-archive')
      const shareResponse = await Share.open({
        url: `file://${pathFileInventory}`
      });
    }
    dispatch(app.hideLoading());
  }


  const refreshCategory = () => {
    getCategoryList();
  }

  const refreshProduct = () => {
    getProductList();
  }

  const newCategory = () => {
    NavigationService.navigate(
      screenNames.CategoryNewScreen, { refreshCategory }
    );
  }

  React.useEffect(() => {
    if (isRefresh) {
      getCategoryList();
      getProductList();
    }
  }, [isRefresh]);

  // React.useEffect(() => {
  //   getCategoryList();
  //   getProductList();
  // }, []);

  const datalist = categoryList.filter(
    cate => cate.isDisabled == 0 &&
      cate?.categoryType?.toString()?.toLowerCase() == "product"
  )

  return {

    valueSearch,
    dialogDeleteCategoryRef,
    diaglogExport,
    tempCategory,
    newCategory,
    setTempCategory,
    isRefresh,
    isNeedToOrder,
    setNeedToOrder,

    onRefresh: () => {
      setRefresh(true);
    },

    getDataList: () => {
      let productList = products;
      if (valueSearch) {
        productList = productList.filter((e) => {
          if (e !== null) {
            return (
              e.name
                .trim()
                .toLowerCase()
                .indexOf(valueSearch.toLowerCase()) !== -1
            );
          }
          return null;
        });
      }

      return categoryList.filter(
        cate => cate.isDisabled == 0 &&
          cate?.categoryType?.toString()?.toLowerCase() == "product"
      )
        .map((cate) => {
          const dataList = productList.filter((pro) => (pro.categoryId == cate.categoryId));
          return {
            category: cate,
            data: productList.filter((pro) => (pro.categoryId == cate.categoryId)),
          }
        });
    },

    onChangeSearch: (vl) => {
      setSearchValue(vl);
    },

    newProduct: () => {
      NavigationService.navigate(screenNames.ProductNewScreen, { refreshProduct , categoryAddNew : "Product"});
    },

    editProduct: (item) => {
      NavigationService.navigate(
        screenNames.ProductNewScreen,
        { isEdit: true, productEdit: item, refreshProduct })
        ;
    },

    getActionSheets: (category) => [
      {
        id: 'new-category',
        label: t('New product'),
        func: () => {
          NavigationService.navigate(
            screenNames.ProductNewScreen,
            { categoryId : category.categoryId, isNewWithCategory: true }
          );
        },
      },
      {
        id: 'edit-category',
        label: t('Edit category'),
        func: () => {
          NavigationService.navigate(
            screenNames.CategoryNewScreen,
            { refreshCategory, isEdit: true, categoryEdit: category }
          );
        }
      },
      {
        id: 'delete-category',
        label: t('Delete category'),
        textColor: colors.red,
        func: () => {
          setTimeout(() => {
            setTempCategory(category)
            dialogDeleteCategoryRef?.current?.show();
          }, 500);
        },
      },
    ],

    actionSheetExports: () => [
      {
        id: 'export-pdf',
        label: t('PDF'),
        func: () => {
          setTimeout(() => {
            diaglogExport?.current?.show();
            setExportType("PDF");
          }, 500);
        },
      },
      {
        id: 'export-excel',
        label: t('CSV'),
        func: () => {
          setTimeout(() => {
            diaglogExport?.current?.show();
            setExportType("EXCEL");
          }, 500);
        },
      },
    ],

    handleArchiveCategory: async () => {
      const data = {}
      const body = await archiveCategory(data, tempCategory.categoryId);
      setTimeout(() => {
        submitArchiveCategory(body.params);
      }, 200);
    },

    handleRestoreCategory: async () => {
      const data = {}
      const body = await restoreCategory(data, tempCategory.categoryId);
      setTimeout(() => {
        submitRestoreCategory(body.params);
      }, 200);
    },

    onExport: () => {
      getLinkExportProduct();
    }

  };
};
