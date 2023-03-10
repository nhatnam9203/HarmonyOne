import React from "react";
import {
  useAxiosQuery,
  useAxiosMutation,
  getService,
  getCategoryByMerchant,
  getProduct,
  getExtra,
  archiveCategory,
  restoreCategory
} from '@src/apis';
import { service, product, category, extra } from '@redux/slices';
import { useSelector, useDispatch } from "react-redux";
import { colors } from "@shared/themes";
import { useTranslation } from "react-i18next";
import NavigationService from '@navigation/NavigationService';
import { translate } from "@localize";

export const useProps = (props) => {
  const dispatch = useDispatch();

  const dialogDeleteCategoryRef = React.useRef();
  const [valueSearch, setSearchValue] = React.useState("");
  const [tempCategory, setTempCategory] = React.useState("");
  const [isRefresh, setRefresh] = React.useState(false);

  const {
    service: { services },
    product: { products },
    extra: { extras },
    auth: { staff }
  } = useSelector(state => state)

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

  const [, getServiceList] = useAxiosQuery({
    ...getService(staff.merchantId),
    isLoadingDefault: true,
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(service.setServiceList(data));
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

  const refreshCategory = () => {
    getCategoryList();
  }

  const refreshService = () => {
    getServiceList();
  }

  const newCategory = () => {
    NavigationService.navigate(
      screenNames.CategoryNewScreen, { refreshCategory , categoryAddNew : "Service" }
    );
  }

  React.useEffect(()=>{
    if(isRefresh){
      getCategoryList();
      getServiceList();
    }
  },[isRefresh]);

  // React.useEffect(() => {
  //   getCategoryList();
  //   getServiceList();
  // }, []);

  return {

    valueSearch,
    dialogDeleteCategoryRef,
    tempCategory,
    newCategory,
    setTempCategory,
    isRefresh,
    onRefresh: () => {
      setRefresh(true);
    },

    getDataList: () => {
      let servicesList = services;
      if (valueSearch) {
        servicesList = servicesList.filter((e) => {
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

      return categoryList.filter(cate => cate.isDisabled == 0 && cate?.categoryType == "Service").map((cate) => {
        const dataList = servicesList.filter((sv) => (sv.categoryId == cate.categoryId));
        return {
          category: cate,
          data: servicesList.filter((sv) => (sv.categoryId == cate.categoryId)),
        }
      });
    },

    onChangeSearch: (vl) => {
      setSearchValue(vl);
    },

    newService: () => {
      NavigationService.navigate(screenNames.ServiceNewScreen, { refreshService  });
    },

    editService: (item) => {
      NavigationService.navigate(
        screenNames.ServiceNewScreen,
        { isEdit: true, serviceEdit: item, refreshService })
        ;
    },

    getActionSheets: (category) => [
      {
        id: 'new-service',
        label: translate('Add new service'),
        func: () => {
          NavigationService.navigate(
            screenNames.ServiceNewScreen,
            { categoryId : category.categoryId, isNewWithCategory: true , refreshService }
          );
        },
      },
      {
        id: 'edit-category',
        label: translate('Edit Category'),
        func: () => {
          NavigationService.navigate(
            screenNames.CategoryNewScreen,
            { refreshCategory, isEdit: true, categoryEdit: category }
          );
        }
      },
      {
        id: 'delete-category',
        label: translate('Delete category'),
        textColor: colors.red,
        func: () => {
          setTimeout(() => {
            setTempCategory(category)
            dialogDeleteCategoryRef?.current?.show();
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

  };
};
