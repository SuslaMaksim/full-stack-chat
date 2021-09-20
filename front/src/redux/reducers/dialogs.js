

const initialState = {
    items: [],
    currentDialogId: null
}

export default (state = initialState, {type, payload} ) => {
    switch (type) {
        case 'DIALOGS:SET_ITEMS':
            return {
                ...state,
                items: [...payload]
            }

        case 'DIALOGS:SET_DIALOG':
            return {
                ...state,
                currentDialogId: payload
            }

        default:
            return state;

    }

}