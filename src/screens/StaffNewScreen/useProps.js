import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { serviceSalarySchema } from "@shared/helpers/schema";
import { useSelector } from "react-redux";
import { useAxiosMutation, addNewExtra, editExtra, uploadAvatarStaff, addStaff, updateStaff } from '@src/apis';
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


  const [fileId, setFileId] = React.useState(0);
  const [imageUrl, setImageUrl] = React.useState("");

  const {
    auth: { staff }
  } = useSelector(state => state);


  const form = useForm({ resolver: yupResolver(serviceSalarySchema) });

  const { setValue } = form;
  const { errors } = form.formState;

  const { isEdit = null, staffEdit = null } = props?.route?.params;

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
      if (response.codeNumber == 200) {
        props?.route?.params?.refreshList();
        NavigationService.navigate(screenNames.StaffScreen)
      }
    },
  });

  const [, submitEditStaff] = useAxiosMutation({
    ...updateStaff(staffEdit?.staffId),
    onSuccess: (data, response) => {
      if (response.codeNumber == 200) {
          props?.route?.params?.refreshList();
          NavigationService.navigate(screenNames.StaffScreen)
      }
    },
  });

  console.log({ staffEdit })


  React.useEffect(() => {
    if (isEdit) {
      setValue("firstName", staffEdit?.firstName);
      setValue("lastName", staffEdit?.lastName);
      setValue("displayName", staffEdit?.displayName);
      setValue("email", staffEdit?.email);
      setValue("pin", staffEdit?.pin);
      setValue("confirmPin", staffEdit?.pin);

      setFileId(staffEdit?.fileId || "0");
      setImageUrl(staffEdit?.imageUrl);

      let staffPhone = staffEdit?.phone;
      let phone = '';

      if (staffPhone?.toString()?.includes("+84")) {
        phone = staffPhone.toString().slice(3);
        setValue("phone", phone);
        inputPhoneHeadRef?.current?.changeValue({ label: "+84", value: "+84" });
      } else {
        phone = staffPhone?.toString()?.slice(2);
        setValue("phone", phone);
        inputPhoneHeadRef?.current?.changeValue({ label: "+1", value: "+1" });
      }
      roleRef?.current?.changeItem(staffEdit?.roles?.name);
      statusRef?.current?.changeItem(staffEdit?.isDisabled);
      workingTimeRef?.current?.setValue(staffEdit?.workingTimes);

      setTimeout(() => {
        assignServicesRef?.current?.setValue(staffEdit?.categories);
      }, 500);

      /************************************** SET VALUE EDIT SERVICE SALARY ************************************** */
      serviceSalaryRef?.current?.setPerhourStatus(staffEdit?.salaries?.perHour?.isCheck);
      serviceSalaryRef?.current?.setIncomeStatus(staffEdit?.salaries?.commission?.isCheck);
      serviceSalaryRef?.current?.setPerhourValue(staffEdit?.salaries?.perHour?.value);
      serviceSalaryRef?.current?.setIncomeValue(staffEdit?.salaries?.commission?.value);

      /************************************** SET VALUE EDIT PRODUCT SALARY ************************************** */
      productSalaryRef?.current?.setStatus(staffEdit?.productSalaries?.commission?.isCheck);
      productSalaryRef?.current?.setValue(staffEdit?.productSalaries?.commission?.value);

      /************************************** SET VALUE EDIT TIP FEE ************************************** */
      tipFeeRef?.current?.setPercentStatus(staffEdit?.tipFees?.percent?.isCheck);
      tipFeeRef?.current?.setFixedAmountStatus(staffEdit?.tipFees?.fixedAmount?.isCheck);
      tipFeeRef?.current?.setPercentValue(staffEdit?.tipFees?.percent?.value);
      tipFeeRef?.current?.setFixedAmountValue(staffEdit?.tipFees?.fixedAmount?.value);

      /************************************** SET VALUE EDIT CASH PERCENT ************************************** */
      payoutWithCashRef?.current?.setValue(staffEdit?.cashPercent);

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
        isDisabled: values.status.value,
        fileId,
        displayName: values.displayName,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        cashPercent,
        pin: values.pin,
        confirmPin: values.confirmPin,
        workingTime,
        categories,
        cashPercent,
        salary,
        productSalary,
        tipFee,
        cellPhone: values.phone ? values.phone : "",
        cellPhone: values.phone ? `${phoneHead}${values.phone}` : "",
        isActive: isEdit ? staffEdit?.isActive  : true,
        merchantId: staff?.merchantId
      }

      if (isEdit) {
        const body = await updateStaff(staffEdit?.staffId, data);
        submitEditStaff(body.params);
      } else {
        const body = await addStaff(data);
        submitAddStaff(body.params);
      }

    }
  };
};
