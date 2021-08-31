import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { fonts, colors } from '@shared/themes';

const INACTIVE_TEXT_COLOR = colors.greyish_brown_40;
const ACTIVE_TEXT_COLOR = colors.ocean_blue;

const TAB_DEFAULT_HEIGHT = scaleWidth(52);

export const ScheduleTopTabBar = ({
  state,
  descriptors,
  navigation,
  position,
  width,
}) => {
  const renderTab = (name, page, isTabActive, onPress) => {
    const activeTextColor = isTabActive
      ? ACTIVE_TEXT_COLOR
      : INACTIVE_TEXT_COLOR;

    return (
      <TouchableOpacity
        key={name}
        onPress={onPress}
        style={[styles.tab, isTabActive && styles.bottomLine]}>
        <Text style={[styles.text, { color: activeTextColor }]}>{name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.tabs, width && { width }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title ?? route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return renderTab(label, index, isFocused, onPress);
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabs: {
    height: TAB_DEFAULT_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    shadowColor: '#0000000c',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
  },

  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingVertical: scaleWidth(6),
    paddingHorizontal: scaleWidth(8),
  },

  text: {
    fontFamily: fonts.MEDIUM,
    fontSize: scaleFont(17),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.41,
  },

  bottomLine: {
    borderBottomWidth: scaleHeight(4),
    borderBottomColor: colors.ocean_blue,
  },
});
