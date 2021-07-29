// import fs from 'fs';
const fs = require('fs');

// import path from 'path';
const path = require('path');

const appPath = process.argv[2];
const screenName = process.argv[3];
const routeName = process.argv[4] ?? `${appPath}.${screenName.toLowerCase()}`;
const dir = path.resolve(__dirname, `../src/${appPath}/${screenName}`);

const index = `import React from 'react';
import { createScreenComponent } from '@shared/helpers/createScreenComponent';
import { Layout } from './Layout';
import { useProps } from './useProps';

export const ${screenName} = createScreenComponent(
  '${routeName}',
  (props) => <Layout {...useProps(props)} />,
  {},
  );`;

const layout = `import React from 'react';
import { View, StyleSheet } from 'react-native';
export const Layout = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
`;

const useProps = `export const useProps = (_params) => {
  return {};
};
`;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
fs.writeFileSync(dir + '/index.js', index);
fs.writeFileSync(dir + '/Layout.js', layout);
fs.writeFileSync(dir + '/useProps.js', useProps);
