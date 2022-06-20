import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { DropdownMenu, Button, CustomInput, InputText, InputSelect, IconButton, CustomImage, ButtonUpload } from "@shared/components";
import { fonts, images } from '@shared/themes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isEmpty } from "lodash";
import NavigationService from '@navigation/NavigationService';
import { translate } from "@localize";

const options = {
  title: translate("Select Image"),
  customButtons: [],
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
};

const statusData = [
  { label: translate("Active"), value: "0" },
  { label: translate("Inactive"), value: "1" },
];

export const Layout = ({
  form,
  errors,
  isEdit,
  onSubmit,
  back,
  statusRef,
  imageUrl,
  onUploadImage
}) => {

  const [t] = useTranslation();


  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={isEdit ? translate('Edit extra') : translate('New extra')}
        isRight={true}
        isLeft={false}
        isScrollLayout={false}
        headerRightComponent={() =>
          <IconButton
            onPress={back}
            icon={images.iconClose}
            iconStyle={styles.icon}
            style={styles.button}
          />
        }
      >
        <KeyboardAwareScrollView style={styles.content}>
          <CustomInput
            label={translate('Extra name')}
            isRequired
            error={errors?.name}
            renderInput={() =>
              <InputText
                form={form}
                name="name"
                placeholder=""
                error={errors?.name}
              />
            }
          />

          <CustomInput
            label={translate('Description')}
            renderInput={() =>
              <InputText
                form={form}
                name="description"
                placeholder=""
                style={{ height: scaleHeight(79), alignItems: 'flex-start', paddingTop: scaleHeight(8) }}
                multiline={true}
              />
            }
          />

          <Text style={styles.titleDuration}> {translate("Duration")} </Text>
          <View style={styles.durationRow}>
            <CustomInput
              label={translate('Minutes')}
              isRequired
              error={errors?.duration}
              labelStyle={styles.labelDuration}
              renderInput={() =>
                <InputText
                  style={{ width: scaleWidth(375 - 32), alignItems: 'center' }}
                  form={form}
                  name="duration"
                  placeholder="0"
                  options={{ mask: "9999" }}
                  error={errors?.duration}
                  renderRight={() => <Text style={styles.duration}>{translate("min")}</Text>}
                />
              }
            />
          </View>

          <CustomInput
            label={translate('Price')}
            isRequired
            error={errors?.price}
            renderInput={() =>
              <InputText
                form={form}
                name="price"
                placeholder="0.00"
                type="money"
                style={{ alignItems: 'center' }}
                options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
                error={errors?.price}
                renderLeft={() =>
                  <Text style={styles.dollar}>$</Text>
                }
              />
            }
          />

          <CustomInput
            label={translate('Surcharged')}
            isRequired
            error={errors?.supplyFee}
            renderInput={() =>
              <InputText
                form={form}
                name="supplyFee"
                placeholder="0.00"
                type="money"
                error={errors?.supplyFee}
                style={{ alignItems: 'center' }}
                options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
                renderLeft={() =>
                  <Text style={styles.dollar}>$</Text>
                }
              />
            }
          />

          <Text style={styles.titleDuration}>
            {translate("Image")}
          </Text>
          <ButtonUpload
            onResponseImagePicker={onUploadImage}
            imageUrl={imageUrl}
          />

          <CustomInput
            label={translate('Status')}
            isRequired
            error={errors?.status}
            renderInput={() =>
              <InputSelect
                ref={statusRef}
                form={form}
                name="status"
                error={errors?.status}
                title={translate("Status")}
                items={statusData}
                defaultValue={'0'}
              />
            }
          />
        </KeyboardAwareScrollView>
      </SingleScreenLayout>
      <View style={styles.bottom}>
        <Button
          label={translate("txtSave")}
          onPress={form.handleSubmit(onSubmit)}
          highlight={true}
          disabled={!isEmpty(errors)}
          width={'100%'}
        />
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    position: 'relative',
  },
  content: {
    flex: 1,
    paddingHorizontal: scaleWidth(15),
  },

  dollar: {
    fontSize: scaleFont(18),
    color: "#404040",
    marginRight: scaleWidth(8),
    fontFamily: fonts.MEDIUM
  },

  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  duration: {
    fontSize: scaleFont(15),
    color: "#333"
  },

  labelDuration: {
    color: '#333',
    fontFamily: fonts.LIGHT,
    fontSize: scaleFont(15)
  },

  titleDuration: {
    fontSize: scaleFont(17),
    color: '#7A98BB',
    marginBottom: scaleHeight(10),
    fontFamily: fonts.REGULAR
  },

  icon: {
    width: scaleWidth(30),
    height: scaleWidth(30),
    tintColor: "#333"
  },

  button: {
    height: '100%',
    alignItems: 'center'
  },

  bottom: {
    padding: scaleWidth(16),
    width: scaleWidth(375),
  },

  iconUpload: {
    width: scaleWidth(50),
    height: scaleWidth(50),
    marginBottom: 5
  },

  wrapIconUpload: {
    padding: scaleWidth(15),
    backgroundColor: '#FAFAFA',
    width: scaleWidth(120),
    height: scaleWidth(120),
    marginBottom: scaleHeight(20),
    justifyContent: 'center',
    alignItems: 'center'
  },

  imageUpload: {
    width: '100%',
    height: '100%'
  }

});
