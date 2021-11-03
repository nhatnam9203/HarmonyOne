import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const ReportServiceCategorySales = createScreenComponent(
  'hpo.report.service.category.sales',
  (props) => <Layout {...useProps(props)} />,
);
