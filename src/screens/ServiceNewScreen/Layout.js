import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { DropdownMenu, Button, CustomInput, InputText, InputSelect, IconButton } from "@shared/components";
import { fonts, images } from '@shared/themes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavigationService from '@navigation/NavigationService'

const statusData = [
  { label: "Active", value: "0" },
  { label: "Inactive", value: "1" },
];

export const Layout = ({
  form,
  errors,
  statusRef,
  categoryRef,
  getDataSelectCategory,
  onSubmit,
  back
}) => {

  const [t] = useTranslation();
  
  const dataCategory = getDataSelectCategory();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('New service')}
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
                placeholder="Service name"
                error={errors?.name}
              />
            }
          />

          <CustomInput
            label='Category'
            isRequired
            renderInput={() =>
              <InputSelect
                ref={categoryRef}
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
                placeholder="Description"
                style={{ height: scaleHeight(69), alignItems: 'flex-start', paddingTop: scaleHeight(8) }}
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
                  options={{
                    mask: "9999"
                  }}
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
                  options={{
                    mask: "9999"
                  }}
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
                  options={{
                    mask: "9999"
                  }}
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
          <View style={styles.wrapIconUpload}>
            <Image
              source={images.iconUpload}
              style={styles.iconUpload}
              resizeMode='contain'
            />
            <Text style={{ color: "#CCCCCC", fontSize: scaleFont(14) }}>
              Add image
            </Text>
          </View>

          <CustomInput
            label='Status'
            isRequired
            renderInput={() =>
              <InputSelect
                ref={statusRef}
                title="Status"
                items={statusData}
                defaultValue={'0'}
              />
            }
          />
        </KeyboardAwareScrollView>
      </SingleScreenLayout>
      <View style={styles.bottom}>
        <Button
          label="Save"
          onPress={form.handleSubmit(onSubmit)}
          highlight={true}
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
  }

});
