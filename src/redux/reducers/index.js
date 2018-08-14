import { combineReducers } from 'redux'
import cardsReducer from './cards-reducer'
import userReducer from './user-reducer'

const allReducers = {
    data: cardsReducer,
    user: userReducer
}

const rootReducer = combineReducers(allReducers)

export default rootReducer