import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { Button } from "@shared/components";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { images } from "@shared/themes/resources";
import { ItemInformation } from "./ItemInformation";
import NavigationService from '@navigation/NavigationService'


export const Layout = ({
    form,
    errors,
    onSubmit,

    question1Ref,
    question2Ref,
    question3Ref,
    question4Ref,
    question5Ref,


}) => {

    const [t] = useTranslation();

    return (
        <View style={styles.container}>
            <SingleScreenLayout
                pageTitle={t('Business Information')}
                isRight={false}
                isScrollLayout={false}
                containerStyle={{ paddingVertical: 0 }}
            >
                <KeyboardAwareScrollView style={styles.content}>
                    <ItemInformation
                        form={form}
                        errors={errors}
                        label="Has Merchant been previously identified by Visa/Mastercard Risk Programs?"
                        textYes="Yes (if yes, who was the processor)"
                        name="question1"
                        ref={question1Ref}
                    />
                    <ItemInformation
                        form={form}
                        errors={errors}
                        label="Has Merchant or any associated principal and/or owners disclosed bellow filed bankruptcy or been subject to any involuntary bankruptcy?"
                        textYes="Yes (if yes, who was the processor)"
                        name="question2"
                        ref={question2Ref}
                    />
                    <ItemInformation
                        form={form}
                        errors={errors}
                        label="Will product(s) or service(s) be sold outside of US?"
                        textYes="Yes (if yes, date filed)"
                        name="question3"
                        ref={question3Ref}
                    />
                    <ItemInformation
                        form={form}
                        errors={errors}
                        label="Has a processor ever terminated your Merchant account?"
                        textYes="Yes (if yes, what was program and when)"
                        name="question4"
                        ref={question4Ref}
                    />

                    <ItemInformation
                        form={form}
                        errors={errors}
                        label="Have you ever accepted Credit/Edit cards before?"
                        textYes="Yes (if yes, who was your previous company)"
                        name="question5"
                        ref={question5Ref}
                    />

                    <View style={{ height: scaleHeight(100) }} />
                </KeyboardAwareScrollView>
                <View style={styles.bottom}>
                    <Button
                        label="Next"
                        onPress={form.handleSubmit(onSubmit)}
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
