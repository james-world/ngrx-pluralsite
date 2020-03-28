export interface UserState {
    maskUserName: boolean;
}

const initialState: UserState = {
    maskUserName: false
};

export function reducer(state = initialState, action) {
    switch (action.type) {

        case 'MASK_USER_NAME':
            return {
                ...state,
                maskUserName: action.payload,
            };

        default:
            return state;
    }
}
