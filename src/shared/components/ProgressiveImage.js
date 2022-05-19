import { scale } from '@utils';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import Spinner from 'react-native-spinkit';
import { PlaceholderMedia } from 'rn-placeholder';

const LoadingImage = ({ width, height, cirle = false }) => (
    <View style={[styles.container, { width: width, height: height }]}>
        <PlaceholderMedia
            style={[
                styles.imgPlaceholder,
                {
                    ...(cirle && { borderRadius: 3000 })
                }
            ]} />
    </View>
);

export const ProgressiveImage = React.memo(
    ({
        url,
        width,
        height,
        defaultSource,
        resizeMode = FastImage.resizeMode.contain,
        style,
        cirle = false
    }) => {
        const [download, setDownload] = React.useState(-1);
        const [loadFailed, setLoadFailed] = React.useState(false);

        // Callback functions
        const onLoadStart = () => setDownload(0);
        const onProgress = ({ nativeEvent: { loaded, total } }) => {
            setDownload(Math.round((loaded / total).toFixed(2) * 100));
        };
        const onLoadEnd = () => setDownload(-1);
        const onError = (arr) => {
            setLoadFailed(true);
            setDownload(-1);
        };

        let fullPath = React.useMemo(() => {

            return url;
        }, [url]);

        return fullPath || defaultSource ? (
            <Animatable.View
                style={[styles.container, { width: width, height: height }, style]}>
                <FastImage
                    style={{ width: width, height: height, ...(cirle && { borderRadius: 3000 }) }}
                    source={
                        url && !loadFailed
                            ? { uri: fullPath, priority: FastImage.priority.normal }
                            : defaultSource
                    }
                    resizeMode={resizeMode}
                    onLoadStart={onLoadStart}
                    onProgress={onProgress}
                    onLoadEnd={onLoadEnd}
                    onError={onError}
                />

                {typeof download === 'number' && download > 0 && (
                    <View style={styles.spinnerContent}>
                        <Spinner size={15} type="Circle" color="#2B2B2B" />
                        <Text style={styles.textDownload}>{download + '%'}</Text>
                    </View>
                )}
            </Animatable.View>
        ) : (
            <LoadingImage width={width} height={height} cirle={cirle} />
        );
    },
);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    spinnerContent: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },

    textDownload: {
        color: '#2B2B2B',
        fontSize: scaleFont(10),
        textAlign: 'center',
        width: '100%',
        marginTop: scaleHeight(5),
    },

    imgPlaceholder: {
        width: '80%',
        height: '80%',
        alignSelf: 'center',
    },
});
