import NavigationService from '@navigation/NavigationService';
import { images } from "@shared/themes/resources";
import { translate } from "@localize";

export const items = [
  {
    title: translate("txtReviews"),
    icon: images.iconReview,
    onPress: () => {
      NavigationService.navigate(screenNames.ReviewScreen)
    }
  },
  {
    title: translate("txtHardware"),
    icon: images.iconHardware,
    onPress: () => { 
      NavigationService.navigate(screenNames.HardwareScreen)
    }
  },
  {
    title: translate("txtSettings"),
    icon: images.iconSetting,
    onPress: () => {
      NavigationService.navigate(screenNames.SettingScreen)
    }
  },
];

export const itemsRoleManagerAdmin = [
  {
    title: translate("txtBusinessInformations"),
    icon: images.iconBusiness,
    onPress: () => { 
      NavigationService.navigate(screenNames.BusinessInformationScreen)
    }
  },
  {
    title: translate("txtInvoices"),
    icon: images.iconInvoice,
    onPress: () => { 
      NavigationService.navigate(screenNames.InvoiceScreen)
    }
  },
  {
    title: translate("txtSettlement"),
    icon: images.iconSettlement,
    onPress: () => { 
      NavigationService.navigate(screenNames.SettlementScreen)
    }
  },
  {
    title: translate("txtMarketing"),
    icon: images.iconMarketing,
    onPress: () => {
      NavigationService.navigate(screenNames.MarketingScreen)
    }
  },
  {
    title: translate("txtCustomer"),
    icon: images.iconTabCustomer,
    onPress: () => {
      NavigationService.navigate(screenNames.CustomersScreen)
    }
  },
  {
    title: translate("txtExtras"),
    icon: images.iconExtra,
    onPress: () => {
      NavigationService.navigate(screenNames.ExtraScreen)
    }
  },
  {
    title: translate("txtInventory"),
    icon: images.iconInventory,
    onPress: () => {
      NavigationService.navigate(screenNames.ProductScreen)
    }
  },
  {
    title: translate("txtStaff"),
    icon: images.iconStaff,
    onPress: () => {
      NavigationService.navigate(screenNames.StaffScreen)
    }
  },
  {
    title: translate("txtServices"),
    icon: images.iconService,
    onPress: () => {
      NavigationService.navigate(screenNames.ServiceScreen)
    }
  },
  {
    title: translate("txtReviews"),
    icon: images.iconReview,
    onPress: () => {
      NavigationService.navigate(screenNames.ReviewScreen)
    }
  },
  {
    title: translate("txtTax"),
    icon: images.iconSettingTax,
    onPress: () => { 
      NavigationService.navigate(screenNames.SetupTaxScreen)
    }
  },
  {
    title: translate("txtHardware"),
    icon: images.iconHardware,
    onPress: () => { 
      NavigationService.navigate(screenNames.HardwareScreen)
    }
  },
  {
    title: translate("txtAdvancedSettings"),
    icon: images.advancedSetting,
    onPress: () => {
      NavigationService.navigate(screenNames.SettingAdvancedScreen)
    }
  },
  {
    title: translate("txtSettings"),
    icon: images.iconSetting,
    onPress: () => {
      NavigationService.navigate(screenNames.SettingScreen)
    }
  },
]