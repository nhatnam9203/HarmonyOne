import DeviceInfo from 'react-native-device-info';

export const getDeviceId = async () =>
  (await DeviceInfo.getUniqueId()) || 'simulator';

export const getDeviceName = async () =>
  (await DeviceInfo.getDeviceName()) || 'simulator';
