import React from 'react';

export const useProps = (props) => {

    const inputFirstNameRef = React.useRef();
    const inputLastNameRef = React.useRef();
    const inputPhoneRef = React.useRef();
    const inputEmailRef = React.useRef();
    const inputAddressRef = React.useRef();
    const inputReferrerPhoneRef = React.useRef();
    const inputNoteRef = React.useRef();
    const inputCustomerGroupRef = React.useRef();
    const inputGenderRef = React.useRef();

    return {
        inputFirstNameRef,
        inputLastNameRef,
        inputPhoneRef,
        inputEmailRef,
        inputAddressRef,
        inputReferrerPhoneRef,
        inputNoteRef,
        inputCustomerGroupRef,
        inputGenderRef
    };
};