import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { IconButton } from "@shared/components";

export const Layout = ({

}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
 
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
