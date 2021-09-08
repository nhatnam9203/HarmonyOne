import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, TouchableOpacityComponent } from 'react-native'
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
                <View style={styles.wrapInput}>
                    <TextInput
                        onChangeText={(value) => this.setState({ value })}
                        placeholder={placeholder}
                        value={value}
                        style={[styles.input, { ...style }]}
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
        marginBottom: scaleHeight(10)
    },
    wrapInput: {
        width: '100%',
        padding: scaleWidth(10),
        borderWidth: 1,
        borderColor: '#dddddd',
        flexDirection: 'row',
        borderRadius: 5
    },
    input: {
        flex: 1,
        fontSize: scaleFont(16),
    },
    iconClose: {
        width: scaleWidth(20),
        height: scaleWidth(20),
    },
    required: {
        color: "red",
        marginLeft: scaleWidth(8),
        fontSize : scaleFont(18)
    }
});
