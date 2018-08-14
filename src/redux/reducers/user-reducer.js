import {
    USERSIGNEDIN
} from '../actions/user-actions'


export default function (state = {auth2 : false}, action) {
    switch (action.type) {
        case USERSIGNEDIN:
                return Object.assign({}, {auth2:action.payload.auth})

        default:
            return Object.assign({}, state)
    }
}