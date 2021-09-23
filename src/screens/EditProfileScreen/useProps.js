import React from "react";
import { useAxiosMutation, addCategory, editCategory } from '@src/apis';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { profileStaffLoginSchema } from "@shared/helpers/schema";


export const useProps = (props) => {

  const form = useForm({
    resolver: yupResolver(profileStaffLoginSchema)
  });
  const { setValue } = form;
  const errors = form.formState.errors;

  const inputPhoneHeadRef = React.useRef();

  return {
    form,
    errors,
    inputPhoneHeadRef,

    onSubmit : (values) =>{

    }
  };
};
