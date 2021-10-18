import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const CheckoutScreen = createScreenComponent(
  'hpo.checkout',
  (props) => <Layout {...useProps(props)} />,
);
