import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const CreditCardTransactionPage = createScreenComponent(
  'hpo.settlement.creditCard.transaction',
  (props) => <Layout {...useProps(props)} />,
);
