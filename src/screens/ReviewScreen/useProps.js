import React from "react";
import { useSelector } from "react-redux";

export const useProps = (_params) => {

  const reviewTypeRef = React.useRef();
  const statusRef = React.useRef();

  return {
    reviewTypeRef,
    statusRef,
  };
};
