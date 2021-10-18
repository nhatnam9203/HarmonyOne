import React from "react";
import { useSelector, useDispatch } from "react-redux";

export const useProps = (_params) => {
  const dispatch = useDispatch();

  const {
    merchant: { merchantDetail = {} }
  } = useSelector(state => state);

  const workingTimeRef = React.useRef();


  return {
    merchantDetail,
    workingTimeRef,

    onSave: () => {
      const workingTime = workingTimeRef?.current?.getValue();
     }
  };
};
