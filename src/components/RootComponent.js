import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Platform,
    AppState,
    Keyboard,
} from "react-native";
import { scaleWidth, scaleHeight } from "@utils";
import { useSelector, useDispatch } from "react-redux";
import ModalError from "./ModalError";
import LoadingRoot from './LoadingRoot';
import actions from "@actions";

let RootComponent = (props) => {
    return (
        <View style={styles.container}>
            {props.children}
            <ModalError />
            <LoadingRoot />
        </View>
    );
};

export default RootComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
