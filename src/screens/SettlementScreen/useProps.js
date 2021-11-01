import React from "react";
import { auth } from "@redux/slices";
import { useDispatch } from "react-redux";
import { staffLogoutRequest, useAxiosMutation } from "@src/apis";
import { clearAuthToken } from "@shared/storages/authToken"
import NavigationService from '@navigation/NavigationService'

export const useProps = (_params) => {

  return {
   
  };
};
