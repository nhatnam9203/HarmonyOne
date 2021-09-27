import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const NotificationScreen = createScreenComponent(
  'hpo.notification',
  (props) => <Layout {...useProps(props)} />,
);
