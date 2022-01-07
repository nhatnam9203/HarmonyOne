import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const PrincipalInformation = createScreenComponent(
  'hpo.signup.principalInformation',
  (props) => <Layout {...useProps(props)} />,
);
 