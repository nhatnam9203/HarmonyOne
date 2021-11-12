
import NavigationService from '@navigation/NavigationService';
import { useDispatch, useSelector } from "react-redux";
import { hardware, } from "@redux/slices";

export const useProps = (_params) => {

  /************************************* SELECTOR *************************************/
  const {
    hardware: { dejavooMachineInfo, 
              paymentMachineType,
              printerList,
              printerSelect, },
  } = useSelector(state => state);

  const onPressBox = async (type) => {
    if (type === 'PaymentTerminal') {
      NavigationService.navigate(screenNames.AddDeviceHardware);
    } else {
        // this.props.goToPrinterList();
    }

  }

  const deleteHardware = () => {
      dispatch(hardware.deleteHardware());
  }
  return {
    onPressBox,
    deleteHardware,
    dejavooMachineInfo,
    paymentMachineType, 
    printerSelect,
  };
};
