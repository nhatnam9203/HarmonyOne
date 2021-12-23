import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { productSchema } from "@shared/helpers/schema";
import { useSelector, useDispatch } from "react-redux";
import {
  useAxiosMutation,
  uploadAvatarStaff,
  addProduct,
  editProduct,
  checkSkuNumber
} from '@src/apis';

import { app } from "@redux/slices";
import { axios } from '@shared/services/axiosClient';
import { createFormData } from "@shared/utils";
import NavigationService from '@navigation/NavigationService'

export const useProps = (props) => {
  const dispatch = useDispatch();

  const categoryRef = React.useRef();
  const statusRef = React.useRef();
  const [fileId, setFileId] = React.useState("0");
  const [imageUrl, setImageUrl] = React.useState("");

  const form = useForm({ resolver: yupResolver(productSchema) });
  const { setValue } = form;
  const { errors } = form.formState;

  const isEdit = props?.route?.params?.isEdit;
  const productEdit = props?.route?.params?.productEdit;
  const isNewWithCategory = props?.route?.params?.isNewWithCategory;
  const categoryList = useSelector(state => state.category.category);

  const back = () => NavigationService.back();

  const [, submitAddProduct] = useAxiosMutation({
    ...addProduct(),
    isLoadingDefault: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        props?.route?.params?.refreshProduct();
        back();
      }
    },
  });

  const [, submitEditProduct] = useAxiosMutation({
    ...editProduct(),
    isLoadingDefault: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        props?.route?.params?.refreshProduct();
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

  const checkSkuNumber = async (sku, data) => {
    dispatch(app.showLoading());
    const params = {
      url: `product/checksku?sku=${sku}`,
      method: "GET",
    }
    try {
      if (isEdit) {
        if (productEdit.sku !== sku) {
          const response = await axios(params);
          if (response?.data?.codeNumber == 200) {
            const body = await editProduct(data, productEdit.productId);
            submitEditProduct(body.params);
          } else {
            alert(response?.data?.message)
          }
        } else {
          const body = await editProduct(data, productEdit.productId);
          submitEditProduct(body.params);
        }
      } else {
        const response = await axios(params);
        if (response?.data?.codeNumber == 200) {
          const body = await addProduct(data);
          submitAddProduct(body.params);
        } else {
          alert(response?.data?.message)
        }
      }
    } catch (err) {

    } finally {
      dispatch(app.hideLoading());
    }
  }


  React.useEffect(() => {
    if (isEdit) {
      setValue("name", productEdit?.name);
      setValue("description", productEdit?.description);
      setValue("sku", productEdit?.sku.toString());
      setValue("minThreshold", productEdit?.minThreshold.toString());
      setValue("maxThreshold", productEdit?.maxThreshold.toString());
      setValue("price", productEdit?.price.toString());
      setValue("quantity", productEdit?.quantity.toString());
      setFileId(productEdit?.fileId || "0");
      setImageUrl(productEdit?.imageUrl);
      categoryRef?.current?.changeItem(productEdit.categoryId.toString());
      statusRef?.current?.changeItem(productEdit.isDisabled.toString());
    }
    if (isNewWithCategory) {
      const categoryId = props?.route?.params?.categoryId;
      categoryRef?.current?.changeItem(categoryId?.toString());
    }
  }, []);

  const checkCondition = (minThreshold, maxThreshold) => {
    if (parseInt(maxThreshold) < parseInt(minThreshold)) {
      alert("Max Threshold must be greater than Min Threshold !");
      return false;
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
      return categoryList.filter(cate => ( cate.isDisabled == 0 && cate.categoryType == "Product")).map((cate) => ({
        ...cate,
        label: cate.name,
        value: cate.categoryId,
      }))
    },

    onSubmit: async (values) => {

      if (!checkCondition(values.minThreshold, values.maxThreshold)) return;

      const data = {
        categoryId: values.category.value,
        name: values.name,
        description: values.description,
        sku: values.sku,
        price: values.price,
        minThreshold: values.minThreshold,
        maxThreshold: values.maxThreshold,
        quantity: values.quantity,
        isDisabled: values.status.value,
        fileId,
      }
      checkSkuNumber(data.sku, data);
    }
  };
};
