import React from 'react';
import { useAxiosQuery, getListCustomer } from '@src/apis';
import { useDispatch, useSelector } from "react-redux";
import { } from "@redux/slices";
import NavigationService from '@navigation/NavigationService';

export const useProps = (props) => {

  const {
    appointment: { appointmentDetail }
  } = useSelector(state => state);

  const [ methodPay, setMethodPay ] = React.useState(null);

  return {
    appointmentDetail,
    methodPay,
    
    onChangeMethodPay : (method) =>{
      setMethodPay(method)
    },

    back: () => {
      NavigationService.back();
    },
  }
};