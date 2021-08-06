import React from 'react';
import { Layout } from './Layout';
import { useProps } from './useProps';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';

export const SchedulePage = createScreenComponent(
  'hpo.appointment.schedule',
  (props) => <Layout {...useProps(props)} />,
  {
    title: 'Schedule',
  },
);
