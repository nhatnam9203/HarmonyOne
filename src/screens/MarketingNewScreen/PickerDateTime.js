import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { IconButton, CustomInput, InputText, InputSelect, InputDate, ButtonUpload } from "@shared/components";
import { Switch } from "react-native-paper";

const PickerDateTime = ({

}) => {


    const startDateRef = React.useRef();
    const startTimeRef = React.useRef();
    const endDateRef = React.useRef();
    const endTimeRef = React.useRef();

    const [visibleEndDate, setVisibleEndDate] = React.useState(true);

    return (
        <>
            <CustomInput
                label='Start date'
                renderInput={() =>
                    <View style={{ flexDirection: "row" }}>
                        <InputDate
                            ref={startDateRef}
                            textStyle={styles.textDate}
                            style={{ width: scaleWidth(130) }}
                            iconStyle={styles.iconCalendar}
                        />
                        <InputDate
                            ref={startTimeRef}
                            mode="time" icon={images.dropdown}
                            textStyle={styles.textDate}
                            style={{ width: scaleWidth(130), marginLeft: scaleWidth(8) }}
                            iconStyle={styles.iconTime}
                        />
                    </View>
                }
            />

            <CustomInput
                label='End date'
                style={{ width: scaleWidth(375 - 32), alignItems: 'center', justifyContent: "space-between" }}
                renderRight={() => <SwitchButton isVisible={visibleEndDate} onChange={setVisibleEndDate} />}
                renderInput={() =>
                    visibleEndDate ?
                        <View style={{ flexDirection: "row" }}>
                            <InputDate
                                ref={startDateRef}
                                textStyle={styles.textDate}
                                style={{ width: scaleWidth(130) }}
                                iconStyle={styles.iconCalendar}
                            />
                            <InputDate
                                ref={startTimeRef}
                                mode="time" icon={images.dropdown}
                                textStyle={styles.textDate}
                                style={{ width: scaleWidth(130), marginLeft: scaleWidth(8) }}
                                iconStyle={styles.iconTime}
                            />
                        </View> : null
                }
            />
        </>
    );
};

export default PickerDateTime;


const SwitchButton = ({
    isVisible = false, onChange
}) => {
    return (
        <Switch
            value={isVisible}
            onValueChange={onChange}
            color={colors.ocean_blue}
        />
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },

    content: {
        flex: 1,
        padding: scaleWidth(16),
    },

    buttonTreedot: {
        height: '100%',
        width: scaleWidth(35),
        justifyContent: 'center',
        alignItems: 'center',
    },

    treedot: {
        tintColor: colors.black,
        width: scaleHeight(20),
        height: scaleHeight(20),
    },

    rowReverse: {
        justifyContent: 'space-between',
        flexDirection: 'row-reverse',
        marginBottom: scaleHeight(16)
    },

    txtItem: {
        fontSize: scaleFont(16),
        fontFamily: fonts.REGULAR,
        color: '#809DBD',
    },

    messageLimit: {
        fontSize: scaleFont(13),
        marginTop: -scaleHeight(12),
        fontFamily: fonts.LIGHT,
        marginBottom: scaleHeight(16)
    },

    textDate: {
        fontSize: scaleFont(15),
    },

    iconCalendar: {
        width: scaleWidth(20), height: scaleWidth(20)
    },

    iconTime: {
        width: scaleWidth(12), height: scaleWidth(12)
    }
});
