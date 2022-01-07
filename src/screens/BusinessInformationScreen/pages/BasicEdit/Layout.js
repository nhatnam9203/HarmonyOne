import React from 'react';
import {
  Button,
  CustomInput,
  DropdownMenu,
  InputText,
} from '@shared/components';
import { SingleScreenLayout } from '@shared/layouts';
import { headerPhoneGroup } from '@shared/utils';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';

export const Layout = ({
  merchantDetail,
  inputPhoneHeadRef,
  onSubmit,
  form,
  errors,
}) => {
  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Basic Informations')}
        isLeft={true}
        isRight={false}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0, paddingTop: scaleHeight(8) }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.content}>
            <CustomInput
              label="Business Name"
              isRequired
              error={errors?.businessName}
              renderInput={() => <InputText form={form} name="businessName" error={errors?.businessName} />}
            />
            <CustomInput
              label="Phone Number"
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
              label="Contact Email"
              error={errors?.email}
              renderInput={() => <InputText form={form} name="email" error={errors?.email} />}
            />
            <CustomInput
              label="Website"
              renderInput={() => <InputText form={form} name="webLink" />}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.bottom}>
          <Button
            onPress={form.handleSubmit(onSubmit)}
            height={scaleHeight(48)}
            width="100%"
            label={t('Save')}
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
    width: scaleWidth(250),
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
