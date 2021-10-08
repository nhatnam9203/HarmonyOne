import React from "react";

export const useProps = ({
  route
}) => {

  const item = route?.params?.item;

  return {
    item
  };
};
