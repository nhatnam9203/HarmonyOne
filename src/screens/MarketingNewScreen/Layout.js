import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { IconButton, CustomInput, InputText, InputSelect, InputDate, ButtonUpload, Button } from "@shared/components";
import { WithPopupActionSheet } from "@shared/HOC";
import { Switch } from "react-native-paper";
import { RadioButton } from 'react-native-paper';
import DiscountType from "./DiscountType";
import Content from "./Content";
import RadioButtonRN from 'radio-buttons-react-native';
import NumberMessage from "./NumberMessage";
import PickerDateTime from './PickerDateTime';
import SmsConfiguration from "./SmsConfiguration";
import Condition from "./Condition";
import MarketingAction from "./MarketingAction";


let EditButton = ({ ...props }) => {
  return (
    <IconButton
      icon={images.treedot}
      iconStyle={styles.treedot}
      style={styles.buttonTreedot}
      onPress={() => { }}
      {...props}
    />
  );
};

EditButton = WithPopupActionSheet(EditButton);


export const Layout = ({
  form,
  errors,
  getActionSheets,
  actionRef,
  checked,
  setChecked,
  imageUrl,
  onUploadImage,

}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t("New campaign")}
        isLeft={true}
        isRight={true}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
        headerRightComponent={() =>
          <EditButton actions={getActionSheets()} />
        }
      >
        <ScrollView style={styles.content}>
          <CustomInput
            label='Campaign name'
            isRequired
            error={errors?.campaignName}
            renderInput={() =>
              <InputText
                form={form}
                name="campaignName"
                placeholder="Campaign name"
                error={errors?.campaignName}
              />
            }
          />

          <PickerDateTime />

          <Condition
            form={form}
            errors={errors}
          />

          <MarketingAction
            form={form}
            errors={errors}
          />

          <DiscountType
            form={form}
            errors={errors}
          />

          <SmsConfiguration onUploadImage={onUploadImage} imageUrl={imageUrl} />

          <Content
            form={form}
            errors={errors}
          />

          <NumberMessage />

          <IconButton
            iconComponent={() => <SwitchButton />}
            iconStyle={styles.iconStyle}
            style={styles.rowReverse}
            renderText={() => <Text style={styles.txtItem}>{t('Active')}</Text>}
          />

          <IconButton
            iconComponent={() => <SwitchButton />}
            iconStyle={styles.iconStyle}
            style={styles.rowReverse}
            renderText={() => <Text style={styles.txtItem}>{t('Manually')}</Text>}
          />
          <View style={{ height: scaleHeight(200) }} />
        </ScrollView>
      </SingleScreenLayout>

      <View style={styles.bottom}>
        <Button
          label="Save"
          onPress={() => { }}
          highlight={true}
          width={'100%'}
        />
      </View>
    </View>
  );
};


const SwitchButton = ({
  isVisible = false, onChange
}) => {
  return (
    <Switch
      value={isVisible}
      onValueChange={onChange}
      color={colors.ocean_blue}
    />
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  content: {
    flex: 1,
    padding: scaleWidth(16),
  },

  buttonTreedot: {
    height: '100%',
    width: scaleWidth(35),
    justifyContent: 'center',
    alignItems: 'center',
  },

  treedot: {
    tintColor: colors.black,
    width: scaleHeight(20),
    height: scaleHeight(20),
  },

  rowReverse: {
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    marginBottom: scaleHeight(16)
  },

  txtItem: {
    fontSize: scaleFont(16),
    fontFamily: fonts.REGULAR,
    color: '#809DBD',
  },

  messageLimit: {
    fontSize: scaleFont(13),
    marginTop: -scaleHeight(12),
    fontFamily: fonts.LIGHT,
    marginBottom: scaleHeight(16)
  },

  textDate: {
    fontSize: scaleFont(15),
  },

  iconCalendar: {
    width: scaleWidth(20), height: scaleWidth(20)
  },

  iconTime: {
    width: scaleWidth(12), height: scaleWidth(12)
  },

  bottom: {
    padding: scaleWidth(16),
    width: scaleWidth(375),
  },

});
