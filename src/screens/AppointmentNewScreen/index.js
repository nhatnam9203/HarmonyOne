import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const AppointmentNewScreen = createScreenComponent(
  'hpo.appointment.new',
  (props) => <Layout {...useProps(props)} />,
);
