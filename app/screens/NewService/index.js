import React from 'react'
import { View, ScrollView } from 'react-native'
import { Text } from '@components'
import { scaleHeight, scaleWidth } from '@utils'
import { Header, Input, InputDescription, InputDuration, ButtonUpload, InputSelect } from './widget'
import styles from './styles'

const index = () => {

    const [categoryName, setCategoryName] = React.useState("Manicure");
    const [status, setStatus] = React.useState("Active");
    const [serviceName, setServiceName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [minutes, setMinutes] = React.useState("");
    const [openTime, setOpenTime] = React.useState("");
    const [secondTime, setSecondTime] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [supplyFee, setSupplyFee] = React.useState("");

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView style={{ padding: scaleWidth(5), paddingTop: scaleHeight(1) }}>
                <Input
                    title='Service name'
                    value={serviceName}
                    onChange={setServiceName}
                    placeholder='Service name'
                />
                <InputSelect
                    title='Category'
                    value={categoryName}
                    onChange={setCategoryName}
                />
                <InputDescription
                    title='Service description'
                    value={description}
                    onChange={setDescription}
                    placeholder='Add a scription'
                />
                <InputDuration
                    value={categoryName}
                    minutes={minutes}
                    setMinutes={setMinutes}
                    openTime={openTime}
                    setOpenTime={setOpenTime}
                    secondTime={setSecondTime}
                    setSecondTime={setSecondTime}
                />
                <Input
                    title='Price'
                    value={price}
                    onChange={setPrice}
                    placeholder='0.00'
                    keyboardType='numeric'
                />
                <Input
                    title='Supply fee'
                    value={supplyFee}
                    onChange={setSupplyFee}
                    placeholder='0.00'
                    keyboardType='numeric'
                />
                <InputSelect
                    title='Status'
                    value={status}
                    onChange={setStatus}
                />
                <ButtonUpload />
                <View style={{ height: scaleHeight(30) }} />
            </ScrollView>
        </View>
    )
}

export default index;
