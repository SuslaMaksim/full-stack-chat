import {withFormik} from "formik";
import LoginForm from "../components/LoginForm";
import validateForm from '../../../utils/validate';

import {userActions} from '../../../redux/actions';
import store from '../../../redux/store'

export default withFormik({
    mapPropsToValues: ()=>({
        email: '',
        password: '',
    }),
    validate: values => {
        const errors = {};
        validateForm({isAuth: true, values, errors})
        return errors;
    },
    handleSubmit: (values, { setSubmitting, props}) => {
        store.dispatch(userActions.fetchUserLogin(values))
            .then((data) => {
                if(data.status === 'success'){
                    setTimeout(() => {
                        props.history.push('/')
                    },500)
                }
                setSubmitting(false);
            }).catch(() => {
                setSubmitting(false)
        })
    },
    displayName: 'LoginForm'

})(LoginForm)