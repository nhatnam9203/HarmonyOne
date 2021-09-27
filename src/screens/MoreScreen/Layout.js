import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton, ItemSelect } from "@shared/components";
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { items } from "./Items";
import { StaffInfo } from "./StaffInfo";

export const Layout = ({
  onEditProfile,
  goToNotification
}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={''}
        isLeft={false}
        isScrollLayout={false}
        imageBackground={images.imageHeaderBg}
        containerStyle={{ paddingVertical: 0 }}
        headerTintColor="white"
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
          <StaffInfo onEditProfile={onEditProfile} />
          <ScrollView style={styles.containerItem}>
            {
              items.map((item) => (
                <ItemSelect
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                  onPress={()=>item.onPress()}
                />
              ))
            }
            <View style={{ height : scaleHeight(60) }} />
          </ScrollView>
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

  containerItem: {
    transform: [{ translateY: -scaleWidth(375 / 3.5 / 2 - 15) }],
    flex : 1,
  },
  iconBell: {
    tintColor: colors.white,
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
