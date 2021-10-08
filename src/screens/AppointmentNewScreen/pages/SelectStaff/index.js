import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const SelectStaff = createScreenComponent(
  'hpo.appointment.booking.selectStaff',
  (props) => <Layout {...useProps(props)} />,
);
