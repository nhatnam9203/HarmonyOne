import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SingleScreenLayout } from '@shared/layouts';
import { formatMoneyWithUnit, convertMinsToHrsMins } from '@shared/utils';
import { Button } from "@shared/components";
import { colors, fonts, layouts, images } from '@shared/themes';
import { WithPopupActionSheet } from '@shared/HOC';
import { TotalView, TotalViewPaid, AppointmentTimeView, CustomerInfoView, InputSelectStaff, IconButton } from "@shared/components";
import { CustomerAtHomeView } from './CustomerAtHomeView';
import { AppointmentServiceList } from './AppointmentServiceList';
import { InvoiceNumber } from "./InvoiceNumber";
import { translate } from "@localize";
import moment from "moment";


let EditButton = ({ headerTintColor, ...props }) => {
  return (
    <TouchableOpacity style={styles.button} {...props}>
      <Image
        source={images.iconMore}
        style={[styles.iconSize, { tintColor: headerTintColor }]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

EditButton = WithPopupActionSheet(EditButton);

const titleNextStatus = (status) => {
  let text = translate("confirm");
  switch (status) {
    case "unconfirm":
      text = translate("confirm");
      break;

    case "confirm":
      text = translate("check-in");
      break;

    case "checkin":
      text = translate("check-out");
      break

    case "waiting":
      text = translate("check-in");
      break

    case "paid" || "complete":
      text = "Save";
      break

    default:
      break;
  }
  return text;

}


export const Layout = ({
  appointmentItem,
  headerColor,
  canEdit,
  isShowButton,
  getActionSheets,
  updateNextStatus,
  invoiceViewAppointmentDetail,
  getBarStyle,
  getInvoiceDetail,
  roleName,
  staffsByDate,
  assignOtherStaff,
  checkInWaitigList,
  isEditPaidAppointment,
}) => {

  const getPrice = (price) => {
    return formatMoneyWithUnit(price);
  };

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={`${translate('txtAppointment')} #${appointmentItem?.code?.toString().substring(appointmentItem?.code?.length - 4)}`}
        {...headerColor}
        isRight={canEdit}
        isScrollLayout={false}
        barStyle={getBarStyle()}
        containerStyle={{ paddingVertical: 0 }}
        headerRightComponent={() =>
          canEdit && (
            <EditButton
              headerTintColor={headerColor?.headerTintColor}
              actions={getActionSheets()}
            />
          )
        }>
        <ScrollView style={styles.content}>
          <CustomerInfoView
            customerId={appointmentItem?.customerId}
            firstName={appointmentItem?.firstName}
            lastName={appointmentItem?.lastName}
            phoneNumber={appointmentItem?.phoneNumber}
            isShowPhone={(roleName == "admin" || roleName == "manager")}
          />
          <View style={styles.line} />
          <AppointmentTimeView
            fromTime={appointmentItem?.fromTime}
            toTime={appointmentItem?.toTime}
          />
          <View style={styles.line} />
          <AppointmentServiceList
            services={appointmentItem?.services}
            extras={appointmentItem?.extras}
            products={appointmentItem?.products}
            giftCards={appointmentItem?.giftCards}
          />

          {
            (appointmentItem?.status == "paid" 
            || appointmentItem?.status == "refund" 
            || appointmentItem?.status == "void" 
            || appointmentItem?.status == "no show") ?
              <TotalViewPaid
                duration={`${convertMinsToHrsMins(appointmentItem?.duration)}`}
                price={`$ ${appointmentItem?.total}`}
                subTotal={`$ ${appointmentItem?.subTotal}`}
                discount={`$ ${appointmentItem?.discount}`}
                tipAmount={`$ ${appointmentItem?.tipAmount}`}
                tax={`$ ${appointmentItem?.tax}`}
                giftCard={`$ ${appointmentItem?.giftCard}`}
              /> :
              <TotalView
                duration={`${convertMinsToHrsMins(appointmentItem?.duration)}`}
                price={`$ ${appointmentItem?.total}`}
                subTotal={`$ ${appointmentItem?.subTotal}`}
                isShowSubtotal={true}
              />
          }


          <InvoiceNumber
            invoiceViewAppointmentDetail={invoiceViewAppointmentDetail}
            appointmentItem={appointmentItem}
            getInvoiceDetail={getInvoiceDetail}
          />
        </ScrollView>

        {
          canEdit && isShowButton && appointmentItem?.status !== "waiting" &&
          appointmentItem?.status !== "paid" && appointmentItem?.status !== "complete" &&
          <View style={styles.bottom}>
            <Button
              label={titleNextStatus(appointmentItem?.status)}
              onPress={updateNextStatus}
              highlight={true}
              width={'100%'}
            />
          </View>
        }
        {
          !isShowButton &&
          <View style={styles.bottom}>
            <Text style={styles.txtAppointmentAnyStaff}>Cannot checkout in any staff. </Text>
            <InputSelectStaff
              items={staffsByDate.filter(staff => staff?.isDisabled == 0)}
              itemSelected={3}
              serviceId={appointmentItem?.services[0]?.serviceId}
              onSelect={(staffId) => { assignOtherStaff(staffId) }}
              isAnyStaff={true}
              renderInput={() => (
                <View style={styles.buttonArrow}>
                  <Text style={[styles.txtAppointmentAnyStaff, { color: "white", fontFamily: fonts.BOLD }]}>
                    {translate(`Assign appointment to other staff`)}
                  </Text>
                </View>
              )}
            />
          </View>
        }
        {
          appointmentItem?.status == "waiting" &&
          <View style={styles.bottom}>
            <InputSelectStaff
              items={staffsByDate.filter(staff => staff?.isDisabled == 0)}
              itemSelected={0}
              serviceId={appointmentItem?.services[0]?.serviceId}
              onSelect={(staffId) => { checkInWaitigList(staffId) }}
              renderInput={() => (
                <View style={styles.buttonArrow}>
                  <Text style={[styles.txtAppointmentAnyStaff, { color: "white", fontFamily: fonts.BOLD }]}>
                    {translate("check-in")}
                  </Text>
                </View>
              )}
            />
          </View>
        }
      </SingleScreenLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonArrow: {
    width: "100%",
    height: scaleHeight(55),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    alignSelf: "center",
    backgroundColor: colors.ocean_blue,
    marginTop: scaleHeight(8)
  },
  invoiceNumber: {
    fontSize: scaleFont(15),
    color: "#404040",
    fontFamily: fonts.REGULAR,
    marginBottom: scaleHeight(8)
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  content: {
    paddingHorizontal: scaleWidth(16),
    flex: 1,
  },

  line: {
    height: scaleHeight(1),
    width: '100%',
    backgroundColor: '#eeeeee',
    alignSelf: 'center',
  },

  totalContent: {
    flex: 0,
  },

  iconSize: {
    width: scaleWidth(24),
    height: scaleHeight(24),
  },

  button: {
    height: '100%',
    width: scaleWidth(35),
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottom: {
    padding: scaleWidth(24),
    width: scaleWidth(375),
  },

  txtAppointmentAnyStaff: {
    color: colors.red,
    fontSize: scaleFont(14),
    fontFamily: fonts.REGULAR,
    textAlign: "center",
    marginHorizontal: scaleWidth(20),
  }

});