import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const PinCodeScreen = createScreenComponent(
  'hpo.pin',
  (props) => <Layout {...useProps(props)} />,
  {},
);
