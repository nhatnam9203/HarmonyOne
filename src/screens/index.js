
import ForgotPincode from './ForgotPincode';
import ForgotPincodeSuccess from './ForgotPincodeSuccess';
import WhatIsMerchant from './WhatIsMerchant';

import { ScreenNames } from './ScreenName';
import { SplashScreen } from './SplashScreen';
import { LoginScreen } from './LoginScreen';
import { PinCodeScreen } from './PinCodeScreen';
import { AppointmentScreen } from './AppointmentScreen';
import { ReportsScreen } from './ReportsScreen';
import { CustomersScreen } from './CustomersScreen';
import { CustomerNewScreen } from './CustomerNewScreen';
import { CustomerNewRoleStaff } from './CustomerNewScreen/pages/CustomerNewRoleStaff';
import { CustomerDetailScreen } from './CustomerDetailScreen';
import { MoreScreen } from './MoreScreen';
import { AppointmentDetailScreen } from './AppointmentDetailScreen';
import { AppointmentNewScreen } from './AppointmentNewScreen';
import { ServiceScreen } from './ServiceScreen';
import { SettingAdvancedScreen } from './SettingAdvancedScreen';
import { ServiceNewScreen } from "./ServiceNewScreen";
import { CategoryNewScreen } from "./CategoryNewScreen";
import { EditProfileScreen } from "./EditProfileScreen";
import { SettingScreen } from "./SettingScreen";
import { NotificationScreen } from "./NotificationScreen";
import { NotificationRoleStaffScreen } from "./NotificationRoleStaffScreen";
import { ReviewScreen } from "./ReviewScreen";
import { MarketingScreen } from "./MarketingScreen";
import { MarketingNewScreen } from "./MarketingNewScreen";
import { CheckoutTabScreen } from "./CheckoutTabScreen";
import { CheckoutScreen } from "./CheckoutScreen";
import { ExtraScreen } from "./ExtraScreen";
import { ExtraNewScreen } from "./ExtraNewScreen";
import { ProductScreen } from "./ProductScreen";
import { ProductNewScreen } from "./ProductNewScreen";
import { StaffScreen } from "./StaffScreen";
import { StaffNewScreen } from "./StaffNewScreen";
import { BusinessInformationScreen } from "./BusinessInformationScreen";
import { ExtraSelectScreen } from "./ExtraScreen/pages/ExtraSelectScreen";
import { AddTipPage } from "./CheckoutScreen/pages";
import { ApplyDiscountPage } from "./CheckoutScreen/pages";
import { PaymentPage } from "./CheckoutScreen/pages/PaymentPage";
import { EditAppointmentScreen } from "./EditAppointmentScreen";
import { EditPaidAppointmentScreen } from "./EditPaidAppointmentScreen";
import { AddServicePage } from "./ServiceScreen/pages/AddServicePage";
import { AddServiceDetailPage } from "./ServiceScreen/pages/AddServiceDetailPage";
import { EditPaidServicePage } from "./ServiceScreen/pages/EditPaidServicePage";
import { GiftCardAmountPage } from "./ServiceScreen/pages/GiftCardAmountPage";
import { AddProductDetailPage } from "./ServiceScreen/pages/AddProductDetailPage";
import { EnterAmountPage } from "./CheckoutScreen/pages/EnterAmountPage";
import { InvoiceScreen } from "./InvoiceScreen";
import { InvoiceDetailScreen } from "./InvoiceDetailScreen";
import { SelectPeriod } from "../shared/components/SelectPeriod"
import { AddServiceCheckboxPage } from "./ServiceScreen/pages/AddServiceCheckboxPage";
import { SettlementScreen } from "./SettlementScreen";
import { BatchHistoryPage } from "./SettlementScreen/pages";
import { TransactionsPage } from "./SettlementScreen/pages";
import { BatchHistoryDetailPage } from "./SettlementScreen/pages";
import { EditActualAmountPage } from "./SettlementScreen/pages";
import { ReviewSettlementPage } from "./SettlementScreen/pages";
import { CreditCardTransactionPage } from "./SettlementScreen/pages";
import { StaffIncomeDetailPage } from "./SettlementScreen/pages";
import { GiftCardSoldPage } from "./SettlementScreen/pages";
import { FeedbackScreen } from "./FeedbackScreen";
import { ChangePincodeScreen } from "./ChangePincodeScreen";
import { NewPincodeScreen } from "./ChangePincodeScreen/pages/NewPincodeScreen";
import {
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
} from "./ReportsScreen/pages";
import { HardwareScreen } from "./HardwareScreen";
import { 
  AddDeviceHardware,
  PrinterList, 
  SetupHardware,
} from './HardwareScreen/pages';
import {
  ServiceDurationStatistic,
  GiftCardStatistic,
  CustomerStatistic,
  ServiceCategoryStatistic,
  ServiceStatistic,
  ProductCategoryStatistic,
  ProductStatistic,
  PaymentStatistic,
  MarketingEfficiencyStatistic,
} from "./ReportsScreen/subPages";
import { TermOfService, Privacy, FaqPage } from "./SettingScreen/pages";
import { SetupTaxScreen } from "./SetupTaxScreen";
import { SignupScreen } from "./SignupScreen";
import { LanguageScreen } from "./LanguageScreen";


module.exports = {
  ForgotPincode,
  ForgotPincodeSuccess,
  WhatIsMerchant,
  ScreenNames,
  SplashScreen,
  LoginScreen,
  PinCodeScreen,
  AppointmentScreen,
  ReportsScreen,
  CustomersScreen,
  CustomerNewScreen,
  CustomerNewRoleStaff,
  CustomerDetailScreen,
  MoreScreen,
  AppointmentDetailScreen,
  AppointmentNewScreen,
  ServiceScreen,
  ServiceNewScreen,
  CategoryNewScreen,
  EditProfileScreen,
  SettingScreen,
  NotificationScreen,
  ReviewScreen,
  MarketingScreen,
  MarketingNewScreen,
  CheckoutTabScreen,
  CheckoutScreen,
  ExtraScreen,
  ExtraNewScreen,
  ProductScreen,
  ProductNewScreen,
  StaffScreen,
  StaffNewScreen,
  BusinessInformationScreen,
  ExtraSelectScreen,
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
  HardwareScreen,
  AddDeviceHardware,
  PrinterList,
  SetupHardware,
  TermOfService,
  Privacy,
  FaqPage,
  NotificationRoleStaffScreen,
  SetupTaxScreen,
  SignupScreen,
  SettingAdvancedScreen,
  LanguageScreen
};
