import React from 'react'
import { View, SectionList, Image, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { scaleHeight, scaleWidth, slop } from '@utils'
import { Header, ItemService, GroupModalButton, GroupButtonAdd } from './widget'
import { treedot } from '@assets'
import styles from './styles'
import { Modalize } from 'react-native-modalize'

const DATA = [
    {
        title: "Manicure",
        data: [
            {
                serviceName: 'Delux Spa Menicure',
                duration: 25,
                price: 28.00,
                serviceId: 1,

            },
            {
                serviceName: 'Delux Spa Menicure',
                duration: 25,
                price: 28.00,
                serviceId: 2,
            }
        ],
    },
    {
        title: "Pedicure",
        data: [
            {
                serviceName: 'Delux Spa Menicure',
                duration: 25,
                price: 28.00,
                serviceId: 3,

            },
            {
                serviceName: 'Delux Spa Menicure',
                duration: 25,
                price: 28.00,
                serviceId: 4,
            }
        ],
    },
];

const index = () => {

    const [valueSearch, setValueSearch] = React.useState("");

    const onChangeSearch = (searchText) => {
        setValueSearch(searchText);
    }

    const modalizeRef = React.useRef(null);

    const openModal = () => {
        modalizeRef.current?.open();
    };

    const closeModal = () => {
        modalizeRef.current?.close();
    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={{ padding: scaleWidth(5) }}>
                <SectionList
                    sections={DATA}
                    keyExtractor={(item, index) => item.serviceId.toString()}
                    stickySectionHeadersEnabled={false}
                    renderItem={({ item }) => <ItemService item={item} />}
                    renderSectionHeader={({ section }) => (
                        <View style={styles.rowSectionHeader}>
                            <Text
                                color='#404040'
                                fontSize={scaleWidth(5.2)}
                                fontFamily='bold'
                                style={{ marginVertical: scaleHeight(2) }}
                            >
                                {section.title}
                            </Text>

                            <TouchableOpacity onPress={openModal} hitSlop={slop}>
                                <Image source={treedot} style={styles.treedot} resizeMode='contain' />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>

            <GroupButtonAdd />


            <Modalize
                handleStyle={{
                    opacity: 0
                }}
                overlayStyle={{
                    backgroundColor: 'rgba(0,0,0,0.4)'
                }}
                modalStyle={{
                    backgroundColor: 'transparent'
                }}
                adjustToContentHeight onBackButtonPress={closeModal} ref={modalizeRef}>
                <GroupModalButton
                    closeModal={closeModal}
                />
            </Modalize>
        </View>
    )
}

export default index;
