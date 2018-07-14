import { combineReducers } from 'redux'
import cardsReducer from './cards-reducer'

const allReducers = {
    data: cardsReducer
}

const rootReducer = combineReducers(allReducers)

export default rootReducer