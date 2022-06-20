import React from 'react';
import {
    Button,
    CustomInput,
    DropdownMenu,
    InputText,
    InputSelect
} from '@shared/components';
import { SingleScreenLayout } from '@shared/layouts';
import { headerPhoneGroup } from '@shared/utils';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { translate } from "@localize";

export const Layout = ({
    merchantDetail,
    onSubmit,
    form,
    errors,
    stateRef,
    getState,
}) => {
    const [t] = useTranslation();

    return (
        <View style={styles.container}>
            <SingleScreenLayout
                pageTitle={translate('Location')}
                isLeft={true}
                isRight={false}
                isScrollLayout={false}
                containerStyle={{ paddingVertical: 0, paddingTop: scaleHeight(8) }}>
                <KeyboardAwareScrollView style={styles.content}>
                    <CustomInput
                        label={translate("Address")}
                        isRequired
                        error={errors?.address}
                        renderInput={() => <InputText form={form} name="address" error={errors?.address} />}
                    />

                    <CustomInput
                        label={translate("City")}
                        isRequired
                        error={errors?.city}
                        renderInput={() => <InputText form={form} name="city" error={errors?.city} />}
                    />

                    <CustomInput
                        label={translate('State')}
                        renderInput={() =>
                            <InputSelect
                                ref={stateRef}
                                form={form}
                                name="stateId"
                                title="State"
                                items={getState()}
                                defaultValue={'0'}
                            />
                        }
                    />

                    <CustomInput
                        label={translate("Zip code")}
                        isRequired
                        error={errors?.zip}
                        renderInput={() => <InputText form={form} name="zip" error={errors?.zip} />}
                    />
                    <CustomInput
                        label={translate("Latitude")}
                        isRequired
                        error={errors?.latitude}
                        renderInput={() => <InputText form={form} name="latitude" keyboardType={'numeric'} error={errors?.latitude} />}
                    />
                    <CustomInput
                        label={translate("Longitude")}
                        isRequired
                        error={errors?.longitude}
                        renderInput={() => <InputText form={form} name="longitude" keyboardType={'numeric'} error={errors?.longitude} />}
                    />
                    <View style={{ height: scaleHeight(100) }} />
                </KeyboardAwareScrollView>
                <View style={styles.bottom}>
                    <Button
                        onPress={form.handleSubmit(onSubmit)}
                        height={scaleHeight(48)}
                        width="100%"
                        label={translate('txtSave')}
                        highlight={true}
                        disabled={errors?.categoryName}
                    />
                </View>
            </SingleScreenLayout>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    content: {
        flex: 1,
        padding: scaleWidth(16),
    },

    bottom: {
        paddingHorizontal: scaleWidth(16),
        paddingBottom: scaleHeight(32),
    },

    inputPhone: {
        width: scaleWidth(250),
        height: scaleWidth(42),
        borderWidth: 1,
        borderColor: '#dddddd',
        flexDirection: 'row',
        borderRadius: 5,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        paddingHorizontal: scaleWidth(10),
        alignItems: 'center',
    },

    styleDropDown: {
        backgroundColor: '#fafafa',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRightWidth: 0,
    },

    row: {
        flexDirection: 'row',
    },
});
