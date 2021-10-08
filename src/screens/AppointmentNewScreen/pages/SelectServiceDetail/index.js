import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const SelectServiceDetail = createScreenComponent(
  'hpo.appointment.booking.selectService.detail',
  (props) => <Layout {...useProps(props)} />,
);
