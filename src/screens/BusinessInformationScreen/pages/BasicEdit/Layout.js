import React from 'react';
import {
  Button,
  CustomInput,
  DropdownMenu,
  InputText,
} from '@shared/components';
import { SingleScreenLayout } from '@shared/layouts';
import { headerPhoneGroup } from '@shared/utils';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { translate } from "@localize";

export const Layout = ({
  merchantDetail,
  inputPhoneHeadRef,
  onSubmit,
  form,
  errors,
  checkWebsiteValid,
}) => {

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={translate('Basic Informations')}
        isLeft={true}
        isRight={false}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0, paddingTop: scaleHeight(8) }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <KeyboardAwareScrollView style={styles.content}>
            <CustomInput
              label={translate("Business Name")}
              isRequired
              error={errors?.businessName}
              renderInput={() => <InputText form={form} name="businessName" error={errors?.businessName} placeholder="Business Name" />}
            />
            <CustomInput
              label={translate("Phone Number")}
              renderInput={() => (
                <View style={styles.row}>
                  <DropdownMenu
                    ref={inputPhoneHeadRef}
                    items={headerPhoneGroup}
                    onChangeValue={() => { }}
                    defaultIndex={0}
                    width={scaleWidth(95)}
                    height={scaleWidth(42)}
                    styleDropDown={styles.styleDropDown}
                  />
                  <InputText
                    style={styles.inputPhone}
                    options={{ mask: '999-999-9999' }}
                    form={form}
                    name="phone"
                    keyboardType="phone-pad"
                    placeholder="012-3456-789"
                  />
                </View>
              )}
            />
            <CustomInput
              label={translate("Contact Email")}
              error={errors?.email}
              renderInput={() => <InputText form={form} name="email" error={errors?.email} placeholder="example@gmail.com" />}
            />
            <CustomInput
              label={translate("Website")}
              renderInput={() => <InputText form={form} name="webLink" onBlur={checkWebsiteValid} placeholder="https://www.your-site.com" />}
            />
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
        <View style={styles.bottom}>
          <Button
            onPress={form.handleSubmit(onSubmit)}
            height={scaleHeight(48)}
            width="100%"
            label={translate('txtSave')}
            highlight={true}
            disabled={errors?.categoryName}
          />
        </View>
      </SingleScreenLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  content: {
    flex: 1,
    padding: scaleWidth(16),
  },

  bottom: {
    paddingHorizontal: scaleWidth(16),
    paddingBottom: scaleHeight(32),
  },

  inputPhone: {
    width: scaleWidth(247),
    height: scaleWidth(42),
    borderWidth: 1,
    borderColor: '#dddddd',
    flexDirection: 'row',
    borderRadius: 5,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingHorizontal: scaleWidth(10),
    alignItems: 'center',
  },

  styleDropDown: {
    backgroundColor: '#fafafa',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0,
  },

  row: {
    flexDirection: 'row',
  },
});
