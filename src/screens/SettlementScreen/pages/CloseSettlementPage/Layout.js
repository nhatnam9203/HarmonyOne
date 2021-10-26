import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton, DialogConfirm, Button } from "@shared/components";
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { Switch } from "react-native-paper";

export const Layout = ({
  refDialogSignout,
  onLogout,
}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>

      </View>
      <View style={styles.bottom}>
        <Button
          label="Confirm"
          onPress={() => { }}
          highlight={true}
          width={'100%'}
        />
      </View>
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
    padding: scaleWidth(16),
    paddingTop: scaleHeight(16),
  },

  iconStyle: {
    width: scaleWidth(11),
    height: scaleWidth(11),
    resizeMode: 'contain'
  },
  txtItem: {
    fontSize: scaleFont(16),
    color: colors.greyish_brown_40,
    fontFamily: fonts.REGULAR
  },
  rowReverse: {
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    marginBottom: scaleHeight(16)
  },
  seperateLine: {
    width: '100%',
    height: 1,
    backgroundColor: "#eeeeee",
    marginBottom: scaleHeight(16)
  },
  title: {
    fontSize: scaleFont(20),
    color: '#0D3C53',
    fontFamily: fonts.MEDIUM,
    marginBottom: scaleHeight(16)
  },

  bottom: {
    padding: scaleWidth(16),
    width: scaleWidth(375),
  },
});
