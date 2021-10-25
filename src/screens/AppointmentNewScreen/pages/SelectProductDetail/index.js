import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const SelectProductDetail = createScreenComponent(
  'hpo.appointment.booking.selectProduct.detail',
  (props) => <Layout {...useProps(props)} />,
);
