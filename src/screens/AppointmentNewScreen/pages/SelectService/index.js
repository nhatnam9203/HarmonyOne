import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const SelectService = createScreenComponent(
  'hpo.appointment.booking.selectService',
  (props) => <Layout {...useProps(props)} />,
);
