import { dialogsApi } from '../../utils/API';

 const dialogActions = {

     setDialogs:  items  => ({type: 'DIALOGS:SET_ITEMS', payload: items}),
     setCurrentDialogId: id => ({type: 'DIALOGS:SET_DIALOG',payload: id}),
     fetchDialogs: () => async ( dispatch ) => {

       let items = await dialogsApi.getAll();
        dispatch(dialogActions.setDialogs(items))

     },

}

export default dialogActions;




