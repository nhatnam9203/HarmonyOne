import React from "react";
import { useSelector , useDispatch } from "react-redux";

export const useProps = (_params) => {
  const dispatch = useDispatch();

  const {
    merchant : { merchantDetail = {} }
  } = useSelector(state=>state);

  const inputPhoneHeadRef = React.useRef();

  
  return {
    merchantDetail,
    inputPhoneHeadRef
  };
};
