import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors, images } from "@shared/themes";
import { PeriodPicker, IconButton, CustomInput, InputSelect } from "@shared/components";
import { DataList } from "./DataList";
import { WithPopupActionSheet } from "@shared/HOC";
export const Layout = ({
  actionSheetExports,
  listSelectedRef,
  getContentList,
  itemSelected,
  onChangeSelected,
  form,
  dataList,
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

  const list = dataList.find(obj => obj?.giftCardGeneralId == itemSelected?.value)?.giftCardStatistics || [];

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Statistic')}
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

        <View style={{ paddingHorizontal: scaleWidth(16), marginTop: -scaleHeight(16) }}>
            <CustomInput
              label=''
              renderInput={() =>
                <InputSelect
                  ref={listSelectedRef}
                  form={form}
                  name="giftcard"
                  items={getContentList()}
                  onSelect={(item) => {
                    onChangeSelected(item);
                  }}
                  title="Gift Card"
                  defaultValue={itemSelected?.label}
                />
              }
            />
          </View>

          <DataList
            data={list}
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
