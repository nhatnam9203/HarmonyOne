import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { extraSchema } from "@shared/helpers/schema";
import { useSelector } from "react-redux";
import { useAxiosMutation, addNewExtra, editExtra, uploadAvatarStaff, submitUploadAvatarStaff } from '@src/apis';
import { createFormData } from "@shared/utils";
import NavigationService from '@navigation/NavigationService'

export const useProps = (props) => {

  const statusRef = React.useRef();
  const inputPhoneHeadRef = React.useRef();
  const roleRef = React.useRef();

  const form = useForm({ resolver: yupResolver(extraSchema) });

  const { setValue } = form;
  const { errors } = form.formState;
  const isEdit = props?.route?.params?.isEdit;
  const extraEdit = props?.route?.params?.extraEdit;

  const [fileId, setFileId] = React.useState("0");
  const [imageUrl, setImageUrl] = React.useState("");

  const back = () => NavigationService.back();

  const [, submitAddNewExtra] = useAxiosMutation({
    ...addNewExtra(),
    isLoadingDefault: true,
    onSuccess: (data, response) => {
      console.log({ response });
      if (response?.codeNumber == 200) {
        props?.route?.params?.refreshList();
        back();
      }
    },
  });

  const [, submitEditExtra] = useAxiosMutation({
    ...editExtra(),
    isLoadingDefault: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        props?.route?.params?.refreshList();
        back();
      }
    },
  });

  const [, submitUploadAvatarStaff] = useAxiosMutation({
    ...uploadAvatarStaff(),
    onSuccess: (data, response) => {
      if (response.codeNumber == 200) {
        setFileId(data?.fileId ?? 0);
        setImageUrl(data?.url);
      }
    },
  });

  React.useEffect(() => {
    if (isEdit) {
      setValue("name", extraEdit?.name);
      setValue("description", extraEdit?.description);
      setValue("duration", extraEdit?.duration.toString());
      setValue("price", extraEdit?.price.toString());
      setValue("supplyFee", extraEdit?.supplyFee.toString());
      setFileId(extraEdit?.fileId || "0");
      setImageUrl(extraEdit?.imageUrl);
      statusRef?.current?.changeItem(extraEdit.isDisabled.toString());
    }
  }, []);



  return {
    form,
    errors,
    back,
    isEdit,
    imageUrl,
    statusRef,
    inputPhoneHeadRef,
    roleRef,


    onUploadImage: async (response) => {
      let files = response?.assets ?? [];
      files = createFormData(files);
      const body = await uploadAvatarStaff(files);
      submitUploadAvatarStaff(body.params);
    },

    onSubmit: async (values) => {

      const data = {
        name: values.name,
        description: values.description,
        duration: values.duration,
        price: values.price,
        isDisabled: values.status.value,
        supplyFee: values.supplyFee ? values.supplyFee : "0",
        fileId,
      }

      if (isEdit) {
        const body = await editExtra(data, extraEdit.extraId);
        submitEditExtra(body.params);
      } else {
        const body = await addNewExtra(data);
        submitAddNewExtra(body.params);
      }
    }
  };
};
