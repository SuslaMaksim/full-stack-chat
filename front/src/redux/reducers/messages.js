

const initialState = {
    messages: null,
    isLoading: false
}

export default  (state = initialState, {type, payload} ) => {
    switch (type) {
        case 'MESSAGES:ADD_MESSAGE':
            return {
                ...state,
                messages: [...state.messages,payload],
            }

        case 'MESSAGES:SET_ITEMS':
            return {
                ...state,
                messages: [...payload],
                isLoading: false
            }

        case 'MESSAGES:SET_LOADING':
            return {
                ...state,
                isLoading: payload
            }
        case 'MESSAGES:DELETE_MESSAGE':
            return {
                ...state,
                messages: state.messages.filter( message => message._id !== payload)
            }

        default:
            return state;

    }

}