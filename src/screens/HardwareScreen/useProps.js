
import NavigationService from '@navigation/NavigationService';

export const useProps = (_params) => {
  const onPressBox = async (type) => {
    if (type === 'PaymentTerminal') {
        // this.props.gotoListDevices(type);
    } else {
        // this.props.goToPrinterList();
    }

  }

  const deleteHardware = () => {
      // this.props.actions.dataLocal.deleteHardware();
  }
  return {
    onPressBox,
    deleteHardware,
  };
};
