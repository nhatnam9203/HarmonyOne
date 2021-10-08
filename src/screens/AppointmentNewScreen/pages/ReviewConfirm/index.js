import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const ReviewConfirm = createScreenComponent(
  'hpo.appointment.booking.reviewConfirm',
  (props) => <Layout {...useProps(props)} />,
);
