import React from 'react';
import {
  useAxiosMutation,
  useAxiosQuery,
  updateStaff,
  getStaffById,
  uploadAvatarStaff,
} from '@src/apis';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { profileStaffLoginSchema } from '@shared/helpers/schema';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '@redux/slices';
import { createFormData } from '@shared/utils';
import NavigationService from '@navigation/NavigationService';

export const useProps = (props) => {
  const dispatch = useDispatch();

  const { staff } = useSelector((state) => state.auth);
  const form = useForm({
    resolver: yupResolver(profileStaffLoginSchema),
  });
  const { setValue } = form;
  const errors = form.formState.errors;
  const inputPhoneHeadRef = React.useRef();

  const [fileId, setFileId] = React.useState(0);
  const [imageUrl, setImageUrl] = React.useState('');

  React.useEffect(() => {
    setValue('firstName', staff?.firstName);
    setValue('lastName', staff?.lastName);
    setValue('displayName', staff?.displayName);
    setValue('email', staff?.email);
    setValue('street', staff?.address);
    setValue('city', staff?.city);

    setFileId(staff?.fileId ?? 0);
    setImageUrl(staff?.imageUrl);

    let staffPhone = staff?.phone;
    let phone = '';
    if (staffPhone?.toString().includes('+84')) {
      phone = staffPhone?.toString().slice(3);
      setValue('phone', phone);
      inputPhoneHeadRef?.current?.changeValue({ label: '+84', value: '+84' });
    } else {
      phone = staffPhone?.toString().slice(2);
      setValue('phone', phone);
      inputPhoneHeadRef?.current?.changeValue({ label: '+1', value: '+1' });
    }
  }, []);

  const [, getStaffLogin] = useAxiosQuery({
    ...getStaffById(staff?.staffId, staff?.merchantId),
    enabled: false,
    isLoadingDefault: true,
    onSuccess: (data, response) => {
      console.log('getStaffLogin');
      if (response.codeNumber == 200) {
        dispatch(auth.updateProfile(data));
        NavigationService.back();
      }
    },
  });

  const [, submitEditStaff] = useAxiosMutation({
    ...updateStaff(staff?.staffId),
    onSuccess: (data, response) => {
      if (response.codeNumber == 200) {
        getStaffLogin();
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

  return {
    form,
    errors,
    staff,
    inputPhoneHeadRef,
    imageUrl,

    onHandleChangeAvatar: async (response) => {
      let files = response?.assets ?? [];
      files = createFormData(files);
      const body = await uploadAvatarStaff(files);
      submitUploadAvatarStaff(body.params);
    },

    onSubmit: async (values) => {
      const phoneHeader = inputPhoneHeadRef?.current?.getValue().value;

      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        displayName: values.displayName,
        address: {
          street: values.street,
          city: values.city,
          state: staff?.stateId ?? 0,
          zip: staff?.zip,
        },
        email: values.email,
        cellphone: values.phone ? `${phoneHeader}${values.phone}` : '',
        categories: staff.categories,

        pin: staff.pin,
        confirmPin: staff.pin,
        productSalary: staff.productSalaries,
        roles: {
          nameRole: staff.roleName,
        },
        driverlicense: staff.driverLicense,
        professionalLicense: staff.professionalLicense,
        socialSecurityNumber: staff?.socialSecurityNumber,
        isDisabled: staff.isDisabled,
        workingTime: staff.workingTimes,
        tipFee: staff.tipFees,
        salary: staff.salaries,
        isActive: staff.isActive,
        cashPercent: staff.cashPercent,
        fileId,
      };

      const body = await updateStaff(staff.staffId, data);
      submitEditStaff(body.params);
    },
  };
};
