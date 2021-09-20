import {withFormik} from "formik";
import RegistrationForm from "../components/RegistrationForm";
import validateForm from "../../../utils/validate";

import {userActions} from '../../../redux/actions';
import store from '../../../redux/store'

export default withFormik({
    mapPropsToValues: ()=>({
        email: '',
        password: '',
        fullname: '',
        password_2: ''

    }),
   validate: values => {
    const errors = {};
    validateForm({isAuth: false, values, errors})
    return errors;
},
    handleSubmit: (values, { setSubmitting,props }) => {
        store.dispatch(userActions.fetchUserRegistration(values))
            .then(data => {
                if(data.status === 'success'){
                    setTimeout(() => {
                        props.history.push('/')
                    },100)
                }
                setSubmitting(false);
            }).catch(() => {
            setSubmitting(false);
        })



},
    displayName: 'RegistrationForm'

})(RegistrationForm)