import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, fonts } from "@shared/themes";
import { Button } from "@shared/components";
import NavigationService from '@navigation/NavigationService';

export const ButtonCobfirm = () => {

    return (
        <View style={styles.bottom}>
            <Button
                onPress={() => { }}
                highlight={true}
                width={'100%'}
                label="Confirm"
            />
        </View>
    );
};


const styles = StyleSheet.create({
    bottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: scaleWidth(16),
        paddingBottom : scaleHeight(25),
        backgroundColor: colors.white,
    }
});

export default ButtonCobfirm;