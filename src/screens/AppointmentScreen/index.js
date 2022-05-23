import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';
import { images } from '@shared/themes';

export const AppointmentScreen = createScreenComponent(
  'hpo.appointment',
  (props) => <Layout {...useProps(props)} />,
);
