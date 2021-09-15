import React from "react";
import { categorySchema } from "@shared/helpers/schema";
import { useAxiosMutation, addCategory } from '@src/apis';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import NavigationService from '@navigation/NavigationService'

export const useProps = (props) => {

  const inputCategoryRef = React.useRef();

  const form = useForm({
    resolver: yupResolver(categorySchema)
  });
  const errors = form.formState.errors;

  const [{ isLoading }, mutate] = useAxiosMutation({
    ...addCategory(),
    isLoadingDefault: true,
    onLoginSuccess: (data, response) => {
        if (response?.codeNumber == 200) {
            props?.route?.params?.refreshCategory();
            NavigationService.back();
        }
    },
});



  return {
    form,
    errors,
    inputCategoryRef,

    onSubmit : async(values) =>{
      const { categoryName } = values;
      const categoryType = inputCategoryRef?.current?.getValue()?.value;

      const data = {
        categoryType,
        name : categoryName,
        isShowSignInApp : false,
      }

      const body = await addCategory(data);
      mutate(body.params);
    }
  };
};
