// import fs from 'fs';
const fs = require('fs');

// import path from 'path';
const path = require('path');

const appPath = process.argv[2];
const screenName = process.argv[3];
const screenKey = process.argv[4] ?? 'retailer.tab.page';
const dir = path.resolve(__dirname, `../src/screens/${appPath}/${screenName}`);

const index = `import React from 'react';
import { Layout } from './Layout';
import { useProps } from './useProps';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';

export const ${screenName} = createScreenComponent(
  '${screenKey}',
  (props) => <Layout {...useProps(props)} />,
  {
    title: 'Customer List',
  },
);
`;

const layout = `import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

export const Layout = ({}) => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
`;

const useProps = `export const useProps = (props) => {
  return {};
};
`;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
fs.writeFileSync(dir + '/index.js', index);
fs.writeFileSync(dir + '/Layout.js', layout);
fs.writeFileSync(dir + '/useProps.js', useProps);
