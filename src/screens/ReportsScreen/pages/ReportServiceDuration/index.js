import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const ReportServiceDuration = createScreenComponent(
  'hpo.report.service.duration',
  (props) => <Layout {...useProps(props)} />,
);
