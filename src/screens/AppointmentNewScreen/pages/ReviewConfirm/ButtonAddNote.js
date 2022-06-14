import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { colors, fonts, images } from "@shared/themes";
import { useDispatch, useSelector } from "react-redux";
import { bookAppointment } from "@redux/slices";
import { CustomActionSheet, IconButton } from "@shared/components";
import { SingleScreenLayout } from '@shared/layouts';
import { useTranslation } from "react-i18next";
import { translate } from "@localize";


export const ButtonAddNote = ({

}) => {
    const dispatch = useDispatch();

    const { bookAppointment: { notesBooking } } = useSelector(state => state);

    const actionSheetRef = React.useRef();
    const inputRef = React.useRef();

    const openActionSheet = () => {
        actionSheetRef?.current?.show();
        setValueNote(notesBooking);
        setTimeout(() => {
            inputRef?.current?.focus();
        }, 500);
    }

    const closeActionSheet = () => {
        actionSheetRef?.current?.hide();
    }

    const [valueNote, setValueNote] = React.useState("");

    const [t] = useTranslation();

    const accepNote = () => {
        dispatch(bookAppointment.updateNote(valueNote));
        closeActionSheet();
    }

    return (
        <>
            <IconButton
                icon={images.iconAddNote}
                iconStyle={styles.iconAddMore}
                style={styles.buttonAddMore}
                onPress={openActionSheet}
                renderText={() => <Text style={[styles.txtAddMore, { color: "#404040" }]}>{translate("txtAddNote")}</Text>}
            />

            <Text style={styles.notesBooking}>
                {notesBooking}
            </Text>

            <CustomActionSheet ref={actionSheetRef}>
                <View style={styles.container}>
                    <SingleScreenLayout
                        pageTitle={translate("txtAddNote")}
                        isRight={true}
                        isLeft={true}
                        onPressLeft={closeActionSheet}
                        isScrollLayout={false}
                        headerRightComponent={() =>
                            <IconButton
                                onPress={accepNote}
                                icon={images.iconChecked}
                                iconStyle={styles.iconClose}
                                style={styles.button}
                            />
                        }
                    >
                        <View style={styles.content}>
                            <TextInput
                                ref={inputRef}
                                multiline={true}
                                value={valueNote}
                                onChangeText={value => setValueNote(value)}
                                placeholder={translate("Something note about this appointment")}
                                style={styles.textInput}
                            />
                        </View>
                    </SingleScreenLayout>
                </View>
            </CustomActionSheet>
        </>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingHorizontal: scaleWidth(16),
    },
    textInput: {
        backgroundColor: "transparent",
        fontSize: scaleFont(17),
        fontFamily: fonts.REGULAR
    },
    iconClose: {
        width: scaleWidth(18),
        height: scaleWidth(18),
        tintColor: "#333"
    },
    button: {
        height: '100%',
        alignItems: 'center'
    },
    container: {
        width: scaleWidth(375),
        height: scaleHeight(835),
        backgroundColor: "white",
        paddingTop: scaleHeight(30)
    },
    txtAddMore: {
        fontSize: scaleFont(17),
        color: colors.ocean_blue,
        marginLeft: scaleWidth(16)
    },
    iconAddMore: {
        width: scaleWidth(20),
        height: scaleWidth(20),
    },
    buttonAddMore: {
        marginTop: scaleHeight(16)
    },
    notesBooking : {
        fontSize: scaleFont(15),
        fontFamily: fonts.REGULAR,
        color : "#585858",
        marginTop: scaleHeight(8)
    }
});


