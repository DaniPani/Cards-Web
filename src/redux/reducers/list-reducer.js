import {
    LISTLOADED
} from '../actions/list-action'


export default function (state = {ISLOADING: true}, action) {
    switch (action.type) {
        case LISTLOADED:
                return Object.assign({}, {files: action.payload.list}, {ISLOADING: false})
        default:
            return Object.assign({}, state)
    }
}