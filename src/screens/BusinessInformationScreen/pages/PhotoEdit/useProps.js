import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createFormDataMulipleImage, createFormData } from "@shared/utils";

export const useProps = (_params) => {
  const dispatch = useDispatch();

  const {
    merchant: { merchantDetail = {} }
  } = useSelector(state => state);


  return {
    merchantDetail,

    onResponseImagePicker: () => {

    },

    onSave: () => {

    }
  };
};
