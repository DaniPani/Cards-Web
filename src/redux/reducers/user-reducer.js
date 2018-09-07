import {
    USERSIGNEDIN
} from '../actions/user-actions'


export default function (state = {ISLOGGEDIN: false}, action) {
    switch (action.type) {
        case USERSIGNEDIN:
                return Object.assign({}, action.payload, {ISLOGGEDIN: true})

        default:
            return Object.assign({}, state)
    }
}