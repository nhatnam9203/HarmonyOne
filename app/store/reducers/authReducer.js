const get_INITIAL_STATE = () => {
    return {
        staffInfo: '',
    };
};

function authReducer(state = get_INITIAL_STATE(), action) {
    switch (action.type) {
        case "SET_INFO_LOGIN":
            return {
                ...state,
                staffInfo: action.payload
            }

        default:
            return state;
    }
}
export default authReducer;
