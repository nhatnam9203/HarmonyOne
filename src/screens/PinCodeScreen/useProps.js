import NavigationService from '@navigation/NavigationService';
import { auth, app, dataLocal } from '@redux/slices';
import { staffLoginRequest, useAxiosMutation } from '@src/apis';
import React from 'react';
import AsyncStorage from "@react-native-community/async-storage";
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import TouchID from 'react-native-touch-id';

const optionalConfigObject = {
  title: 'Authentication Required', // Android
  imageColor: '#e00606', // Android
  imageErrorColor: '#ff0000', // Android
  sensorDescription: 'Touch sensor', // Android
  sensorErrorDescription: 'Failed', // Android
  cancelText: 'Cancel', // Android
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};

export const useProps = (_params) => {
  const dispatch = useDispatch();

  const merchantID = useSelector((state) => state.auth.merchantID);
  const isQuickLogin = useSelector((state) => state.dataLocal.isQuickLogin);
  const pincodeSaved = useSelector((state) => state.dataLocal.pincodeSaved);

  const [merchantCode, setMerchantCode] = React.useState("");

  const {
    auth: { staff }
  } = useSelector(state => state);

  const [pinCode, setPinCode] = React.useState('');

  const [{ isLoading }, staffLogin] = useAxiosMutation({
    ...staffLoginRequest(merchantCode, pinCode),
    onError: (msg) => {
      // setTextMessage(msg);
    },
    isLoadingDefault : false,
    onSuccess: (data) => {
      if (data) {
        dispatch(auth.loginStaff(data));
        dispatch(dataLocal.savePincode(pinCode));
        dispatch(app.setStatusHomeScreen(true));
      }
      NavigationService.replace('HpOneStack');
    },
  });

  const [{ }, subnmitQuickLogin] = useAxiosMutation({
    ...staffLoginRequest(merchantCode, pincodeSaved),
    queryId: "",
    onError: (msg) => {
      // setTextMessage(msg);
    },
    onSuccess: (data) => {
      if (data) {
        dispatch(auth.loginStaff(data));
        dispatch(dataLocal.savePincode(pincodeSaved));
        dispatch(app.setStatusHomeScreen(true));
      }
      NavigationService.replace('HpOneStack');
    },
    onError : (message)=>{
      console.log({ message })
    },
  });

  const initialMerchantID = async () => {
    const merchant_code = await AsyncStorage.getItem("@merchantID");

    if (merchantID) {
      setMerchantCode(merchantID);
    } else {
      setMerchantCode(JSON.parse(merchant_code))
    }

  }

  const quickLogin = () => {
    try {
      TouchID.authenticate('Quick Login', optionalConfigObject)
        .then(async (success) => {
          let merchant_code = await AsyncStorage.getItem("@merchantID");
          merchant_code = await JSON.parse(merchant_code);
          const body = await staffLoginRequest(merchant_code, pincodeSaved);
          subnmitQuickLogin(body.params);
        })
        .catch(error => {
          Alert.alert('Authentication Failed');
        });
    } catch (err) {

    }
  }

  React.useEffect(() => {
    initialMerchantID();
  }, []);

  React.useEffect(() => {
    if (isQuickLogin) {
      quickLogin();
    }
  }, [])



  return {
    onChangeInputCode: (val) => {
      setPinCode(val);
    },
    isQuickLogin,
    pinCode,

    loginStaff: () => {
      staffLogin();
    },

    isLoading: isLoading,
    forgotPinCode: () => {
      NavigationService.navigate('ForgotPincode');
    },
    useAnotherMID: () => {
      NavigationService.navigate(screenNames.LoginScreen);
    },
  };
};
