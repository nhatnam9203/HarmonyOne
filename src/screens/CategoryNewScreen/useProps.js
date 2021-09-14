import React from "react";
import { useForm } from "react-hook-form";
import { categorySchema } from "@shared/helpers/schema";
import { yupResolver } from '@hookform/resolvers/yup';

export const useProps = (_params) => {

  const form = useForm({
    resolver: yupResolver(categorySchema)
  });
  const errors = form.formState.errors;


  return {
    form,
    errors,

    onSubmit : (data) =>{
      
    }
  };
};
