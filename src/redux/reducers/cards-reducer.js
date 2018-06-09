import {
    CARDSLOADED,
    CARDSADDED,
    CARDSSAVED
} from '../actions/card-actions'


export default function (state = {}, action) {
    switch (action.type) {
        case CARDSLOADED:
                return action.payload.data

        case CARDSADDED:
            {
                state.cards.push(...action.payload.cards)
                return state
            } 
        case CARDSSAVED:
                console.log()
                return Object.assign({}, state, {cards : [...action.payload.cards]})

        default:
            return Object.assign({}, state)
    }
}