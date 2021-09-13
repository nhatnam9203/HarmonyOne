import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const BookingPage = createScreenComponent(
  'hpo.appointment.new.booking',
  (props) => <Layout {...useProps(props)} />,
);
