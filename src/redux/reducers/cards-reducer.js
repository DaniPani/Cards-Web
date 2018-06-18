import {
    CARDSLOADING,
    CARDSLOADED,
    CARDSADDED,
    CARDSSAVED
} from '../actions/card-actions'


export default function (state = false, action) {
    switch (action.type) {
        case CARDSLOADED:
                return Object.assign({}, action.payload.data)
        
        case CARDSLOADING:
                return {'isLoading': action.payload.isLoading}

        case CARDSADDED:
                return Object.assign({}, state, {cards:[...state.cards, action.payload.cards]})
        case CARDSSAVED:
                return Object.assign({}, state, {cards : [...action.payload.cards]})

        default:
            return Object.assign({}, state)
    }
}