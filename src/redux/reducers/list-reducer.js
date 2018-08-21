import {
    LISTLOADED
} from '../actions/list-action'


export default function (state = {isLoading: true}, action) {
    switch (action.type) {
        case LISTLOADED:
                return Object.assign({}, {files: action.payload.list})
        default:
            return Object.assign({}, state)
    }
}