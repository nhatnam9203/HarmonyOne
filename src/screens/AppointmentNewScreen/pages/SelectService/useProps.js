import React from "react";

export const useProps = ({
  route
}) => {
  const isAddMore = route?.props?.params?.isAddMore;
  
  return {
    isAddMore
  };
};
