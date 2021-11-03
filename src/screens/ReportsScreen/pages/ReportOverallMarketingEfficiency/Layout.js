import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors, images } from "@shared/themes";
import { PeriodPicker, IconButton } from "@shared/components";
import { DataList } from "./DataList";
import { WithPopupActionSheet } from "@shared/HOC";
export const Layout = ({
  isRefresh,
  onRefresh,
  getContentDate,
  timeStart,
  timeEnd,
  setTimeStart,
  setTimeEnd,
  onChangeDate,
  actionSheetExports,
  listMarketingEffciency,
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

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Marketing Efficiency')}
        isLeft={true}
        isRight={true}
        headerRightComponent={() =>
          <IconButton
            icon={images.iconExport}
            iconStyle={styles.iconExport}
            style={styles.buttonExport}
            onPress={exportFile}
          />
        }
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
      >
        <View style={styles.content}>
          <PeriodPicker
            timeStart={timeStart}
            timeEnd={timeEnd}
            setTimeStart={setTimeStart}
            setTimeEnd={setTimeEnd}
            onAccept={(startDate, endDate) => onChangeDate(startDate, endDate)}
          />

          <DataList
            data={listMarketingEffciency}
            onRefresh={onRefresh}
            isRefresh={isRefresh}
            endLoadMore={true}
            timeStart={timeStart}
            timeEnd={timeEnd}
          />

        </View>
      </SingleScreenLayout>
    </View>
  );
};

const styles = StyleSheet.create({

  txtDateRange: {
    fontSize: scaleFont(15),
    fontFamily: fonts.REGULAR,
    color: "#404040"
  },

  buttonDateRange: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: scaleWidth(8),
    marginHorizontal: scaleWidth(16),
    marginBottom: scaleHeight(16),
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 5
  },
  wrapper: {
    padding: 0,
  },

  container: {
    flex: 1,
    backgroundColor: "white",
  },

  content: {
    paddingTop: scaleHeight(16),
    flex: 1,
  },

  button: {
    height: '100%',
    width: scaleWidth(35),
    justifyContent: 'center',
    alignItems: 'center',
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
