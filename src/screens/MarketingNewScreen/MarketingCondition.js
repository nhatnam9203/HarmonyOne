import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { CustomInput, InputSelect } from "@shared/components";
import { InputService } from "./widget";
import { TextInputMask } from "react-native-masked-text";
import AntDesign from "react-native-vector-icons/AntDesign"
import Collapsible from "react-native-collapsible";

const conditionList = [
    { label: "No condition", value: "1" },
    { label: "Using specific services", value: "2" },
    { label: "Customer birthday is within the week", value: "3" },
    { label: "Time using the service reacthed the quality", value: "4" },
    { label: "The customer is the referral", value: "5" },
];

const MarketingCondition = React.forwardRef(({
    form,
    errors,
    defaultMessage
}, ref) => {

    const [condition, setCondition] = React.useState("No condition");
    const conditionRef = React.useRef();

    const [serviceSelected, setServiceSelected] = React.useState([]);
    const [numberOfTimesApply, setNumberOfTimesApply] = React.useState("");

    const removeService = (service) => {
        let tepmServices = serviceSelected.filter(s => s.serviceId !== service.serviceId);
        setServiceSelected(tepmServices);
        const message = defaultMessage(tepmServices);
        form.setValue("message", message);
    }

    React.useImperativeHandle(ref, () => ({
        getConditionValue: () => {
            const objCondition = conditionList.find(obj => obj.label == condition);
            return objCondition;
        },
        getServices : () =>{
            return serviceSelected;
        }
    }));

    const onChangeServiceSelected = (services) => {
        setServiceSelected(services);
        const message = defaultMessage(services);
        form.setValue("message", message);
    }

    return (
        <>
            <CustomInput
                label='Condition'
                renderInput={() =>
                    <InputSelect
                        ref={conditionRef}
                        form={form}
                        name="actionCondition"
                        title="Condition"
                        items={conditionList}
                        defaultValue={'1'}
                        onSelect={(item) => {
                            setCondition(item.label);
                        }}
                    />

                }
            />

            {
                <Collapsible collapsed={!(condition == "Using specific services")} duration={200}>
                    <InputService
                        apply={onChangeServiceSelected}
                        serviceSelected={serviceSelected}
                    />
                    <View style={styles.containerServices}>
                        {
                            serviceSelected.map((service) => (
                                <View
                                    style={styles.wrapService}
                                    key={"serviceSelected" + service.serviceId}
                                >
                                    <Text style={styles.service}>{service.name}</Text>
                                    <TouchableOpacity onPress={() => removeService(service)}>
                                        <AntDesign
                                            style={{ marginLeft: scaleWidth(16) }}
                                            name="closecircle"
                                            size={scaleWidth(15)}
                                            color='#7B99BA'
                                        />
                                    </TouchableOpacity>
                                </View>
                            ))

                        }
                    </View>
                </Collapsible>
            }

            {
                condition == "Time using the service reacthed the quality" &&
                <>
                    <Text style={styles.numberTimes}>Number of times applied</Text>
                    <View style={styles.containerInputNumber}>
                        <TextInputMask
                            type={'custom'}
                            options={{ mask: "9999999999999" }}
                            onChangeText={text => setNumberOfTimesApply(text)}
                            placeholder={"Number of times applied"}
                            value={numberOfTimesApply}
                            style={{ flex: 1, fontFamily: fonts.REGULAR, fontSize: scaleFont(15), padding: scaleWidth(8) }}
                        />
                    </View>
                </>
            }
        </>
    );
});

export default MarketingCondition;


const styles = StyleSheet.create({
    containerServices: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    service: {
        color: colors.ocean_blue,
        fontFamily: fonts.REGULAR,
        fontSize: scaleFont(16),
    },

    wrapService: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: scaleWidth(12),
        paddingVertical: scaleHeight(5),
        borderWidth: 1,
        borderColor: colors.ocean_blue,
        borderRadius: 300,
        marginRight: scaleWidth(8),
        marginBottom: scaleHeight(8),
    },

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
    },

    bottom: {
        padding: scaleWidth(16),
        width: scaleWidth(375),
    },

    containerInputNumber: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 3,
        height: scaleWidth(42),
        marginBottom: scaleHeight(16)
    },

    numberTimes: {
        fontSize: scaleFont(17),
        color: '#404040',
        marginBottom: scaleHeight(10),
        fontFamily: fonts.REGULAR
    }

});
