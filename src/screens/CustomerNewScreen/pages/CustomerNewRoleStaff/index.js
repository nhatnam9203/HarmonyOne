import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';
import { images } from '@shared/themes';

export const CustomerNewRoleStaff = createScreenComponent(
  'hpo.customers.new.role.staff',
  (props) => <Layout {...useProps(props)} />,
);
