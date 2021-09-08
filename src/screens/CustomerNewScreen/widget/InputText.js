import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, TouchableOpacityComponent } from 'react-native'
import { fonts } from '@shared/themes';
import { icon_close_grey } from "@assets";


export default class Input extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
    }

    render() {
        const {
            placeholder = '',
            style,
            label = '',
            isRequired = false,
            multiline = false,
            inputStyle,
        } = this.props;

        const { value } = this.state;

        return (
            <View style={styles.containerInput}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.label}>
                        {label}
                    </Text>
                    {isRequired && <Text style={styles.required}>*</Text>}
                </View>
                <View style={[styles.wrapInput,style]}>
                    <TextInput
                        onChangeText={(value) => this.setState({ value })}
                        placeholder={placeholder}
                        value={value}
                        style={[styles.input, inputStyle]}
                        multiline={multiline}
                    />
                    {
                        value.length > 0 &&
                        <TouchableOpacity onPress={() => this.setState({ value: '' })}>
                            <Image
                                source={icon_close_grey}
                                style={styles.iconClose}
                            />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerInput: {
        marginBottom: scaleHeight(15)
    },
    label: {
        fontSize: scaleFont(16),
        color: '#7A98BB',
        marginBottom: scaleHeight(10),
        fontFamily: fonts.MEDIUM
    },
    wrapInput: {
        width: '100%',
        height: scaleWidth(42),
        borderWidth: 1,
        borderColor: '#dddddd',
        flexDirection: 'row',
        borderRadius: 5,
        paddingHorizontal: scaleWidth(10),
        alignItems: 'center'
    },
    input: {
        flex: 1,
        fontSize: scaleFont(16),
        fontFamily: fonts.MEDIUM
    },
    iconClose: {
        width: scaleWidth(20),
        height: scaleWidth(20),
    },
    required: {
        color: "red",
        marginLeft: scaleWidth(8),
        fontSize: scaleFont(18)
    }
});
