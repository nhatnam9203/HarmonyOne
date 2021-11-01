import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors, images } from "@shared/themes";
import { PeriodPicker, IconButton, InputSelect, CustomInput } from "@shared/components";
import { DataList } from "./DataList";
import { WithPopupActionSheet } from "@shared/HOC";
export const Layout = ({
  isRefresh,
  listSelectedRef,
  form,
  onChangeDate,
  actionSheetExports,
  serviceDurationStaffDetail,
  exportFile,
  getContentList,
  onChangeSelectec,
  staffSelected
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
        pageTitle={t('Staff statistic')}
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

          <View style={{ paddingHorizontal : scaleWidth(16) }}>
            <CustomInput
              label=''
              renderInput={() =>
                <InputSelect
                  ref={listSelectedRef}
                  form={form}
                  name="staff"
                  items={getContentList()}
                  onSelect={(staff) => {
                    onChangeSelectec(staff);
                  }}
                  title="Staff"
                  defaultValue={staffSelected?.label}
                />
              }
            />
          </View>

          <DataList
            data={serviceDurationStaffDetail}
            onRefresh={() => { }}
            isRefresh={isRefresh}
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
