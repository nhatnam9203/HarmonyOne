import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const ServiceScreen = createScreenComponent(
  'hpo.service',
  (props) => <Layout {...useProps(props)} />,
);
