import { PROVIDERCHOSED } from "../actions/provider-actions";

export default function (state = "", action) {
    switch (action.type) {
        case PROVIDERCHOSED:
                return {providerName: action.payload.providerName}

        default:
            return Object.assign({}, state)
    }
}