import { auth } from '@redux/slices';
import { useAxiosMutation, updateStaff, getStaffByMerchant, useAxiosQuery } from '@src/apis';
import React from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { staff as staffAction } from "@redux/slices";
import NavigationService from "@navigation/NavigationService";

export const useProps = (_params) => {
  const dispatch = useDispatch();

  const merchantID = useSelector((state) => state.auth.merchantID);

  const {
    auth: { staff },
    staff: { staffListByMerchant = [] }
  } = useSelector(state => state);

  const [pinCode, setPinCode] = React.useState('');
  const [newPincode, setNewPincode] = React.useState('');

  const [, fetchStaffList] = useAxiosQuery({
    ...getStaffByMerchant(staff?.merchantId),
    queryId: "refetchListStaff_ChangePincode",
    isLoadingDefault: true,
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(staffAction.setStaffListByMerchant(data));
    },
  });

  const [, submitEditStaff] = useAxiosMutation({
    ...updateStaff(staff?.staffId),
    onSuccess: (data, response) => {
      if (response.codeNumber == 200) {
        Alert.alert(response?.message);
        NavigationService.navigate(screenNames.SettingScreen);
        fetchStaffList();
      } else {
        Alert.alert(response?.message);
      }
    },
  });

  const onSubmit = async (pin = '', confirmPin = '') => {
    if (pin?.length == 4 && confirmPin?.length == 4) {
      if (pin !== confirmPin) {
        Alert.alert("PIN code does not match.");
      } else {
        const data = {
          firstName: staff?.firstName,
          lastName: staff?.lastName,
          displayName: staff?.displayName,
          address: {
            street: staff?.address,
            city: staff?.city,
            state: staff?.stateId ?? 0,
            zip: staff?.zip,
          },
          email: staff?.email,
          cellphone: staff?.phone,
          categories: staff?.categories,

          pin: pinCode,
          confirmPin: pinCode,
          productSalary: staff?.productSalaries,
          roles: {
            nameRole: staff?.roleName,
          },
          driverlicense: staff?.driverLicense,
          professionalLicense: staff?.professionalLicense,
          socialSecurityNumber: staff?.socialSecurityNumber,
          isDisabled: staff?.isDisabled,
          workingTime: staff?.workingTimes,
          tipFee: staff?.tipFees,
          salary: staff?.salaries,
          isActive: staff?.isActive,
          cashPercent: staff?.cashPercent,
          fileId: staff?.fileId,
        };

        const body = await updateStaff(staff?.staffId, data);
        submitEditStaff(body.params);
      }
    }
  }

  return {
    onChangeInputCode: (val) => {
      setPinCode(val);
      if (val?.length == 4) {
        onSubmit(val, newPincode)
      }
    },

    onChangeNewPinCode: (val) => {
      setNewPincode(val);
      if (val?.length == 4) {
        onSubmit(pinCode, val)
      }
    },

    pinCode,
    newPincode,


    forgotPinCode: () => {
      NavigationService.navigate('ForgotPincode');
    },

  };
};
