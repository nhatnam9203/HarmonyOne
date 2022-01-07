import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const BusinessInformation = createScreenComponent(
  'hpo.signup.businessInformation',
  (props) => <Layout {...useProps(props)} />,
);
