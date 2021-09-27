import NavigationService from '@navigation/NavigationService';
import { images } from "@shared/themes/resources";
export const items = [
    {
      title: "Business Informations",
      icon: images.iconBusiness,
      onPress: () => { }
    },
    {
      title: "Invoices",
      icon: images.iconInvoice,
      onPress: () => { }
    },
    {
      title: "Marketing",
      icon: images.iconMarketing,
      onPress: () => { }
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
      onPress: () => { }
    },
    {
      title: "Hardware",
      icon: images.iconHardware,
      onPress: () => { }
    },
    {
      title: "Settings",
      icon: images.iconSetting,
      onPress: () => { 
        NavigationService.navigate(screenNames.SettingScreen)
      }
    },
  ]