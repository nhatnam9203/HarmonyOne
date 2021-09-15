import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { serviceSchema } from "@shared/helpers/schema";
import { useSelector } from "react-redux";

export const useProps = (props) => {

  const statusRef = React.useRef();

  const form = useForm({
    resolver: yupResolver(serviceSchema)
  });
  const errors = form.formState.errors;

  const categoryList = useSelector(state => state.category.category);

  return {
    form,
    errors,
    statusRef,

    getDataSelectCategory : () =>{
      return categoryList.filter(cate=>cate.isDisabled == 0).map((cate) => ({
        ...cate,
        label : cate.name,
        value : cate.categoryId,
      }))
    },

    onSubmit : (data) =>{

    }
  };
};
