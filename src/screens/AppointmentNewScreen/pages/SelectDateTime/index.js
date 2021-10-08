import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const SelectDateTime = createScreenComponent(
  'hpo.appointment.booking.selectDateTime',
  (props) => <Layout {...useProps(props)} />,
);
