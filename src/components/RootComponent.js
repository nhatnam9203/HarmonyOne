import React from 'react';
import { StyleSheet, View } from 'react-native';
import LoadingRoot from './LoadingRoot';
import ModalError from './ModalError';

let RootComponent = (props) => {
  return (
    <View style={styles.container}>
      {props.children}
      <ModalError />
      <LoadingRoot />
    </View>
  );
};

export default RootComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
