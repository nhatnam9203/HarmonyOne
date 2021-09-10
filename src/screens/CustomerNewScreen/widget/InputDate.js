import React from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'
import { fonts, colors } from '@shared/themes';
import { slop } from "@shared/utils";
import { images } from "@shared/themes/resources";
import { IconButton } from "@shared/components";

const InputDate = React.forwardRef(({
    style,
}, ref) => {
    
    const actionSheetRef = React.useRef();
    
    return (
        <View style={[styles.containerInput]}>
            <TouchableOpacity style={[styles.wrapInput, style]}>
                <Text style={styles.txtDate}>20/9/1992</Text>
                <Image
                    source={images.iconCalendar}
                    style={styles.icon}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    )
});



const styles = StyleSheet.create({
    containerInput: {
    },
    label: {
        fontSize: scaleFont(16),
        color: '#7A98BB',
        marginBottom: scaleHeight(10),
        fontFamily: fonts.REGULAR
    },
    wrapInput: {
        width: '50%',
        height: scaleWidth(42),
        borderWidth: 1,
        borderColor: '#cccccc',
        flexDirection: 'row',
        borderRadius: 5,
        paddingHorizontal: scaleWidth(10),
        alignItems : 'center',
        justifyContent : 'space-between'
    },
    input: {
        flex: 1,
        fontSize: scaleFont(16),
        fontFamily: fonts.REGULAR,
        color: colors.greyish_brown_40
    },
    icon: {
        width: scaleWidth(24),
        height: scaleWidth(24),
    },
    txtDate: {
        fontSize: scaleFont(16),
        fontFamily: fonts.REGULAR,
        color: colors.greyish_brown_40
    }
});

export default InputDate;