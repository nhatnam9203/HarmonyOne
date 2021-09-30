import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { IconButton } from "@shared/components";
import { WithPopupActionSheet } from "@shared/HOC";

let EditButton = ({ ...props }) => {
  return (
    <IconButton
      icon={images.treedot}
      iconStyle={styles.treedot}
      style={styles.buttonTreedot}
      onPress={() => { }}
      {...props}
    />
  );
};

EditButton = WithPopupActionSheet(EditButton);

export const Layout = ({ getActionSheets }) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t("New marketing")}
        isLeft={true}
        isRight={true}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
        headerRightComponent={() =>
          <EditButton actions={getActionSheets()} />
        }
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

  buttonTreedot: {
    height: '100%',
    width: scaleWidth(35),
    justifyContent: 'center',
    alignItems: 'center',
  },

  treedot: {
    tintColor: colors.black,
    width: scaleHeight(20),
    height: scaleHeight(20),
  },


});
