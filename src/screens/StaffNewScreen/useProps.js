import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { serviceSalarySchema } from "@shared/helpers/schema";
import { useSelector } from "react-redux";
import { useAxiosMutation, addNewExtra, editExtra, uploadAvatarStaff, addStaff } from '@src/apis';
import { createFormData } from "@shared/utils";
import NavigationService from '@navigation/NavigationService';

export const useProps = (props) => {

  const statusRef = React.useRef();
  const inputPhoneHeadRef = React.useRef();
  const roleRef = React.useRef();



  const workingTimeRef = React.useRef();
  const productSalaryRef = React.useRef();
  const serviceSalaryRef = React.useRef();
  const tipFeeRef = React.useRef();
  const payoutWithCashRef = React.useRef();
  const assignServicesRef = React.useRef();

  const {
    auth : { staff }
  } = useSelector(state => state);


  const form = useForm({ resolver : yupResolver(serviceSalarySchema) });

  const { setValue } = form;
  const { errors } = form.formState;
  const isEdit = props?.route?.params?.isEdit;

  const [fileId, setFileId] = React.useState(0);
  const [imageUrl, setImageUrl] = React.useState("");

  const back = () => NavigationService.back();


  const [, submitUploadAvatarStaff] = useAxiosMutation({
    ...uploadAvatarStaff(),
    onSuccess: (data, response) => {
      if (response.codeNumber == 200) {
        setFileId(data?.fileId ?? 0);
        setImageUrl(data?.url);
      }
    },
  });

  const [, submitAddStaff] = useAxiosMutation({
    ...addStaff(),
    onSuccess: (data, response) => {
      console.log({ response });
      if (response.codeNumber == 200) {
        
      }
    },
  });

  React.useEffect(() => {
    if (isEdit) {

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
    productSalaryRef,
    tipFeeRef,
    payoutWithCashRef,
    serviceSalaryRef,
    workingTimeRef,
    assignServicesRef,

    onUploadImage: async (response) => {
      let files = response?.assets ?? [];
      files = createFormData(files);
      const body = await uploadAvatarStaff(files);
      submitUploadAvatarStaff(body.params);
    },

    onSubmit: async (values) => {

      const phoneHead = inputPhoneHeadRef?.current?.getValue().value;
      const productSalary = {
        commission: {
          value: productSalaryRef?.current?.getValue(),
          isCheck: productSalaryRef?.current?.getStatus(),
        }
      }

      const salary = {
        commission: {
          isCheck: serviceSalaryRef?.current?.getIncomeStatus(),
          value: serviceSalaryRef?.current?.getIncomeValues(),
        },
        perHour: {
          isCheck: serviceSalaryRef?.current?.getPerhourStatus(),
          value: serviceSalaryRef?.current?.getPerhourValue(),
        }
      }


      const tipFee = {
        percent: {
          value: tipFeeRef?.current?.getPercentValue(),
          isCheck: tipFeeRef?.current?.getPercentStatus(),
        },
        fixedAmount: {
          value: tipFeeRef?.current?.getFixedAmountValue(),
          isCheck: tipFeeRef?.current?.getFixedAmountStatus(),
        }
      }

      const workingTime = workingTimeRef?.current?.getValue();
      const categories = assignServicesRef?.current?.getValue();
      const cashPercent = payoutWithCashRef?.current?.getValue();

      const data = {
        driverlicense: "",
        socialSecurityNumber: "",
        professionalLicense: "",
        address: {
          street: "",
          city: "",
          state: 0,
          zip: ""
        },
        roles: {
          nameRole: values.role.value,
        },
        isDisabled : values.status.value,
        fileId,
        displayName : values.displayName,
        firstName : values.firstName,
        lastName : values.lastName,
        email : values.email,
        cashPercent,
        pin : values.pin,
        confirmPin : values.confirmPin,
        workingTime,
        categories,
        cashPercent,
        salary,
        productSalary,
        tipFee,
        cellPhone : values.phone ? values.phone : "",
        cellPhone: values.phone ? `${phoneHead}${values.phone}` : "",
        isActive : true,
        merchantId : staff?.merchantId
      }

      const body = await addStaff(data);
      submitAddStaff(body.params);


    }
  };
};
