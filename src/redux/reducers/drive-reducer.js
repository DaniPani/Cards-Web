import {
    DRIVELISTLOADED
} from '../actions/drive-action'


export default function (state = {isLoading: true}, action) {
    switch (action.type) {
        case DRIVELISTLOADED:
                return Object.assign([], action.payload.list)
        default:
            return Object.assign({}, state)
    }
}