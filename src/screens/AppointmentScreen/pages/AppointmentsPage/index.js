import React from 'react';
import { Layout } from './Layout';
import { useProps } from './useProps';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';

export const AppointmentsPage = createScreenComponent(
  'hpo.appointment.list',
  (props) => <Layout {...useProps(props)} />,
  {
    title: 'Appointment List',
  },
);
