import React from "react";
import { useAxiosQuery, getService, getCategoryByMerchant, getProduct, getExtra } from '@src/apis';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from "react-redux";
import { service, product, category, extra } from '@redux/slices';


export const useProps = (_params) => {

  const staff = useSelector(state => state.auth.staff);

  const dispatch = useDispatch();

  const [{ }, getServiceList] = useAxiosQuery({
    ...getService(),
    isLoadingDefault: false,
    enabled: false,
    onLoginSuccess: (data, response) => {
      dispatch(service.setServiceList(data));
    },
  });

  const [{ }, getProductList] = useAxiosQuery({
    ...getProduct(),
    isLoadingDefault: false,
    enabled: false,
    onLoginSuccess: (data, response) => {
      dispatch(product.setProductList(data));
    },
  });

  const [{ }, getExtraList] = useAxiosQuery({
    ...getExtra(),
    isLoadingDefault: false,
    enabled: false,
    onLoginSuccess: (data, response) => {
      dispatch(extra.setExtraList(data));
    },
  });

  const [{ }, getCategoryList] = useAxiosQuery({
    ...getCategoryByMerchant(staff.merchantId),
    isLoadingDefault: false,
    enabled: false,
    onLoginSuccess: (data, response) => {
      dispatch(category.setCategoryList(data));
    },
  });

  React.useEffect(() => {
    getCategoryList();
    getServiceList();
    getProductList();
    getExtraList();
  }, []);


  return {

  };
};
