import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useTranslation } from "react-i18next";
import { IconButton, ItemSelect, NotificationIcon } from "@shared/components";
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { items, itemsRoleManagerAdmin } from "./Items";
import { StaffInfo } from "./StaffInfo";
import { ContainerMoreScreen } from "./ContainerMoreScreen";


export const Layout = ({
  onEditProfile,
  goToNotification,
  staff
}) => {

  const [t] = useTranslation();

  const roleName = staff?.roleName?.toString()?.toLowerCase();

  const itremsRender = (roleName == "admin" || roleName == "manager") ? itemsRoleManagerAdmin : items;

  const [isInfo, setIsInfo] = React.useState(true);
  const scrollViewRefst = React.useRef();
  const scroll = React.useRef(new Animated.Value(0)).current;
  const [isScrolling, setIsScrolling] = React.useState(false);

  const toggleInfo = React.useCallback((status) => {
    setIsInfo(status);
  }, [isInfo]);

  React.useEffect(() => {
    const currentValue = scroll.addListener(({ value }) => {
      if (value > 150) {
        toggleInfo(false);
      } else {
        toggleInfo(true);
      }
    });
  }, []);

  const onScrollEndDrag = (e) => {
    const y = e.nativeEvent.contentOffset.y;
    if (y < 90) {
      scrollViewRefst.current?.scrollTo({ y: 0, animated: true });
    } else {
      scrollViewRefst.current?.scrollTo({ y: 180, animated: true });
    }
    setTimeout(() => {
      setIsScrolling(false);
    }, 300);
  }

  return (
    <View style={styles.container}>
      <ContainerMoreScreen
        pageTitle={''}
        isLeft={false}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
        scroll={scroll}
        staff={staff}
        onPressHeader={onEditProfile}
        headerRightComponent={() =>
          <NotificationIcon />
        }
      >
        <View style={styles.content}>
          {isInfo && <StaffInfo onEditProfile={onEditProfile} scroll={scroll} staff={staff} />}
          <Animated.ScrollView
            ref={scrollViewRefst}
            onScrollEndDrag={onScrollEndDrag}
            onScrollBeginDrag={()=>setIsScrolling(true)}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scroll } } }],
              {
                useNativeDriver: true
              },
            )}
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
      </ContainerMoreScreen>
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
