import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';
import { images } from '@shared/themes';

export const CustomersScreen = createScreenComponent(
  'hpo.customers',
  (props) => <Layout {...useProps(props)} />,
  { tabBarIcon: images.iconTabCustomer, tabBarLabel: 'Customer' },
);
