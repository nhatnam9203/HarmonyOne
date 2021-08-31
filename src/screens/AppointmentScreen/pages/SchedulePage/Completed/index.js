import React from 'react';
import { View, SectionList, StyleSheet, Image } from 'react-native';
import moment from 'moment';

export const CompletePage = ({ services }) => {
  const [items, setItems] = React.useState(services);

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({});
