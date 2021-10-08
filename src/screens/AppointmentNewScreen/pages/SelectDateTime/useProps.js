import React from "react";
import { useSelector, useDispatch } from "react-redux";

export const useProps = (_params) => {

  const dispatch = useDispatch();

  const {
    bookAppointment: { staffsOfService = [], timesAvailable }
  } = useSelector(state => state);

  return {
    timesAvailable
  };
};
