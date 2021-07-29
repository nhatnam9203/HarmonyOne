import React from 'react';
import { useRoute } from '@react-navigation/native';

export const createScreenComponent = (screenName, Component, options = {}) => {
  return {
    name: screenName,
    component: React.memo((props) => {
      const route = useRoute();
      return <Component {...props} params={route?.params ?? {}} />;
    }),
    options,
  };
};
