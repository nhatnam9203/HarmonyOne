import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { Button } from "@shared/components";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { images } from "@shared/themes/resources";
import { fonts } from "@shared/themes";
import { ItemPrincipal } from "./ItemPrincipal";


export const Layout = ({
    form,
    errors,
    onSubmit,
    onResponseImagePicker,
    imageUrl,
    fields,
    append,
    remove,
    checkErrors
}) => {

    const [t] = useTranslation();

    return (
        <View style={styles.container}>
            <SingleScreenLayout
                pageTitle={t('Principal Information')}
                isRight={false}
                isScrollLayout={false}
                containerStyle={{ paddingVertical: 0 }}
            >
                <KeyboardAwareScrollView style={styles.content}>
                    {
                        fields.map((field, index) => {
                            return (
                                <ItemPrincipal
                                    key={index + "principalinfor"}
                                    form={form}
                                    index={index}
                                    errors={errors}
                                    onResponseImagePicker={onResponseImagePicker}
                                    imageUrl={imageUrl}
                                    checkErrors={checkErrors}
                                />
                            )
                        })
                    }

                    <View style={{ height: scaleHeight(100) }} />
                </KeyboardAwareScrollView>
                
                <View style={styles.bottom}>
                    <Button
                        label="Next"
                        onPress={onSubmit}
                        highlight={true}
                        width={'100%'}
                    />
                </View>
            </SingleScreenLayout>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "white",
    },

    content: {
        flex: 1,
        padding: scaleWidth(16),
        paddingTop: scaleHeight(16),
    },
    bottom: {
        padding: scaleWidth(16),
        width: scaleWidth(375),
    },

});
