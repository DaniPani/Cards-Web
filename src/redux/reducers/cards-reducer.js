import {
    CARDSLOADED, CARDSCHOSED, CARDSRESET
} from '../actions/card-actions'


export default function (state = {ISLOADING: true, sets: {}}, action) {
    switch (action.type) {
        case CARDSLOADED:
            return {...state, sets: {...state.sets, ...action.payload}, ISLOADING: false}

        case CARDSCHOSED:
                return {...state, idSelected: action.payload}

        case CARDSRESET:
                return {...state, idSelected: ''}

        default:
            return Object.assign({}, state)
    }
}