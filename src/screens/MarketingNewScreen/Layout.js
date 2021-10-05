import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { IconButton, CustomInput, InputText, InputSelect, InputDate, ButtonUpload } from "@shared/components";
import { WithPopupActionSheet } from "@shared/HOC";
import { Switch } from "react-native-paper";
import { RadioButton } from 'react-native-paper';
import DiscountType from "./DiscountType";
import Content from "./Content";
import RadioButtonRN from 'radio-buttons-react-native';
import NumberMessage from "./NumberMessage";
import PickerDateTime from './PickerDateTime';
import SmsConfiguration from "./SmsConfiguration";

const dataRadioButton = [
  {
    label: 'SMS'
  },
  {
    label: 'MMS'
  }
];


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

const conditionList = [
  { label: "No condition", value: "0" },
  { label: "Using specific services", value: "1" },
  { label: "Customer birthday is within the week", value: "2" },
  { label: "Time using the service reacthed the quality", value: "3" },
  { label: "The customer is the referral", value: "4" },
];

const actionList = [
  { label: "Discount for whole cart", value: "0" },
  { label: "Discount for specific services", value: "1" },
]


export const Layout = ({
  form,
  errors,
  getActionSheets,
  conditionRef,
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

          <CustomInput
            label='Condition'
            renderInput={() =>
              <InputSelect
                ref={conditionRef}
                form={form}
                name="condition"
                title="Condition"
                items={conditionList}
                defaultValue={'0'}
              />
            }
          />

          <CustomInput
            label='Action'
            renderInput={() =>
              <InputSelect
                ref={conditionRef}
                form={form}
                name="action"
                title="Action"
                items={actionList}
                defaultValue={'0'}
              />
            }
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
          <View style={{ height: scaleHeight(400) }} />
        </ScrollView>
      </SingleScreenLayout>
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
  }
});
