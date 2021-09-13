import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const ReviewPage = createScreenComponent(
  'hpo.appointment.new.booking.review',
  (props) => <Layout {...useProps(props)} />,
);
