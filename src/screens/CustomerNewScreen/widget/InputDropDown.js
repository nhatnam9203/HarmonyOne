import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, TouchableOpacityComponent } from 'react-native'
import { fonts } from '@shared/themes';
import { DropdownMenu } from "@shared/components";
import { icon_close_grey } from "@assets";
import { images } from "@shared/themes/resources";

export default class InputDropDown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
        this.dropdownRef = React.createRef();
    }

    render() {
        const {
            placeholder = '',
            style,
            label = '',
            isRequired = false,
            items = [],
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
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <DropdownMenu
                        ref={this.dropdownRef}
                        items={items}
                        onChangeValue={() => { }}
                        defaultIndex={0}
                        width={scaleWidth(95)}
                        height={scaleWidth(42)}
                        styleDropDown={{
                            backgroundColor: "#fafafa",
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            borderRightWidth: 0,
                        }}
                    />
                    <View style={styles.wrapInput}>
                        <TextInput
                            onChangeText={(value) => this.setState({ value })}
                            placeholder={placeholder}
                            value={value}
                            style={[styles.input, { ...style }]}
                        />
                        {
                            value.length > 0 &&
                            <TouchableOpacity
                                hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
                                onPress={() => this.setState({ value: '' })}
                            >
                                <Image
                                    source={images.iconClose}
                                    style={styles.iconClose}
                                />
                            </TouchableOpacity>
                        }
                    </View>
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
        width: '70%',
        height: scaleWidth(42),
        borderWidth: 1,
        borderColor: '#dddddd',
        flexDirection: 'row',
        borderRadius: 5,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
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
        tintColor: "grey"
    },
    required: {
        color: "red",
        marginLeft: scaleWidth(8),
        fontSize: scaleFont(18)
    }
});
