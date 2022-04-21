import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import { colors, fonts } from '@shared/themes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { saveAuthTokenReport } from '@shared/storages/authToken';
import { useAxiosMutationReport, staffLoginRequest } from "@src/apis";

export function CustomBottomBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const merchantID = useSelector((state) => state.merchant?.merchantDetail?.merchantCode);
  const pincodeSaved = useSelector((state) => state.dataLocal.pincodeSaved);

  const [{ isLoading }, staffLogin] = useAxiosMutationReport({
    ...staffLoginRequest(merchantID, pincodeSaved),
    onLoginError: (msg) => {
      NavigationService.back();
    },
    isLoadingDefault : false,
    onSuccess: (data) => {
      if (data) {
        saveAuthTokenReport(data?.token);
      }
    },
  });

  return (
    <View style={styles.bottomContainer}>
      {state.routes?.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const icon = options.tabBarIcon;


        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          
          if (route.key.includes("hpo.reports")) {
            staffLogin();
          }

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              styles.tabContainer,
              {
                paddingBottom: Math.max(insets.bottom, scaleHeight(16)),
                paddingTop: scaleHeight(16),
              },
            ]}>
            <Image
              source={icon}
              style={[
                styles.tabIconStyle,
                isFocused && {
                  width: scaleWidth(26),
                  height: scaleHeight(26),
                  tintColor: colors.ocean_blue,
                },
              ]}
              resizeMode={'contain'}
            />
            <View style={styles.marginHeight} />
            <Text
              style={[
                styles.textStyle,
                isFocused && {
                  fontSize: scaleFont(12),
                  color: colors.ocean_blue,
                },
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: '#efefef',
  },

  textStyle: {
    fontFamily: fonts.REGULAR,
    fontSize: scaleFont(10),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: colors.bluegrey,
  },

  tabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabIconStyle: {
    width: scaleWidth(17),
    height: scaleHeight(17),
    tintColor: colors.bluegrey,
  },

  marginHeight: {
    height: scaleHeight(4),
  },
});
