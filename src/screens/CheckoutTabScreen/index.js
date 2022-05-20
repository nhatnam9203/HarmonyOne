import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';
import { images } from "@shared/themes";
import { translate } from "@localize";

export const CheckoutTabScreen = createScreenComponent(
  'hpo.checkoutTab',
  (props) => <Layout {...useProps(props)} />,
  { tabBarIcon: images.iconPayment, tabBarLabel: translate('txtCheckout') },
);
