import {
    USERSIGNEDIN,
    INITIALIZEDGOOGLEAUTH
} from '../actions/user-actions'


export default function (state = {
    ISLOGGEDIN: false,
    ISINITIALIZED: false
}, action) {
    switch (action.type) {
        case USERSIGNEDIN:
            return {
                ...state,
                ...action.payload,
                ISLOGGEDIN: true
            }

        case INITIALIZEDGOOGLEAUTH:
            return { ...state,
                ISINITIALIZED: true,
                ISLOGGEDIN: action.payload
            }

        default:
            return Object.assign({}, state)
    }
}