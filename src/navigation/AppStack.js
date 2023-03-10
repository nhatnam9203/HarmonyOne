import * as React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {
  ForgotPincode,
  AppointmentDetailScreen,
  AppointmentNewScreen,
  CustomerNewScreen,
  CustomerNewRoleStaff,
  CustomerDetailScreen,
  CustomersScreen,
  ServiceScreen,
  ServiceNewScreen,
  CategoryNewScreen,
  EditProfileScreen,
  SettingScreen,
  HardwareScreen,
  AddDeviceHardware,
  PrinterList,
  SetupHardware,
  NotificationScreen,
  NotificationRoleStaffScreen,
  ReviewScreen,
  MarketingScreen,
  MarketingNewScreen,
  ExtraScreen,
  ExtraNewScreen,
  ExtraSelectScreen,
  ProductScreen,
  ProductNewScreen,
  StaffScreen,
  StaffNewScreen,
  BusinessInformationScreen,
  CheckoutScreen,
  AddTipPage,
  ApplyDiscountPage,
  PaymentPage,
  EditAppointmentScreen,
  EditPaidAppointmentScreen,
  AddServicePage,
  GiftCardAmountPage,
  AddServiceDetailPage,
  EditPaidServicePage,
  AddProductDetailPage,
  EnterAmountPage,
  InvoiceScreen,
  InvoiceDetailScreen,
  SelectPeriod,
  AddServiceCheckboxPage,
  SettlementScreen,
  BatchHistoryPage,
  BatchHistoryDetailPage,
  TransactionsPage,
  EditActualAmountPage,
  ReviewSettlementPage,
  CreditCardTransactionPage,
  StaffIncomeDetailPage,
  GiftCardSoldPage,
  ReportStaffSalary,
  ReportServiceDuration,
  ReportGiftCardSales,
  ReportCustomerSales,
  ReportServiceCategorySales,
  ReportServiceSales,
  ReportProductCategorySales,
  ReportProductSales,
  ReportOverallPaymentMethod,
  ReportOverallMarketingEfficiency,
  ServiceDurationStatistic,
  GiftCardStatistic,
  CustomerStatistic,
  ServiceCategoryStatistic,
  ServiceStatistic,
  ProductCategoryStatistic,
  ProductStatistic,
  PaymentStatistic,
  MarketingEfficiencyStatistic,
  FeedbackScreen,
  ChangePincodeScreen,
  NewPincodeScreen,
  TermOfService,
  Privacy,
  FaqPage,
  SetupTaxScreen,
  SettingAdvancedScreen,
  LanguageScreen
} from '@screens';
import { HPOBottomTabStack } from './HPOBottomTabStack';
import { useSelector } from "react-redux";

const { Screen, Navigator } = createStackNavigator();

const AppStack = () => {

  const { staff } = useSelector(state => state.auth);

  if (staff) {
    return (
      <Navigator
        headerMode="none"
        screenOptions={{
          headerShown: false,

          gestureEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        initialRouteName="HpOneHomeStack">
        <Screen name="HpOneHomeStack" component={HPOBottomTabStack} />
        <Screen {...AppointmentDetailScreen} />
        <Screen {...AppointmentNewScreen} />
        <Screen {...CustomerNewScreen} />
        <Screen {...CustomerNewRoleStaff} />
        <Screen {...CustomerDetailScreen} />
        <Screen {...CustomersScreen} />
        <Screen {...ServiceScreen} />
        <Screen {...CategoryNewScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
          }}
        />
        <Screen {...ServiceNewScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
          }}
        />
        <Screen {...EditProfileScreen} />
        <Screen {...SettingScreen} />
        <Screen {...HardwareScreen} />
        <Screen {...AddDeviceHardware} />
        <Screen {...PrinterList} />
        <Screen {...SetupHardware} />
        <Screen {...NotificationScreen} />
        <Screen {...NotificationRoleStaffScreen} />
        <Screen {...ReviewScreen} />
        <Screen {...MarketingScreen} />
        <Screen {...MarketingNewScreen} />
        <Screen {...ExtraScreen} />
        <Screen {...ExtraNewScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
          }}
        />
        <Screen {...ProductScreen} />
        <Screen {...ProductNewScreen} />
        <Screen {...StaffScreen} />
        <Screen {...StaffNewScreen} />
        <Screen {...BusinessInformationScreen} />
        <Screen {...ExtraSelectScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
          }}
        />
        <Screen {...CheckoutScreen} />
        <Screen {...AddTipPage} />
        <Screen {...ApplyDiscountPage} />
        <Screen {...PaymentPage} />
        <Screen {...EditAppointmentScreen} />
        <Screen {...EditPaidAppointmentScreen} />
        <Screen {...AddServicePage} />
        <Screen {...AddServiceDetailPage} />
        <Screen {...EditPaidServicePage} />
        <Screen {...AddProductDetailPage} />
        <Screen {...EnterAmountPage} />
        <Screen {...InvoiceScreen} />
        <Screen {...SelectPeriod} />
        <Screen {...InvoiceDetailScreen} />
        <Screen {...AddServiceCheckboxPage} />
        <Screen {...SettlementScreen} />
        <Screen {...BatchHistoryPage} />
        <Screen {...TransactionsPage} />
        <Screen {...BatchHistoryDetailPage} />
        <Screen {...EditActualAmountPage} />
        <Screen {...ReviewSettlementPage} />
        <Screen {...CreditCardTransactionPage} />
        <Screen {...StaffIncomeDetailPage} />
        <Screen {...GiftCardSoldPage} />
        <Screen {...ReportStaffSalary} />
        <Screen {...ReportServiceDuration} />
        <Screen {...ReportGiftCardSales} />
        <Screen {...ReportCustomerSales} />
        <Screen {...ReportServiceCategorySales} />
        <Screen {...ReportServiceSales} />
        <Screen {...ReportProductCategorySales} />
        <Screen {...ReportProductSales} />
        <Screen {...ReportOverallPaymentMethod} />
        <Screen {...ReportOverallMarketingEfficiency} />
        <Screen {...ServiceDurationStatistic} />
        <Screen {...GiftCardStatistic} />
        <Screen {...CustomerStatistic} />
        <Screen {...ServiceCategoryStatistic} />
        <Screen {...ServiceStatistic} />
        <Screen {...ProductCategoryStatistic} />
        <Screen {...ProductStatistic} />
        <Screen {...PaymentStatistic} />
        <Screen {...MarketingEfficiencyStatistic} />
        <Screen {...FeedbackScreen} />
        <Screen {...ChangePincodeScreen} />
        <Screen {...NewPincodeScreen} />
        <Screen {...TermOfService} />
        <Screen {...Privacy} />
        <Screen {...FaqPage} />
        <Screen {...SetupTaxScreen} />
        <Screen {...GiftCardAmountPage} />
        <Screen {...SettingAdvancedScreen} />
        <Screen {...LanguageScreen} />

        <Screen name="ForgotPincode" component={ForgotPincode} />
      </Navigator>
    );
  }
  return null;
};

export default AppStack;
