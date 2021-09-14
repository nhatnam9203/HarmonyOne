import React from "react";
import { useAxiosQuery, getService, getCategoryByMerchant, getProduct, getExtra } from '@src/apis';
import { service, product, category, extra } from '@redux/slices';
import { useSelector, useDispatch } from "react-redux";
import NavigationService from '@navigation/NavigationService'

export const useProps = (props) => {
  const dispatch = useDispatch();

  const [valueSearch, setSearchValue] = React.useState("");

  const { services } = useSelector(state => state.service);
  const { products } = useSelector(state => state.product);
  const { extras } = useSelector(state => state.extra);
  const categoryList = useSelector(state => state.category.category);

  const staff = useSelector(state => state.auth.staff);


  const [{ }, getCategoryList] = useAxiosQuery({
    ...getCategoryByMerchant(staff.merchantId),
    isLoadingDefault: true,
    enabled: false,
    onLoginSuccess: (data, response) => {
      dispatch(category.setCategoryList(data));
    },
  });


  const refreshCategory = () => {
    getCategoryList();
  }

  return {

    valueSearch,

    getDataList: () => {
      return categoryList.filter(cate => cate.isDisabled == 0).map((cate) => ({
        category: cate,
        data: services.filter((sv) => (sv.categoryId == cate.categoryId) && (sv.isDisabled == 0)),
      }))
    },

    onChangeSearch: (vl) => {
      setSearchValue(vl);
    },

    newCategory : () => {
      NavigationService.navigate(screenNames.CategoryNewScreen, { refreshCategory });
    }
  };
};
