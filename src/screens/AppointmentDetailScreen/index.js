import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const AppointmentDetailScreen = createScreenComponent(
  'hpo.appointment.detail',
  (props) => <Layout {...useProps(props)} />,
  {},
);

AppointmentDetailScreen.sharedElements = (
  navigation,
  otherNavigation,
  showing,
) => {
  const item = navigation.getParam('item');
  return [`item.${item.id}.photo`];
};
