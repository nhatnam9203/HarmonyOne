
import React from "react";
import {
  useAxiosQuery,
} from "@src/apis";
import { settlement } from "@redux/slices";
import { useSelector, useDispatch } from "react-redux";
import NavigationService from '@navigation/NavigationService';

export const useProps = (props) => {
  const dispatch = useDispatch();

  const {
    settlement: { 
      settlementWaiting = {},
    
    }
  } = useSelector(state => state);

  
  React.useEffect(() => {
   
  }, []);

  return {        
    settlementWaiting,

  };
};
