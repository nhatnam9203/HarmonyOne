import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const SelectDatePage = createScreenComponent(
  'hpo.appointment.new.booking.selectDate',
  (props) => <Layout {...useProps(props)} />,
);
