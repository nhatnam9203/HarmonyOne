import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { SearchInput, PeriodPicker, IconButton, CustomInput, InputSelect } from "@shared/components";
import { images } from "@shared/themes/resources";
import { DataList } from "./DataList";
import { customerGroup } from "@shared/utils"

export const Layout = ({
  form,
  stafListRef,
  staffList,
  staffSelected,
  listStaffSales,
  setStaffSelected
}) => {

  const [t] = useTranslation();

  const staffChoosed = listStaffSales.find(obj => obj?.staffId == staffSelected?.value);

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Staff income details')}
        isRight={true}
        isLeft={true}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
      >

        <View style={styles.content}>
          <CustomInput
            label=''
            renderInput={() =>
              <InputSelect
                ref={stafListRef}
                form={form}
                name="staff"
                items={staffList}
                onSelect={(staff) => { 
                  setStaffSelected(staff);
                 }}
                title="Staff"
                defaultValue={staffSelected?.label}
              />
            }
          />

          <DataList
            data={staffChoosed?.details|| []}
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
    paddingHorizontal: scaleWidth(16),
    flex: 1,
  },

  button: {
    height: '100%',
    width: scaleWidth(35),
    justifyContent: 'center',
    alignItems: 'center',
  },

  styleDropDown: {
    backgroundColor: "white",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
});
