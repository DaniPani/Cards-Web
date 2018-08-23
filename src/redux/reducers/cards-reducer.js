import {
    CARDSLOADED, CARDSCHOSED
} from '../actions/card-actions'


export default function (state = {isLoading: true}, action) {
    switch (action.type) {
        case CARDSLOADED:
            return {...state, ...action.payload.data, isLoading: false}

        case CARDSCHOSED:
                return Object.assign(state, {fileSelected: true})

        default:
            return Object.assign({}, state)
    }
}