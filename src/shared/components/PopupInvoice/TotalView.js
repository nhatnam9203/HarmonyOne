import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const TotalView = ({ title, value, styleTextValue, styleTextTitle }) => {
  return (
    <View style={styles.content}>
      <Text style={styleTextTitle}>{`$ ${title}`}</Text>
      <View style={{ flex: 1 }} />
      <Text style={styleTextValue}>{`$ ${value}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: { flexDirection: "row", marginBottom: scaleHeight(4) },
});
