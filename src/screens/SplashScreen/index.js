import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const SplashScreen = createScreenComponent(
  'hpo.splash',
  (props) => <Layout {...useProps(props)} />,
  {},
);
