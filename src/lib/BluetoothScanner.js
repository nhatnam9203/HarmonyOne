import { Component } from 'react';
import {
    NativeEventEmitter,
    NativeModules,
    Platform,
    PermissionsAndroid,
} from 'react-native';
import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default class BluetoothScanner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scanning: false,
            peripherals: new Map(),
        }

        this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
        this.handleStopScan = this.handleStopScan.bind(this);
    }

    componentDidMount() {
        BleManager.start({ showAlert: false });
        this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral);
        this.handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan);

        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                } else {
                    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                        if (result) {
                            // console.log("User accept");
                        } else {
                            // console.log("User refuse");
                        }
                    });
                }
            });
        }

    }

    async handleStopScan() {
        const list = Array.from(this.state.peripherals.values());
        await this.setState({ scanning: false });
        this.props.handleStopScan(list);
    }

    startScan = () => {
        if (!this.state.scanning) {
            BleManager.scan([], 10, false).then((results) => {
                this.setState({ scanning: true });
            });
        }
    }

    stopScan = () => {
        BleManager.stopScan().then(() => {
        });
    }


    async handleDiscoverPeripheral(peripheral) {
        var peripherals = this.state.peripherals;
        const nameBluetooth = peripheral?.name && peripheral?.name != undefined ? `${peripheral?.name}` : "";
        if (nameBluetooth && nameBluetooth.includes("80")) {
            peripherals.set(peripheral.id, peripheral);
            await this.setState({ peripherals });
            this.stopScan();
        }
    }


    render() {
        return null;
    }

    componentWillUnmount() {
        this.handlerDiscover?.remove();
        this.handlerStop?.remove();
    }

}

