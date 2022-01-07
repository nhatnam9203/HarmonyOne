import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const ApplicationSubmit = createScreenComponent(
  'hpo.signup.applicationSubmit',
  (props) => <Layout {...useProps(props)} />,
);
 