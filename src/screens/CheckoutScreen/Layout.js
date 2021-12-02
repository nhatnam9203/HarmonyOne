import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { Button, CustomInput, InputText, IconButton, DropdownMenu, CustomerInfoView } from "@shared/components";
import { fonts, colors, images } from '@shared/themes';
import { ItemList } from "./ItemList";
import { TotalView } from "./TotalView";
import NavigationService from '@navigation/NavigationService';

export const Layout = ({
  appointmentDetail,
  groupAppointments,
  selectPayment,
  onPressBack,
  roleName
}) => {

  const [t] = useTranslation();

  //screen này xư lý button back quay ra màn hinh home
  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Check out')}
        isRight={false}
        isLeft={true}
        isScrollLayout={false}
        onPressLeft={onPressBack}
      >
        <ScrollView style={styles.content}>
          <View style={styles.customerInfoView}>
            <CustomerInfoView
              customerId={appointmentDetail?.customerId}
              firstName={appointmentDetail?.firstName}
              lastName={appointmentDetail?.lastName}
              phoneNumber={appointmentDetail?.phoneNumber}
              isButtonRight={false}
              onPress={()=>{}}
            />
          </View>
          <ItemList
            services={appointmentDetail?.services || []}
            extras={appointmentDetail?.extras || []}
            products={appointmentDetail?.products || []}
            giftCards={appointmentDetail?.giftCards || []}
          />
          <TotalView
            groupAppointments={groupAppointments}
            roleName={roleName}
          />
          <View style={{ height : scaleHeight(80) }} />
        </ScrollView>
 
        <View style={styles.bottom}>
          <Button
            onPress={selectPayment}
            width='100%'
            label={t('Select payment')}
            highlight={true}
          />
        </View>
      </SingleScreenLayout>
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
    paddingHorizontal: scaleWidth(16),
    paddingBottom: scaleHeight(8)
  },

  customerInfoView: {
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
    paddingHorizontal: scaleWidth(16),
  }
});
