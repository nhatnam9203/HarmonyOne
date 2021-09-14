import React from "react";
import { useSelector } from "react-redux";

export const useProps = (_params) => {

  const { services } = useSelector(state => state.service);
  const { products } = useSelector(state => state.product);
  const { extras } = useSelector(state => state.extra);
  const { category } = useSelector(state => state.category);


  return {
    getDataList: () => {
      return category.filter(cate => cate.isDisabled == 0).map((cate) => ({
        category: cate,
        data: services.filter((sv) => (sv.categoryId == cate.categoryId) && (sv.isDisabled == 0)),
      }))
    }
  };
};
 