import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { colors, fonts, layouts, images } from '@shared/themes';
import { Button, CustomInput, InputText, DropdownMenu, CustomImage } from "@shared/components";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { HeaderEditProfile } from "./HeaderEditProfile";
import { headerPhoneGroup, createFormData } from "@shared/utils";
import { WithPopupUpload } from '@shared/HOC';

let AvatarProfile = ({ staff, imageUrl, onResponseImagePicker, ...props }) => {
  return (
    <TouchableOpacity
      style={styles.containerAvatar}
      onResponseImagePicker={onResponseImagePicker}
      {...props}
    >
      <View style={styles.wrapAvatar}>
        <CustomImage
          style={styles.avatar}
          source={{ uri: imageUrl }}
        >
          <Image
            style={styles.iconCamera}
            source={images.iconCamera}
            resizeMode={'contain'}
          />
        </CustomImage>
      </View>
    </TouchableOpacity>
  );
};

AvatarProfile = WithPopupUpload(AvatarProfile);

export const Layout = ({
  form,
  errors,
  inputPhoneHeadRef,
  onSubmit,
  staff,
  imageUrl,
  onHandleChangeAvatar,
}) => {

  const [t] = useTranslation();

  return (
    <View style={layouts.fill}>
      <HeaderEditProfile />
      <View style={styles.content}>
        <AvatarProfile
          staff={staff}
          imageUrl={imageUrl}
          onResponseImagePicker={onHandleChangeAvatar}
        />

        <KeyboardAwareScrollView style={styles.contentInput}>
          <CustomInput
            label='First name'
            error={errors?.firstName}
            renderInput={() =>
              <InputText
                form={form}
                name="firstName"
                placeholder="First name"
                error={errors?.firstName}
              />
            }
          />

          <CustomInput
            label='Last name'
            error={errors?.lastName}
            renderInput={() =>
              <InputText
                form={form}
                name="lastName"
                placeholder="Last name"
                error={errors?.lastName}
              />
            }
          />

          <CustomInput
            label='Display name'
            error={errors?.displayName}
            renderInput={() =>
              <InputText
                form={form}
                name="displayName"
                placeholder="Display name"
                error={errors?.displayName}
              />
            }
          />

          <CustomInput
            label='Phone number'
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
            label='Email'
            error={errors?.email}
            renderInput={() =>
              <InputText
                form={form}
                name="email"
                placeholder="Email"
                error={errors?.email}
              />
            }
          />

          <CustomInput
            label='Street'
            error={errors?.street}
            renderInput={() =>
              <InputText
                form={form}
                name="street"
                placeholder="Street"
                error={errors?.street}
              />
            }
          />

          <CustomInput
            label='City'
            error={errors?.city}
            renderInput={() =>
              <InputText
                form={form}
                name="city"
                placeholder="City"
                error={errors?.city}
              />
            }
          />

          <View style={{ height: scaleHeight(100) }} />
        </KeyboardAwareScrollView>

        <View style={styles.bottom}>
          <Button
            label="Save"
            onPress={form.handleSubmit(onSubmit)}
            highlight={true}
            width={'100%'}
          />
        </View>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  content: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.white,
  },

  contentInput: {
    flex: 1,
    transform: [{ translateY: -scaleWidth(375 / 3 / 2 - 15) }],
    paddingHorizontal: scaleWidth(16),
  },

  containerAvatar: {
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateY: -scaleWidth(375 / 3 / 2) }]
  },

  wrapAvatar: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 3,
    borderColor: "white",
    width: scaleWidth(375 / 3),
    height: scaleWidth(375 / 3),
    borderRadius: 1000,
  },

  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 1000,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  iconCamera: {
    width: scaleWidth(25),
    height: scaleWidth(25),
    resizeMode: 'contain'
  },

  styleDropDown: {
    backgroundColor: "#fafafa",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0,
  },

  row: {
    flexDirection: 'row',
  },

  bottom: {
    padding: scaleWidth(16),
    width: scaleWidth(375),
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