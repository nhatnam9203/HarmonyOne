import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton, ItemSelect } from "@shared/components";
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { items } from "./Items";

export const Layout = ({
  goToNotification,
}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Reports')}
        isLeft={false}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
        headerRightComponent={() =>
          <IconButton
            icon={images.iconBell}
            iconStyle={styles.iconBell}
            style={styles.buttonBell}
            onPress={goToNotification}
          />
        }
      >
        <View style={styles.content}>
          {
            items.map((item) => (
              <ItemSelect
                key={item.title}
                title={item.title}
                icon={item.icon}
                onPress={item.onPress}
              />
            ))
          }
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

  iconBell: {
    tintColor: "#7B99BA",
    width: scaleHeight(20),
    height: scaleHeight(20),
  },

  buttonBell: {
    height: '100%',
    width: scaleWidth(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
