import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';
import { translate } from "@localize";

export const ProductPage = createScreenComponent(
  'ProductPage',
  (props) => <Layout {...useProps(props)} />,
  { tabBarLabel: translate('txtProducts') },
);
