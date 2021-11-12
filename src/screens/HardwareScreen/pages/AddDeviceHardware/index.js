import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const AddDeviceHardware = createScreenComponent(
  'hpo.hardware.add',
  (props) => <Layout {...useProps(props)} />,
);
