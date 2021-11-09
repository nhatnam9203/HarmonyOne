import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { fonts, colors } from '@shared/themes';
import { removeAccent, guid } from "@shared/utils";
import { images } from "@shared/themes/resources";
import { IconButton } from "@shared/components";
import { useSelector } from 'react-redux';
import { useController } from "react-hook-form";
import Autocomplete from 'react-native-autocomplete-input';

export const InputState = ({
    defaultValue = "",
    form,
    name
}) => {
    const { customer: {
        stateCity = []
    } } = useSelector(state => state);

    const [data, setData] = React.useState([]);
    const [isFocus, setFocus] = React.useState(false);

    const { field } = useController({
        control: form.control,
        defaultValue,
        name,
    });


    const onChangeText = (text) => {
        field.onChange(text);
        if (text?.length === 0) {
            setData([]);
            return;
        }
        const temptState = stateCity.map(state => state.name);
        let temptData = [];
        for (let i = 0; i < temptState.length; i++) {
            if (removeAccent(temptState[i].toLowerCase()).startsWith(removeAccent(text).toLowerCase())) {
                temptData.push(temptState[i]);
            }
        }
        setData(temptData);
    }

    const selectSuggestion = (item) => {
        field.onChange(item);
        setData([]);
    }


    return (
        <View style={[
            styles.containerInput,
            { marginBottom: data?.length > 0 ? scaleHeight(data.length * 20 + 20) : 0 }
        ]}>
            {
                field.value?.length > 0 &&
                <IconButton
                    icon={images.iconClose}
                    iconStyle={[styles.iconClose]}
                    onPress={() => onChangeText("")}
                    style={styles.buttonClose}
                />
            }
            <Autocomplete
                data={data}
                value={field.value}
                onChangeText={onChangeText}
                flatListProps={{
                    keyExtractor: (_, idx) => idx,
                    renderItem: ({ item }) => (
                        <TouchableOpacity onPress={() => selectSuggestion(item)} style={styles.wrapItem}>
                            <Text style={styles.txtItem}>{item}</Text>
                        </TouchableOpacity>
                    )
                }}
                style={styles.wrapInput}
                placeholder={"State"}
                containerStyle={{
                    flex: 1,
                }}
                inputContainerStyle={{
                    padding: scaleWidth(10),
                    height: scaleWidth(42),
                    justifyContent: "center",
                    borderRadius: 3,
                    borderWidth: 1,
                    paddingRight: scaleWidth(45),
                    borderColor: isFocus ? colors.ocean_blue : "#cccccc"
                }}
                style={{ flex: 1, fontSize: scaleWidth(16), padding: 0, color: "#000" }}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                keyExtractor={(item, index) => `${item}_${index}`}
                listContainerStyle={{
                    borderWidth: 0
                }}
            />

        </View>
    );
}



const styles = StyleSheet.create({
    containerInput: {
        position: 'relative',
        marginBottom: scaleHeight(20)
    },

    wrapItem: {
        height: scaleWidth(35),
        backgroundColor: "white",
        zIndex: 9999,
        justifyContent: 'center',
        paddingLeft: scaleWidth(10)
    },
    txtItem: {
        fontSize: scaleWidth(16),
        color: "#000"
    },
    label: {
        fontSize: scaleFont(16),
        color: '#7A98BB',
        marginBottom: scaleHeight(10),
        fontFamily: fonts.REGULAR
    },
    wrapInput: {
        width: "100%",
        height: scaleWidth(42),
        borderWidth: 1,
        borderColor: '#cccccc',
        flexDirection: 'row',
        borderRadius: 3,
        paddingHorizontal: scaleWidth(10),
        alignItems: 'center',
        justifyContent: 'space-between'
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
        fontSize: scaleFont(17),
        fontFamily: fonts.REGULAR,
        color: colors.black
    },
    iconClose: {
        width: scaleWidth(24),
        height: scaleWidth(24),
    },
    buttonClose: {
        position: 'absolute',
        right: scaleWidth(10),
        top: scaleWidth(10),
        zIndex: 999
    }

});

