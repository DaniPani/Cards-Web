import { combineReducers } from 'redux'
import cardsReducer from './cards-reducer'
import userReducer from './user-reducer'
import listReducer from './list-reducer'
import providerReducer from './provider-reducer'

const allReducers = {
    data: cardsReducer,
    user: userReducer,
    list: listReducer,
    provider: providerReducer
}

const rootReducer = combineReducers(allReducers)

export default rootReducer