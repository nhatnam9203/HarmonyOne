import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { serviceSchema } from "@shared/helpers/schema";
import { useSelector } from "react-redux";
import { useAxiosMutation, addNewService, editService, uploadAvatarStaff } from '@src/apis';
import { createFormData } from "@shared/utils";
import NavigationService from '@navigation/NavigationService'

export const useProps = (props) => {

  const categoryRef = React.useRef();
  const statusRef = React.useRef();
  const [fileId, setFileId] = React.useState("0");
  const [imageUrl, setImageUrl] = React.useState("");

  const form = useForm({ resolver: yupResolver(serviceSchema) });
  const { setValue } = form;
  const { errors } = form.formState;

  const isEdit = props?.route?.params?.isEdit;
  const serviceEdit = props?.route?.params?.serviceEdit;
  const categoryList = useSelector(state => state.category.category);

  const back = () => NavigationService.back();

  const [, submitAddService] = useAxiosMutation({
    ...addNewService(),
    isLoadingDefault: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        props?.route?.params?.refreshService();
        back();
      }
    },
  });

  const [, submitEditService] = useAxiosMutation({
    ...editService(),
    isLoadingDefault: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        props?.route?.params?.refreshService();
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
      setValue("name", serviceEdit?.name);
      setValue("description", serviceEdit?.description);
      setValue("duration", serviceEdit?.duration.toString());
      setValue("openTime", serviceEdit?.openTime.toString());
      setValue("secondTime", serviceEdit?.secondTime.toString());
      setValue("price", serviceEdit?.price.toString());
      setValue("supplyFee", serviceEdit?.supplyFee.toString());
      setFileId(serviceEdit?.fileId || "0");
      setImageUrl(serviceEdit?.imageUrl);
      categoryRef?.current?.changeItem(serviceEdit.categoryId.toString());
      statusRef?.current?.changeItem(serviceEdit.isDisabled.toString());
    }
  }, []);

  const checkSecondTime = (values) => {
    if (values.openTime && !values.secondTime) {
      alert("Your open time was valueable, please fill out second time");
      return false;
    }

    if (values.secondTime && !values.openTime) {
      alert("Your second time was valueable, please fill out open time and ut must be greater than second time");
      return false;
    }

    if (values.secondTime && values.openTime) {
      if (parseInt(values.secondTime) < parseInt(values.openTime)) {
        alert("Sencond time must be greater than open time");
        return false;
      }
    }

    return true;
  }


  return {
    form,
    errors,
    back,
    isEdit,
    categoryRef,
    statusRef,
    imageUrl,

    onUploadImage: async (response) => {
      let files = response?.assets ?? [];
      files = createFormData(files);
      const body = await uploadAvatarStaff(files);
      submitUploadAvatarStaff(body.params);
    },

    getDataSelectCategory: () => {
      return categoryList.filter(cate => (cate.isDisabled == 0) && (cate.categoryType === "Service")).map((cate) => ({
        ...cate,
        label: cate.name,
        value: cate.categoryId,
      }))
    },

    onSubmit: async (values) => {

      const isValid = checkSecondTime(values);
      if (!isValid) return;

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
