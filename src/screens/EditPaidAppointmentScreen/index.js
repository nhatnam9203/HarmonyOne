import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const EditPaidAppointmentScreen = createScreenComponent(
  'hpo.appointment.editPaidAppointment',
  (props) => <Layout {...useProps(props)} />,
);
