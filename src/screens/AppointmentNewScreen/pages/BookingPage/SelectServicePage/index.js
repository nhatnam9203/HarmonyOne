import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const SelectServicePage = createScreenComponent(
  'hpo.appointment.new.booking.selectService',
  (props) => <Layout {...useProps(props)} />,
);
