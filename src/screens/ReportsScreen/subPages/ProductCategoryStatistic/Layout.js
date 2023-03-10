import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors, images } from "@shared/themes";
import { PeriodPicker, IconButton, CustomInput, InputSelect } from "@shared/components";
import { DataList } from "./DataList";
import { WithPopupActionSheet } from "@shared/HOC";
import { translate } from "@localize";

export const Layout = ({
  item,
  exportFile
}) => {

  let ExportButton = ({ ...props }) => {
    return (
      <IconButton
        {...props}
        icon={images.iconExport}
        iconStyle={styles.iconExport}
        style={styles.buttonExport}
      />
    );
  };

  ExportButton = WithPopupActionSheet(ExportButton);

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={translate('Category statistic')}
        isLeft={true}
        isRight={true}
        headerRightComponent={() =>
          <IconButton
            icon={images.iconExport}
            iconStyle={styles.iconExport}
            style={styles.buttonExport}
            onPress={exportFile}
          />}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
      >
        <View style={styles.content}>

          <Text style={styles.txtName}>{item?.categoryName}</Text>

          <DataList
            data={item?.details || []}
            onRefresh={() => { }}
            isRefresh={false}
            endLoadMore={true}
          />

        </View>
      </SingleScreenLayout>
    </View>
  );
};

const styles = StyleSheet.create({

  wrapper: {
    padding: 0,
  },

  container: {
    flex: 1,
    backgroundColor: "white",
  },

  content: {
    flex: 1,
    paddingTop : scaleHeight(16)
  },

  button: {
    height: '100%',
    width: scaleWidth(35),
    justifyContent: 'center',
    alignItems: 'center',
  },

  txtName : {
    fontSize : scaleFont(20),
    color : colors.ocean_blue,
    fontFamily : fonts.BOLD,
    marginLeft : scaleWidth(16),
    marginVertical : scaleHeight(8),
    marginBottom : scaleHeight(24)
  },

  iconExport: {
    width: scaleWidth(24),
    height: scaleWidth(24),
    tintColor: "#000"
  },
  buttonExport: {
    height: "100%",
    width: scaleWidth(35),
    justifyContent: "center",
    alignItems: "center"
  }
});
