import {
    CARDSLOADED, CARDSCHOSED
} from '../actions/card-actions'


export default function (state = {ISLOADING: true, FILESELECTED: false}, action) {
    switch (action.type) {
        case CARDSLOADED:
            return {...action.payload, ISLOADING: false, FILESELECTED: true}

        case CARDSCHOSED:
                return {...state, FILESELECTED: true}

        default:
            return Object.assign({}, state)
    }
}