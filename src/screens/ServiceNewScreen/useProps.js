import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { serviceSchema } from "@shared/helpers/schema";
import { useSelector } from "react-redux";
import { useAxiosMutation, addNewService, editService, uploadAvatarStaff } from '@src/apis';
import { createFormData } from "@shared/utils";
import NavigationService from '@navigation/NavigationService'

export const useProps = (props) => {
  const { extrasSelection = [] } = props?.route?.params;

  const categoryRef = React.useRef();
  const statusRef = React.useRef();
  const [fileId, setFileId] = React.useState("0");
  const [imageUrl, setImageUrl] = React.useState("");

  const [
    extrasListSelected,
    setExtrasListSelected
  ] = React.useState([]);

  const form = useForm({ resolver: yupResolver(serviceSchema) });
  const { setValue } = form;
  const { errors } = form.formState;

  const isEdit = props?.route?.params?.isEdit;
  const serviceEdit = props?.route?.params?.serviceEdit;
  const isNewWithCategory = props?.route?.params?.isNewWithCategory;
  const categoryList = useSelector(state => state.category.category);
  const extraList = useSelector(state => state.extra.extras);

  React.useEffect(() => {
    if (isEdit && extrasSelection.length > 0) {
      setExtrasListSelected(extrasSelection);
    }
  }, [extrasSelection]);

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
      getExtraEdit();
    }
    if (isNewWithCategory) {
      const categoryId = props?.route?.params?.categoryId;
      categoryRef?.current?.changeItem(categoryId?.toString());
    }
  }, []);

  const getExtraEdit = () => {
    const { extras = [] } = serviceEdit;
    let tempExtras = [...extraList].map(ex => ({ ...ex, checked: false }));
    for (let i = 0; i < tempExtras.length; i++) {
      for (const el of extras) {
        if (tempExtras[i].extraId == el.extraId) {
          tempExtras[i].checked = true;
        }
      }
    }
    setExtrasListSelected(tempExtras)
  }

  const checkSecondTime = (values) => {
    if (values.openTime && !values.secondTime) {
      alert("Your open time was valueable, please fill out second time");
      return false;
    }

    if (values.secondTime && !values.openTime) {
      alert("Your second time was valueable, please fill out open time and it must be greater than second time");
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
    extrasSelection,
    extrasListSelected,

    onUploadImage: async (response) => {
      let files = response?.assets ?? [];
      files = createFormData(files);
      const body = await uploadAvatarStaff(files);
      submitUploadAvatarStaff(body.params);
    },

    getDataSelectCategory: () => {
      return categoryList.filter(cate => (cate.categoryType === "Service") && cate.isDisabled == 0 && cate.isDeleted == 0).map((cate) => ({
        ...cate,
        label: cate.name,
        value: cate.categoryId,
      }))
    },

    newExtra: () => {
      NavigationService.navigate(screenNames.ExtraNewScreen);
    },

    selectExtraExist: () => {
      NavigationService.navigate(
        screenNames.ExtraSelectScreen, {
        extrasSelection: isEdit ? extrasListSelected : extrasSelection
      }
      );
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
        extras: isEdit ? extrasListSelected.filter(ex => ex.checked) :
          extrasSelection.filter(ex => ex.checked),
        fileId,
      }

      console.log({ data });

      // api bị lỗi không thêm mới extra từ extralist có sẵn được,
      // phần này bên pos là tạo mới extra tự nhập tay vô , ko phải chọn từ extra list có sẵn, design chỗ này khác với POS.

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
