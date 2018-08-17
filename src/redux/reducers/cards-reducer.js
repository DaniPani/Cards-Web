import {
    CARDSLOADED,
    CARDSADDED,
    CARDSSAVED,
    CARDSREMOVED
} from '../actions/card-actions'


export default function (state = {isLoading: true}, action) {
    switch (action.type) {
        case CARDSLOADED:
                return Object.assign({}, action.payload.data, {isLoading: false})

        default:
            return Object.assign({}, state)
    }
}