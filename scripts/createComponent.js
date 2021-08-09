// import fs from 'fs';
const fs = require('fs');

// import path from 'path';
const path = require('path');

const compName = process.argv[2];
const dir = path.resolve(__dirname, '../src/shared/components');

const comp = `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ${compName} = () => {
  return (
    <View style={styles.container}>
      <Text>${compName} Component</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
`;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
fs.writeFileSync(dir + `/${compName}.js`, comp);
