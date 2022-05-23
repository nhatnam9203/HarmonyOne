import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton, ItemSelect, NotificationIcon } from "@shared/components";
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { items, itemsRoleManagerAdmin } from "./Items";
import { StaffInfo } from "./StaffInfo";


export const Layout = ({
  onEditProfile,
  goToNotification,
  staff
}) => {

  const scroll = React.useRef(new Animated.Value(0)).current;

  const [t] = useTranslation();

  const roleName = staff?.roleName?.toString()?.toLowerCase();

  const itremsRender = (roleName == "admin" || roleName == "manager") ? itemsRoleManagerAdmin : items;

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
          <StaffInfo onEditProfile={onEditProfile} scroll={scroll} />
          <Animated.ScrollView
            onScroll={
              Animated.event(
                [{
                  nativeEvent: {
                    contentOffset: {
                      y: scroll
                    }
                  }
                }]
              )
            }
            style={styles.containerItem}>
            {
              itremsRender.map((item) => (
                <ItemSelect
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                  onPress={() => item.onPress()}
                  textStyle={{ fontFamily: fonts.MEDIUM }}
                />
              ))
            }
            <View style={{ height: scaleHeight(190) }} />
          </Animated.ScrollView>
        </View>
      </SingleScreenLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    zIndex: -1
  },

  content: {
    flex: 1,
  },

  containerItem: {
    // transform: [{ translateY: -scaleWidth(375 / 3.5 / 2 - 15) }],
    flex: 1,
    zIndex: 99999,
    paddingTop: scaleHeight(140)
  },
});
