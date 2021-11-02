import React from 'react';
import { View, StyleSheet, Text, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { Button } from "@shared/components";
import { images } from "@shared/themes/resources";

export const Layout = ({
  value,
  onChange,
  onSubmit,
}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t("Change PIN code")}
        isLeft={true}
        isRight={false}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
      >
        <View style={styles.content}>
   
        </View>
        <View style={styles.bottom}>
          <Button
            label="Send Feedback"
            onPress={onSubmit}
            highlight={true}
            width={'100%'}
          />
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

  title: {
    fontSize: scaleFont(20),
    color: '#1366AE',
    fontFamily: fonts.MEDIUM
  },

  subTitle: {
    fontSize: scaleFont(16),
    marginTop: scaleHeight(12),
    color: '#404040',
    fontFamily: fonts.REGULAR
  },

  content: {
    flex: 1,
    padding: scaleWidth(16)
  },

  bottom: {
    padding: scaleWidth(16),
    width: scaleWidth(375),
  },
});
