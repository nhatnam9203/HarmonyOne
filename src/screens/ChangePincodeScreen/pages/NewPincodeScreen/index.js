import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const NewPincodeScreen = createScreenComponent(
  'hpo.pincode.change.new',
  (props) => <Layout {...useProps(props)} />,
  {},
);
