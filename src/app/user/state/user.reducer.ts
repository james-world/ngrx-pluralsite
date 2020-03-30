import { UserActions, UserActionTypes } from './user.actions';
import { User } from '../user';

export interface UserState {
    maskUserName: boolean;
    currentUser: User | null;
}

const initialState: UserState = {
    maskUserName: false,
    currentUser: null
};

export function reducer(state = initialState, action: UserActions) {
    switch (action.type) {

        case UserActionTypes.MaskUserName:
            return {
                ...state,
                maskUserName: action.payload,
            };

        default:
            return state;
    }
}
