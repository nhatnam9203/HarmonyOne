import React from "react";
import { useSelector } from "react-redux";

export const useProps = (_params) => {

  const { customerDetail } = useSelector(state=>state.customer);
  console.log({ customerDetail });

  return {
    customerDetail,
  };
};
