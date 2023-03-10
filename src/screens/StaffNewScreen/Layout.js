import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { DropdownMenu, Button, CustomInput, InputText, InputSelect, IconButton, CustomImage, ButtonUpload, WorkingTime } from "@shared/components";
import { fonts, images } from '@shared/themes';
import { headerPhoneGroup } from "@shared/utils"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isEmpty } from "lodash";
import { Title, AssignServices, ServiceSalary, ProductSalary, TipSalary, PayoutWithCash, InputPincode } from "./widget";
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
  { label: translate("Active"), value: 0 },
  { label: translate("Inactive"), value: 1 },
];

const roleData = [
  { label: translate("txtStaff"), value: "Staff" },
  { label: translate("Admin"), value: "Admin" },
  { label: translate("Manager"), value: "Manager" },
];


export const Layout = ({
  form,
  errors,
  isEdit,
  onSubmit,
  back,
  statusRef,
  imageUrl,
  onUploadImage,
  inputPhoneHeadRef,
  roleRef,
  productSalaryRef,
  serviceSalaryRef,
  tipFeeRef,
  payoutWithCashRef,
  workingTimeRef,
  assignServicesRef,

}) => {

  const [t] = useTranslation();


  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={isEdit ? translate('Edit staff') : translate('New staff')}
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

          <Title text={translate("Personal Info")} />

          <CustomInput
            label={translate('First Name')}
            isRequired
            error={errors?.firstName}
            renderInput={() =>
              <InputText
                form={form}
                name="firstName"
                placeholder=""
                error={errors?.firstName}
              />
            }
          />

          <CustomInput
            label={translate('Last Name')}
            isRequired
            error={errors?.lastName}
            renderInput={() =>
              <InputText
                form={form}
                name="lastName"
                placeholder=""
                error={errors?.lastName}
              />
            }
          />

          <CustomInput
            label={translate('Display Name')}
            isRequired
            error={errors?.displayName}
            renderInput={() =>
              <InputText
                form={form}
                name="displayName"
                placeholder=""
                error={errors?.displayName}
              />
            }
          />

          <CustomInput
            label={translate('Phone Number')}
            name="phone"
            error={errors?.phone}
            renderInput={() =>
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
                  options={{ mask: "999-999-9999" }}
                  keyboardType='numeric'
                  form={form}
                  name="phone"
                  placeholder="012-3456-789"
                  error={errors?.phone}
                />
              </View>
            }
          />

          <CustomInput
            label={translate('txtEmail')}
            error={errors?.email}
            renderInput={() =>
              <InputText
                form={form}
                name="email"
                placeholder=""
                error={errors?.email}
              />
            }
          />

          <InputPincode
            form={form}
            errors={errors}
          />

          <CustomInput
            label={translate('Role')}
            isRequired
            renderInput={() =>
              <InputSelect
                ref={roleRef}
                form={form}
                name="role"
                title={translate("Role")}
                items={roleData}
                defaultValue={translate('Staff')}
              />
            }
          />

          <Text style={styles.titleDuration}>
            {translate("Avatar")}
          </Text>
          <ButtonUpload
            onResponseImagePicker={onUploadImage}
            imageUrl={imageUrl}
          />

          <CustomInput
            label={translate('Status')}
            renderInput={() =>
              <InputSelect
                ref={statusRef}
                form={form}
                name="status"
                title={translate("Status")}
                items={statusData}
                defaultValue={'0'}
              />
            }
          />

          <WorkingTime 
            ref={workingTimeRef}
            renderTitle={()=><Title text={translate("Working time")} />}
          />

          <AssignServices 
            ref={assignServicesRef}
          />

          <ServiceSalary
            ref={serviceSalaryRef}
          />

          <ProductSalary
            ref={productSalaryRef}
          />

          <TipSalary
            ref={tipFeeRef}
          />

          <PayoutWithCash
            ref={payoutWithCashRef}
          />

          <View style={{ height : scaleHeight(100) }} />
        </KeyboardAwareScrollView >
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
    flexGrow: 1,
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

  styleDropDown: {
    backgroundColor: "#fafafa",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0,
  },

  row: {
    flexDirection: 'row'
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
    alignItems: 'center'
  },

});
