import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";

export const Layout = ({
}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t("Notification")}
        isLeft={true}
        isRight={false}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
      >
        <View style={styles.content}>
 
        </View>
      </SingleScreenLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  content: {
    flex: 1,
  },

});
