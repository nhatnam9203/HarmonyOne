import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';

export class GiftCardScanner extends Component {
    constructor(props) {
        super(props);
        this.camera = null;
        this.barcodeCodes = [];

        this.state = {
            camera: {
                type: RNCamera.Constants.Type.back,
                flashMode: RNCamera.Constants.FlashMode.auto
            }
        };
    }

    onBarCodeRead(scanResult) {
        if (scanResult.data != null) {
            this.props.onReadBarcode(scanResult.data)
        }
        return;
    }

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={(ref) => {
                        this.camera = ref;
                    }}
                    defaultTouchToFocus
                    flashMode={this.state.camera.flashMode}
                    mirrorImage={false}
                    onBarCodeRead={(scanResult) => this.onBarCodeRead(scanResult)}
                    onFocusChanged={() => { }}
                    onZoomChanged={() => { }}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                    style={styles.preview}
                    type={this.state.camera.type}
                />
                <BarcodeMask
                    width={scaleWidth(310)}
                    height={scaleWidth(310)}
                    edgeColor={'white'}
                    showAnimatedLine={true}
                    transparency={0.8}
                />
            </View>
        );
    }
}

const styles = {
    container: {
        width: scaleWidth(330),
        height: scaleWidth(330),
        backgroundColor: "white",
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    overlay: {
        position: 'absolute',
        padding: 16,
        right: 0,
        left: 0,
        alignItems: 'center'
    },
    topOverlay: {
        top: scaleHeight(12),
        left: scaleWidth(12),
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bottomOverlay: {
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    enterBarcodeManualButton: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 40
    },
    scanScreenMessage: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    }
};
