import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { CustomInput, InputSelect } from "@shared/components";
import { InputService, InputCategory } from "./widget";
import { useSelector } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign"
import Collapsible from "react-native-collapsible";
import { translate } from "@localize";

const actionList = [
    { label: ("Discount for whole cart"), value: "1" },
    { label: ("Discount for specific services"), value: "2" },
    { label: ("Discount by category"), value: "3" },
];

const MarketingAction = React.forwardRef(({
    form,
    errors,
    defaultMessage,
    calculatorsmsMoney,
    valueSlider,
}, ref) => {

    const {
        service: { services },
        category: { category },
        product : { products }
    } = useSelector(state => state);

    const [condition, setAction] = React.useState("Discount for whole cart");
    const conditionRef = React.useRef();

    const [serviceSelected, setServiceSelected] = React.useState([]);
    const [productSelected, setProductSelected] = React.useState([]);
    const [categorySelected, setCategorySelected] = React.useState([]);

    const removeService = (service) => {
        let tempServices = serviceSelected.filter(s => s.serviceId !== service.serviceId);
        setServiceSelected(tempServices);
        let tempList = [...tempServices, ...productSelected];
        const message = defaultMessage(null, tempList);
        form.setValue("message", message);
    }

    const removeProduct = (pro) => {
        let tempProducts = productSelected.filter(s => s.productId !== pro.productId);
        setProductSelected(tempProducts);
        let tempList = [...serviceSelected, ...tempProducts];
        const message = defaultMessage(null, tempList);
        form.setValue("message", message);
    }


    const removeCategory = (category) => {
        let tempCategory = categorySelected.filter(c => c.categoryId !== category.categoryId);
        setCategorySelected(tempCategory);
        const message = defaultMessage(null, tempCategory);
        form.setValue("message", message);
    }

    const onChangeServiceSelected = (services, products) => {
        setServiceSelected(services);
        setProductSelected(products);
        let tempList = [...services, ...products];
        const message = defaultMessage(null, tempList);
        form.setValue("message", message);
    }


    const onChangeCategorySelected = (categories) => {
        setCategorySelected(categories);
        const message = defaultMessage(null, categories);
        form.setValue("message", message);
    }

    React.useImperativeHandle(ref, () => ({
        getConditionValue: () => {
            const objCondition = actionList.find(obj => obj.label == condition);
            return objCondition;
        },
        getServices: () => {
            return serviceSelected;
        },
        getProducts: () => {
            return productSelected;
        },
        getCategories: () => {
            return categorySelected;
        },
        setAction: (dt) => {
            setAction(dt);
            const obj = actionList.find(item => item?.label == dt);
            if (obj) {
                form.setValue("actionCondition", obj);
            }
        },

        setServiceSelected: (arrServices = []) => {
            let temp = [];
            for (let i = 0; i < services.length; i++) {
                for (let j = 0; j < arrServices.length; j++) {
                    if (services[i].serviceId == arrServices[j]) {
                        const tempService = {
                            ...services[i],
                            selected: true,
                        }
                        temp.push(tempService);
                    }
                }
            }
            setServiceSelected(temp);
        },

        setProductSelected: (arrProducts = []) => {
            let temp = [];
            for (let i = 0; i < products.length; i++) {
                for (let j = 0; j < arrProducts.length; j++) {
                    if (products[i].productId == arrProducts[j]) {
                        const tempProduct = {
                            ...products[i],
                            selected: true,
                        }
                        temp.push(tempProduct);
                    }
                }
            }
            setProductSelected(temp);
        },

        setCategories: (arrCategories) => {
            let temp = [];
            for (let i = 0; i < category.length; i++) {
                for (let j = 0; j < arrCategories.length; j++) {
                    if (category[i].categoryId == arrCategories[j]) {
                        const tempCategory = {
                            ...category[i],
                            selected: true,
                        }
                        temp.push(tempCategory);
                    }
                }
            }
            setCategorySelected(temp);
        },

    }));


    React.useEffect(() => {
        calculatorsmsMoney(valueSlider);
    }, [condition, serviceSelected, categorySelected]);

    const resetValue = () => {
        setProductSelected([]);
        setCategorySelected([]);
        setServiceSelected([]);
    }


    return (
        <>
            <CustomInput
                label={translate('Action')}
                renderInput={() =>
                    <InputSelect
                        ref={conditionRef}
                        form={form}
                        name="actionCondition"
                        title={translate("Action")}
                        items={actionList}
                        isTranslate={true}
                        defaultValue={'1'}
                        onSelect={(item) => {
                            setAction(item.label);
                            resetValue();
                        }}
                    />

                }
            />

            {
                <Collapsible collapsed={!(condition == "Discount for specific services")} duration={200}>
                    <InputService
                        apply={(arrService, arrProduct) => onChangeServiceSelected(arrService, arrProduct)}
                        serviceSelected={serviceSelected}
                        productSelected={productSelected}
                    />
                    <View style={styles.containerServices}>
                        {
                            serviceSelected.map((service) => (
                                <View
                                    style={styles.wrapService}
                                    key={"serviceSelected" + service.serviceId}
                                >
                                    <Text style={styles.service}>{service?.name}</Text>
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
                        {
                            productSelected.map((pro) => (
                                <View
                                    style={styles.wrapService}
                                    key={"productSelected" + pro.productId}
                                >
                                    <Text style={styles.service}>{pro?.name}</Text>
                                    <TouchableOpacity onPress={() => removeProduct(pro)}>
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
                <Collapsible collapsed={!(condition == "Discount by category")} duration={200}>
                    <InputCategory
                        apply={onChangeCategorySelected}
                        categorySelected={categorySelected}
                    />
                    <View style={styles.containerServices}>
                        {
                            categorySelected.map((category) => (
                                <View
                                    style={styles.wrapService}
                                    key={"categorySelected" + category.categoryId}
                                >
                                    <Text style={styles.service}>
                                        {category?.name}
                                    </Text>
                                    <TouchableOpacity onPress={() => removeCategory(category)}>
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
        </>
    );
});


export default MarketingAction;


const styles = StyleSheet.create({
    containerServices: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    service: {
        color: colors.ocean_blue,
        fontFamily: fonts.REGULAR,
        fontSize: scaleFont(16),
        flexShrink: 1
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
        marginBottom: scaleHeight(8)
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
