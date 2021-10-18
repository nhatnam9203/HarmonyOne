import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { DropdownMenu, Button, CustomInput, InputText, InputSelect, IconButton, CustomImage, ButtonUpload } from "@shared/components";
import { fonts, images, colors } from '@shared/themes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isEmpty } from "lodash";
import NavigationService from '@navigation/NavigationService';

const options = {
  title: "Select Image",
  customButtons: [],
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
};

const statusData = [
  { label: "Active", value: "0" },
  { label: "Inactive", value: "1" },
];

export const Layout = ({
  form,
  errors,
  isEdit,
  getDataSelectCategory,
  onSubmit,
  back,
  categoryRef,
  statusRef,
  onUploadImage,
  imageUrl,
  newExtra,
  selectExtraExist,
  extrasSelection,
  extrasListSelected
}) => {

  const [t] = useTranslation();

  const dataCategory = getDataSelectCategory();

  const extraList = isEdit ? extrasListSelected : extrasSelection;

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={isEdit ? t('Edit service') : t('New service')}
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
            label='Service name'
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
            label='Category'
            isRequired
            error={errors?.category}
            renderInput={() =>
              <InputSelect
                ref={categoryRef}
                form={form}
                name="category"
                error={errors?.category}
                items={dataCategory}
                title="Select category"
                defaultValue={'Select category'}
              />
            }
          />

          <CustomInput
            label='Service description'
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

          <Text style={styles.titleDuration}> Duration </Text>
          <View style={styles.durationRow}>
            <CustomInput
              label='Minutes'
              isRequired
              labelStyle={styles.labelDuration}
              renderInput={() =>
                <InputText
                  style={{ width: scaleWidth(102), alignItems: 'center' }}
                  inputStyle={styles.duration}
                  form={form}
                  name="duration"
                  placeholder="0"
                  options={{ mask: "9999" }}
                  error={errors?.duration}
                  renderRight={() => <Text style={styles.duration}>min</Text>}
                />
              }
            />
            <CustomInput
              label='Open time'
              labelStyle={styles.labelDuration}
              renderInput={() =>
                <InputText
                  style={{ width: scaleWidth(102), alignItems: 'center' }}
                  inputStyle={styles.duration}
                  form={form}
                  name="openTime"
                  placeholder="0"
                  options={{ mask: "9999" }}
                  renderRight={() => <Text style={styles.duration}>min</Text>}
                />
              }
            />
            <CustomInput
              label='Second time'
              labelStyle={styles.labelDuration}
              renderInput={() =>
                <InputText
                  style={{ width: scaleWidth(102), alignItems: 'center' }}
                  inputStyle={styles.duration}
                  form={form}
                  name="secondTime"
                  placeholder="0"
                  options={{ mask: "9999" }}
                  renderRight={() => <Text style={styles.duration}>min</Text>}
                />
              }
            />
          </View>

          <CustomInput
            label='Price'
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
            label='Supply fee'
            renderInput={() =>
              <InputText
                form={form}
                name="supplyFee"
                placeholder="0.00"
                type="money"
                style={{ alignItems: 'center' }}
                options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
                renderLeft={() =>
                  <Text style={styles.dollar}>$</Text>
                }
              />
            }
          />

          <Text style={styles.titleDuration}>
            Image
          </Text>
          <ButtonUpload
            onResponseImagePicker={onUploadImage}
            imageUrl={imageUrl}
          />

          <CustomInput
            label='Status'
            isRequired
            error={errors?.status}
            renderInput={() =>
              <InputSelect
                ref={statusRef}
                form={form}
                name="status"
                error={errors?.status}
                title="Status"
                items={statusData}
                defaultValue={'0'}
              />
            }
          />

          <Text style={styles.txtExtra}>Extra</Text>
          <CustomInput
            label='Select exist extras'
            renderInput={() =>
              <TouchableOpacity onPress={selectExtraExist} style={styles.wrapInput}>
                <Text style={styles.valueExtraSelected}>
                  {extraList.filter(ex=>ex.checked).length == 0 ? 
                  "No extra selected" : 
                  `${extraList.filter(ex=>ex.checked).length} extras selected`}
                </Text>
                <Image
                  style={styles.iconDropDown}
                  source={images.dropdown}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            }
          />
          <IconButton
            icon={images.iconAddMore}
            iconStyle={styles.iconAddMore}
            style={styles.buttonAddMore}
            renderText={() => <Text style={styles.txtAddNewExtra}>Add new extra</Text>}
            onPress={newExtra}
          />
          <View style={{ height: scaleHeight(100) }} />
        </KeyboardAwareScrollView>
      </SingleScreenLayout>
      <View style={styles.bottom}>
        <Button
          label="Save"
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
  },

  txtExtra: {
    fontSize: scaleFont(17),
    fontFamily: fonts.BOLD,
    color: colors.ocean_blue,
    marginBottom: scaleHeight(16)
  },

  iconAddMore: {
    width: scaleWidth(18),
    height: scaleWidth(18),
    marginRight: scaleWidth(8)
  },

  buttonAddMore: {

  },

  txtAddNewExtra: {
    fontSize: scaleFont(17),
    fontFamily: fonts.REGULAR,
    color: colors.ocean_blue,
  },

  wrapInput: {
    width: '100%',
    height: scaleWidth(42),
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 3,
    paddingHorizontal: scaleWidth(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconDropDown: {
    width: scaleWidth(12),
    height: scaleWidth(12),
    resizeMode: 'contain'
  },
  valueExtraSelected: {
    fontSize: scaleFont(16),
    fontFamily: fonts.REGULAR,
  }
});
