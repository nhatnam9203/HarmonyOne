import { auth } from '@redux/slices';
import { staffLoginRequest, useAxiosMutation } from '@src/apis';
import React from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import NavigationService from "@navigation/NavigationService";

export const useProps = (_params) => {
  const dispatch = useDispatch();

  const merchantID = useSelector((state) => state.auth.merchantID);

  const {
    auth: { staff },
    staff: { staffListByMerchant = [] }
  } = useSelector(state => state);

  const [pinCode, setPinCode] = React.useState('');

  const onSubmit = (val) => {
    const staffFind = staffListByMerchant.find(obj => obj?.staffId == staff?.staffId);
    if (staffFind) {
      if (staffFind?.pin == val) {
        NavigationService.navigate(screenNames.NewPincodeScreen);
      } else {
        Alert.alert("Wrong pincode")
      }
    }
  }

  return {
    onChangeInputCode: (val) => {
      setPinCode(val);
      if(val?.length == 4){
        onSubmit(val)
      }
    },
    pinCode,

    forgotPinCode: () => {
      NavigationService.navigate('ForgotPincode');
    },

  };
};
