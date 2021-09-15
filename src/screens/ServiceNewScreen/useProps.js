import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { serviceSchema } from "@shared/helpers/schema";
import { useSelector } from "react-redux";
import { useAxiosMutation, addNewService } from '@src/apis';
import NavigationService from '@navigation/NavigationService'

export const useProps = (props) => {

  const statusRef = React.useRef();
  const categoryRef = React.useRef();

  const form = useForm({
    resolver: yupResolver(serviceSchema)
  });
  const errors = form.formState.errors;

  const categoryList = useSelector(state => state.category.category);

  const back = () =>{
    NavigationService.back();
  }

  const [{ isLoading }, mutate] = useAxiosMutation({
    ...addNewService(),
    isLoadingDefault: true,
    onLoginSuccess: (data, response) => {
        if (response?.codeNumber == 200) {
            props?.route?.params?.refreshService();
            back();
        }
    },
});


  return {
    form,
    errors,
    statusRef,
    categoryRef,
    back,

    getDataSelectCategory: () => {
      return categoryList.filter(cate => (cate.isDisabled == 0) && (cate.categoryType === "Service")).map((cate) => ({
        ...cate,
        label: cate.name,
        value: cate.categoryId,
      }))
    },

    onSubmit: async(values) => {
      const data = {
        categoryId: categoryRef?.current?.getValue(),
        name: values.name,
        description: values.description,
        duration: values.duration,
        openTime: values.openTime ? values.openTime : "0",
        secondTime: values.secondTime ? values.secondTime : "0",
        price: values.price,
        isDisabled: statusRef?.current?.getValue(),
        supplyFee: values.supplyFee ? values.supplyFee : "0",
        extras: [],
        fileId: 0,
      }

      const body = await addNewService(data);
      mutate(body.params);
    }
  };
};
