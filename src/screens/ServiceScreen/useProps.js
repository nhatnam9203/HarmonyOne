import React from "react";
import { useSelector } from "react-redux";

export const useProps = (_params) => {

  const [valueSearch , setSearchValue ] = React.useState("");

  const { services } = useSelector(state => state.service);
  const { products } = useSelector(state => state.product);
  const { extras } = useSelector(state => state.extra);
  const { category } = useSelector(state => state.category);


  return {

    valueSearch,

    getDataList: () => {
      return category.filter(cate => cate.isDisabled == 0).map((cate) => ({
        category: cate,
        data: services.filter((sv) => (sv.categoryId == cate.categoryId) && (sv.isDisabled == 0)),
      }))
    },

    onChangeSearch : (vl) =>{
      setSearchValue(vl);
    },
  };
};
 