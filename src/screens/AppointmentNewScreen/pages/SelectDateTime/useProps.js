import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NavigationService from "@navigation/NavigationService";

export const useProps = (_params) => {

  const dispatch = useDispatch();

  const {
    bookAppointment: { staffsOfService = [], timesAvailable }
  } = useSelector(state => state);

  return {
    timesAvailable,

    goToReview : ()=>{
      NavigationService.navigate(screenNames.ReviewConfirm);
    }
  };
};
