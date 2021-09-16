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
import NavigationService from '@navigation/NavigationService'

export const useProps = (props) => {
  const dispatch = useDispatch();

  const dialogDeleteCategoryRef = React.useRef();
  const [valueSearch, setSearchValue] = React.useState("");
  const [tempCategoryId, setTempCategoryId] = React.useState("");

  const { services } = useSelector(state => state.service);
  const { products } = useSelector(state => state.product);
  const { extras } = useSelector(state => state.extra);
  const categoryList = useSelector(state => state.category.category);
  const staff = useSelector(state => state.auth.staff);

  const [t] = useTranslation();

  const [, getCategoryList] = useAxiosQuery({
    ...getCategoryByMerchant(staff.merchantId),
    isLoadingDefault: true,
    enabled: false,
    onLoginSuccess: (data, response) => {
      dispatch(category.setCategoryList(data));
    },
  });

  const [, getServiceList] = useAxiosQuery({
    ...getService(staff.merchantId),
    isLoadingDefault: true,
    enabled: false,
    onLoginSuccess: (data, response) => {
      dispatch(service.setServiceList(data));
    },
  });


  const [, submitArchiveCategory] = useAxiosMutation({
    ...archiveCategory(),
    isLoadingDefault: true,
    onLoginSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        getCategoryList();
      }
    },
  });

  const [, submitRestoreCategory] = useAxiosMutation({
    ...restoreCategory(),
    isLoadingDefault: true,
    onLoginSuccess: (data, response) => {
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
    NavigationService.navigate(screenNames.CategoryNewScreen, { refreshCategory });
  }

  return {

    valueSearch,
    dialogDeleteCategoryRef,

    getDataList: () => {
      return categoryList.filter(cate => cate.isDisabled == 0).map((cate) => ({
        category: cate,
        data: services.filter((sv) => (sv.categoryId == cate.categoryId) && (sv.isDisabled == 0)),
      }))
    },

    onChangeSearch: (vl) => {
      setSearchValue(vl);
    },

    newCategory,
    setTempCategoryId,

    newService: () => {
      NavigationService.navigate(screenNames.ServiceNewScreen, { refreshService });
    },

    editService: (item) => {
      NavigationService.navigate(screenNames.ServiceNewScreen, { isEdit: true, serviceEdit: item, refreshService });
    },

    getActionSheets: (category) => [
      {
        id: 'new-category',
        label: t('New category'),
        func: () => newCategory(),
      },
      {
        id: 'edit-category',
        label: t('Edit category'),
        func: () => {
          NavigationService.navigate(screenNames.CategoryNewScreen, { refreshCategory, isEdit: true, categoryEdit: category });
        }
      },
      {
        id: 'delete-category',
        label: t('Delete category'),
        textColor: colors.red,
        func: () => {
          setTimeout(() => {
            setTempCategoryId(category.categoryId)
            dialogDeleteCategoryRef?.current?.show();
          }, 500);
        },
      },
    ],

    handleArchiveCategory: async () => {
      const data = {}
      const body = await archiveCategory(data, tempCategoryId);
      submitArchiveCategory(body.params);
    },

    handleRestoreCategory: async () => {

    },

  };
};
