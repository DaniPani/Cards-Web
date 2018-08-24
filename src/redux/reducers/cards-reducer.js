import {
    CARDSLOADED, CARDSCHOSED
} from '../actions/card-actions'


export default function (state = {isLoading: true, fileSelected: false}, action) {
    switch (action.type) {
        case CARDSLOADED:
            return {...action.payload.data, isLoading: false, fileSelected: true}

        case CARDSCHOSED:
                return Object.assign(state, {fileSelected: true})

        default:
            return Object.assign({}, state)
    }
}