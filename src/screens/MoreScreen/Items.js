import NavigationService from '@navigation/NavigationService';
import { images } from "@shared/themes/resources";

export const items = [
  {
    title: "Reviews",
    icon: images.iconReview,
    onPress: () => {
      NavigationService.navigate(screenNames.ReviewScreen)
    }
  },
  {
    title: "Hardware",
    icon: images.iconHardware,
    onPress: () => { 
      NavigationService.navigate(screenNames.HardwareScreen)
    }
  },
  {
    title: "Settings",
    icon: images.iconSetting,
    onPress: () => {
      NavigationService.navigate(screenNames.SettingScreen)
    }
  },
  {
    title: "Advanced Settings",
    icon: images.advancedSetting,
    onPress: () => {
      NavigationService.navigate(screenNames.SettingAdvancedScreen)
    }
  },
];

export const itemsRoleManagerAdmin = [
  {
    title: "Business Informations",
    icon: images.iconBusiness,
    onPress: () => { 
      NavigationService.navigate(screenNames.BusinessInformationScreen)
    }
  },
  {
    title: "Invoices",
    icon: images.iconInvoice,
    onPress: () => { 
      NavigationService.navigate(screenNames.InvoiceScreen)
    }
  },
  {
    title: "Settlement",
    icon: images.iconSettlement,
    onPress: () => { 
      NavigationService.navigate(screenNames.SettlementScreen)
    }
  },
  {
    title: "Marketing",
    icon: images.iconMarketing,
    onPress: () => {
      NavigationService.navigate(screenNames.MarketingScreen)
    }
  },
  {
    title: "Customer",
    icon: images.iconTabCustomer,
    onPress: () => {
      NavigationService.navigate(screenNames.CustomersScreen)
    }
  },
  {
    title: "Extras",
    icon: images.iconExtra,
    onPress: () => {
      NavigationService.navigate(screenNames.ExtraScreen)
    }
  },
  {
    title: "Inventory",
    icon: images.iconInventory,
    onPress: () => {
      NavigationService.navigate(screenNames.ProductScreen)
    }
  },
  {
    title: "Staff",
    icon: images.iconStaff,
    onPress: () => {
      NavigationService.navigate(screenNames.StaffScreen)
    }
  },
  {
    title: "Services",
    icon: images.iconService,
    onPress: () => {
      NavigationService.navigate(screenNames.ServiceScreen)
    }
  },
  {
    title: "Reviews",
    icon: images.iconReview,
    onPress: () => {
      NavigationService.navigate(screenNames.ReviewScreen)
    }
  },
  {
    title: "Tax",
    icon: images.iconSettingTax,
    onPress: () => { 
      NavigationService.navigate(screenNames.SetupTaxScreen)
    }
  },
  {
    title: "Hardware",
    icon: images.iconHardware,
    onPress: () => { 
      NavigationService.navigate(screenNames.HardwareScreen)
    }
  },
  {
    title: "Settings",
    icon: images.iconSetting,
    onPress: () => {
      NavigationService.navigate(screenNames.SettingScreen)
    }
  },
  {
    title: "Advanced Settings",
    icon: images.advancedSetting,
    onPress: () => {
      NavigationService.navigate(screenNames.SettingAdvancedScreen)
    }
  },
]