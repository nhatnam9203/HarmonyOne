
import NavigationService from '@navigation/NavigationService';

export const useProps = (_params) => {
  return {
    goToNotification: () => {
      NavigationService.navigate(screenNames.NotificationScreen)
    },
  };
};
