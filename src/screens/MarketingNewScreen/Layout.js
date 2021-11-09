import React from 'react';
import { View, StyleSheet, Text, ScrollView, Alert, Image } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { IconButton, CustomInput, InputText, InputSelect, InputDate, ButtonUpload, Button } from "@shared/components";
import { WithPopupActionSheet } from "@shared/HOC";
import { Switch } from "react-native-paper";
import { RadioButton } from 'react-native-paper';

import MarketingDiscount from "./MarketingDiscount";
import MarketingContent from "./MarketingContent";
import RadioButtonRN from 'radio-buttons-react-native';
import MarketingNumberMessage from "./MarketingNumberMessage";
import MarketingDatePicker from './MarketingDatePicker';
import SmsConfiguration from "./MarketingSmsConfiguration";
import MarketingCondition from "./MarketingCondition";
import MarketingAction from "./MarketingAction";
import { PoupFilterCustomer } from "./widget";

import DropdownAlert from 'react-native-dropdownalert';


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
  conditionRef,
  datePickerRef,
  smsConfigurationRef,
  checked,
  setChecked,
  imageUrl,
  onUploadImage,
  defaultMessage,
  smsMaxCustomer,
  smsMaxAmount,
  calculatorsmsMoney,
  valueSlider,
  hanldeSliderValue,
  smsAmount,
  customerSendSMSQuantity,
  isManually,
  isDisabled,
  setDisabled,
  setManually,
  handleCampaign,
  alertRef,
  popupFilterCustomerRef,
  customerList,
  setCustomerList,
  isViewDetail,
  isEdit,
  disableCampaign,
  enableCampaign,
}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <SingleScreenLayout
          pageTitle={isViewDetail ? t("Campaign detail") : isEdit ? t("Edit campaign") : t("New campaign")}
          isLeft={true}
          isRight={true}
          isScrollLayout={false}
          containerStyle={{ paddingVertical: 0 }}
          headerRightComponent={() =>
            isViewDetail ? <EditButton actions={getActionSheets()} /> : <View />
          }
        >
          <ScrollView style={styles.content}>
            <View pointerEvents={isViewDetail ? "none" : "auto"}>
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
                    onBlur={() => {
                      form.setValue("message", defaultMessage());
                      calculatorsmsMoney(valueSlider);
                    }}
                  />
                }
              />

              <MarketingDatePicker
                ref={datePickerRef}
              />

              <MarketingCondition
                form={form}
                errors={errors}
                ref={conditionRef}
                defaultMessage={defaultMessage}
                calculatorsmsMoney={calculatorsmsMoney}
                valueSlider={valueSlider}
              />

              <MarketingAction
                form={form}
                errors={errors}
                ref={actionRef}
                defaultMessage={defaultMessage}
                calculatorsmsMoney={calculatorsmsMoney}
                valueSlider={valueSlider}
              />

              <MarketingDiscount
                form={form}
                errors={errors}
                defaultMessage={defaultMessage}
              />

              {
                !isViewDetail && <>
                  <SmsConfiguration
                    onUploadImage={onUploadImage}
                    imageUrl={imageUrl}
                    ref={smsConfigurationRef}
                    openPopupFilterCustomer={() => { popupFilterCustomerRef?.current?.show(customerList) }}
                  />

                  <MarketingContent
                    form={form}
                    errors={errors}
                    defaultMessage={defaultMessage}
                  />

                  <MarketingNumberMessage
                    smsMaxCustomer={smsMaxCustomer}
                    smsMaxAmount={smsMaxAmount}
                    valueSlider={valueSlider}
                    hanldeSliderValue={hanldeSliderValue}
                    smsAmount={smsAmount}
                    customerSendSMSQuantity={customerSendSMSQuantity}
                  />
                </>
              }

              <IconButton
                iconComponent={() => <Switch color={colors.ocean_blue} onValueChange={setDisabled} value={isDisabled} />}
                iconStyle={styles.iconStyle}
                style={styles.rowReverse}
                renderText={() => <Text style={styles.txtItem}>{t('Active')}</Text>}
              />

              {
                !isViewDetail && <IconButton
                  iconComponent={() => <Switch color={colors.ocean_blue} onValueChange={setManually} value={isManually} />}
                  iconStyle={styles.iconStyle}
                  style={styles.rowReverse}
                  renderText={() => <Text style={styles.txtItem}>{t('Manually')}</Text>}
                />
              }
              <View style={{ height: scaleHeight(200) }} />
            </View>
          </ScrollView>
        </SingleScreenLayout>
      </View>

      <View style={styles.bottom}>
        {
          isViewDetail ?
            <Button
              label={!isDisabled ? "Start" : "Disable"}
              onPress={!isDisabled ? enableCampaign : disableCampaign}
              highlight={true}
              width={'100%'}
              styleButton={{ backgroundColor: !isDisabled ? colors.ocean_blue : "red", borderWidth: 0 }}
            /> :
            <Button
              label="Save"
              onPress={handleCampaign}
              highlight={true}
              width={'100%'}
            />
        }
      </View>

      <PoupFilterCustomer
        ref={popupFilterCustomerRef}
        onApply={list => setCustomerList(list)}
      />

      <DropdownAlert
        ref={alertRef}
        closeInterval={2000}
        infoColor="#1B68AC"
        titleStyle={styles.titleAlertStyle}
        messageStyle={styles.messageAlertStyle}
        defaultContainer={styles.alertStyle}
        renderImage={() => <Image source={images.harmonyPay} style={styles.iconHarmonyPay} />}
      />

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

  messageAlertStyle: {
    fontSize: scaleFont(15),
    color: "white",
    fontFamily: fonts.REGULAR
  },

  titleAlertStyle: {
    fontSize: scaleFont(19),
    color: "white",
    fontFamily: fonts.BOLD
  },

  alertStyle: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    paddingLeft: 20,
    paddingTop: 30,
    paddingBottom: 8
  },

  iconHarmonyPay: {
    width: scaleWidth(45),
    height: scaleWidth(45),
    tintColor: "white"
  }


});
