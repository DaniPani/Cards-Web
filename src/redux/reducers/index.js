import { combineReducers } from 'redux'
import cardsReducer from './cards-reducer'
import userReducer from './user-reducer'
import listReducer from './list-reducer'

const allReducers = {
    cards: cardsReducer,
    user: userReducer,
    list: listReducer
}

const rootReducer = combineReducers(allReducers)

export default rootReducer