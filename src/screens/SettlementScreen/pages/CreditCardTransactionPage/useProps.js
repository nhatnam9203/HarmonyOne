import React from "react";
import { useSelector } from "react-redux";
import NavigationService from '@navigation/NavigationService'

export const useProps = (props) => {

  const {
    settlement : { settlementWaiting  }
  } = useSelector(state => state);

  return {
    settlementWaiting
  };
};
