import {
    CARDSLOADED,
    CARDSADDED,
    CARDSSAVED
} from '../actions/card-actions'


export default function (state = {isLoading: true}, action) {
    switch (action.type) {
        case CARDSLOADED:
                return Object.assign({}, action.payload.data, {isLoading: false})
        case CARDSADDED:
                return Object.assign({}, state, {cards:[...state.cards, action.payload.cards]})
        case CARDSSAVED:
                return Object.assign({}, state, {cards : [...action.payload.cards]})

        default:
            return Object.assign({}, state)
    }
}