import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const CustomerListPage = createScreenComponent(
    'hpo.appointment.new.customerList',
    (props) => <Layout {...useProps(props)} />,
);
