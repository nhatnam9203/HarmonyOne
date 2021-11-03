import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const ChangePincodeScreen = createScreenComponent(
  'hpo.pincode.change',
  (props) => <Layout {...useProps(props)} />,
  {},
);
