import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { images, colors, fonts } from "@shared/themes";
import { CustomInput } from "@shared/components";
import { slop } from "@shared/utils";
import { View } from 'react-native-animatable';
import { Title } from "../../Title";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { isEmpty } from "lodash";
import NavigationService from '@navigation/NavigationService';

export const Location = ({
    addressFull,
    latitude,
    longitude,
    merchantDetail,
    isReady
}) => {


    const [geometric, setGeometric] = React.useState({
        latitude: 10.75475,
        longitude: 106.647537,
    });

    return (
        <View style={styles.container}>
            <Title text="Location" onEdit={() => { NavigationService.navigate("LocationEdit") }} />
            <CustomInput
                label='Address'
                style={{ marginTop: scaleHeight(8) }}
                renderInput={() =>
                    <Text style={styles.txtItem}>{
                        `${merchantDetail?.address}, ${merchantDetail?.city}, ${merchantDetail?.state?.name}, ${merchantDetail?.zip}`
                    }</Text>
                }
            />
            {!isEmpty(latitude) && !isEmpty(longitude) && <MapView
                style={styles.map}
                initialRegion={{
                    latitude: (latitude && latitude !== "") ? parseFloat(latitude) : geometric.latitude,
                    longitude: (longitude && longitude !== "") ? parseFloat(longitude) : geometric.longitude,
                    latitudeDelta: 0.049,
                    longitudeDelta: 0.04,
                }}>

                {
                    latitude && longitude && <Marker
                        coordinate={{ latitude: 10.75475, longitude: 106.647537 }}
                    >
                        <Image
                            source={images["geo"]}
                            resizeMode="contain"
                            style={[styles.marker]}
                        />
                    </Marker>
                }

            </MapView>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    txtItem: {
        fontSize: scaleFont(17),
        fontFamily: fonts.MEDIUM
    },
    map: {
        width: scaleWidth(375 - 32),
        height: scaleWidth(375 - 200)
    },
    marker: {
        width: scaleWidth(35),
        height: scaleWidth(35),
    },
});
