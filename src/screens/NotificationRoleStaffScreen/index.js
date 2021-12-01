import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const NotificationRoleStaffScreen = createScreenComponent(
  'hpo.notification.role.staff',
  (props) => <Layout {...useProps(props)} />,
);
