import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const SignupScreen = createScreenComponent(
  'hpo.signup',
  (props) => <Layout {...useProps(props)} />,
);
