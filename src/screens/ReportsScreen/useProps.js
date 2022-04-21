
import NavigationService from '@navigation/NavigationService';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect } from "react";
import { useAxiosMutationReport, staffLoginRequest } from "@src/apis";
import { saveAuthTokenReport } from '@shared/storages/authToken';
import { Alert } from "react-native";
import { useDispatch, useSelector } from 'react-redux';

export const useProps = (_params) => {
  return {

  };
};
