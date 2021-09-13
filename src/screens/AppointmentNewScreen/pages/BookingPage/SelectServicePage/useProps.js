import React from "react";

export const useProps = (_params) => {

  const customerInfoRef = React.useRef();

  return {
    customerInfoRef,
  };
};
