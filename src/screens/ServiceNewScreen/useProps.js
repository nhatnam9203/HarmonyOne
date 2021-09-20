import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { serviceSchema } from "@shared/helpers/schema";
import { useSelector } from "react-redux";
import { useAxiosMutation, addNewService, editService } from '@src/apis';
import NavigationService from '@navigation/NavigationService'

export const useProps = (props) => {

  const categoryRef = React.useRef();
  const statusRef = React.useRef();
  const [fileId, setFileId] = React.useState("0");

  const form = useForm({
    resolver: yupResolver(serviceSchema)
  });
  const errors = form.formState.errors;
  const { setValue } = form;

  const isEdit = props?.route?.params?.isEdit;
  const serviceEdit = props?.route?.params?.serviceEdit;

  const categoryList = useSelector(state => state.category.category);

  const back = () => {
    NavigationService.back();
  }

  const [{ }, submitAddService] = useAxiosMutation({
    ...addNewService(),
    isLoadingDefault: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        props?.route?.params?.refreshService();
        back();
      }
    },
  });

  const [{ }, submitEditService] = useAxiosMutation({
    ...editService(),
    isLoadingDefault: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        props?.route?.params?.refreshService();
        back();
      }
    },
  });

  React.useEffect(() => {
    if (isEdit) {
      setValue("name", serviceEdit.name);
      setValue("description", serviceEdit.description);
      setValue("duration", serviceEdit.duration.toString());
      setValue("openTime", serviceEdit.openTime.toString());
      setValue("secondTime", serviceEdit.secondTime.toString());
      setValue("price", serviceEdit.price.toString());
      setValue("supplyFee", serviceEdit.supplyFee.toString());
      categoryRef?.current?.changeItem(serviceEdit.categoryId.toString());
      statusRef?.current?.changeItem(serviceEdit.isDisabled.toString());
    }
  }, []);


  return {
    form,
    errors,
    back,
    isEdit,
    categoryRef,
    statusRef,

    getDataSelectCategory: () => {
      return categoryList.filter(cate => (cate.isDisabled == 0) && (cate.categoryType === "Service")).map((cate) => ({
        ...cate,
        label: cate.name,
        value: cate.categoryId,
      }))
    },

    onSubmit: async (values) => {
      const data = {
        categoryId: values.category.value,
        name: values.name,
        description: values.description,
        duration: values.duration,
        openTime: values.openTime ? values.openTime : "0",
        secondTime: values.secondTime ? values.secondTime : "0",
        price: values.price,
        isDisabled: values.status.value,
        supplyFee: values.supplyFee ? values.supplyFee : "0",
        extras: [],
        fileId,
      }

      if (isEdit) {
        const body = await editService(data, serviceEdit.serviceId);
        submitEditService(body.params);
      } else {
        const body = await addNewService(data);
        submitAddService(body.params);
      }
    }
  };
};
