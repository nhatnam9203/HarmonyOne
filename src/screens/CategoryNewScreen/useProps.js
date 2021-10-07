import React from "react";
import { categorySchema } from "@shared/helpers/schema";
import { useAxiosMutation, addCategory, editCategory } from '@src/apis';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import NavigationService from '@navigation/NavigationService';

const categoryTypeList = [
  { label: "Service", value: "Service" },
  { label: "Product", value: "Product" },
];

export const useProps = (props) => {

  const form = useForm({
    resolver: yupResolver(categorySchema)
  });
  const errors = form.formState.errors;
  const { setValue } = form;
  const isEdit = props?.route?.params?.isEdit;
  const categoryEdit = props?.route?.params?.categoryEdit;
  const inputCategoryRef = React.useRef();

  const [, submitAddCategory] = useAxiosMutation({
    ...addCategory(),
    isLoadingDefault: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        props?.route?.params?.refreshCategory();
        NavigationService.back();
      }
    },
  });

  const [, submitEditCategory] = useAxiosMutation({
    ...editCategory(),
    isLoadingDefault: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        props?.route?.params?.refreshCategory();
        NavigationService.back();
      }
    },
  });

  React.useEffect(() => {
    if (isEdit) {
      setValue("categoryName", categoryEdit.name);
      const categoryType = categoryEdit.categoryType;
      const item = categoryTypeList.find(obj => obj.value == categoryType);
      if (item) {
        inputCategoryRef?.current?.changeValue(item);
      }
    }
  }, []);

  return {
    form,
    errors,
    inputCategoryRef,
    isEdit,
    categoryEdit,
    categoryTypeList,

    onSubmit: async (values) => {
      const { categoryName } = values;
      const categoryType = inputCategoryRef?.current?.getValue()?.value;

      const data = {
        categoryType,
        name: categoryName,
        isShowSignInApp: false,
      }

      if (isEdit) {
        const body = await editCategory(data, categoryEdit.categoryId);
        submitEditCategory(body.params);
      } else {
        const body = await addCategory(data);
        submitAddCategory(body.params);
      }
    }
  };
};
