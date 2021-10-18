import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton, ItemSelect, NotificationIcon } from "@shared/components";
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
        containerStyle={{ paddingVertical: 0 }}
        headerRightComponent={() =>
          <NotificationIcon />
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
});
