import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';
import { images } from '@shared/themes';

export const ReportStaffSalary = createScreenComponent(
  'hpo.report.staff.salary',
  (props) => <Layout {...useProps(props)} />,
  { tabBarIcon: images.iconTabReports, tabBarLabel: 'Reports' },
);
