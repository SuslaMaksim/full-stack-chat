export default function App({isAuth, values, errors}) {
    const rules = {
        email: (value) => {
            if (!value) {
                errors.email = 'Введите E-mail';
                console.log(errors.email)
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
            ) {
                errors.email = 'Invalid email address';
            }
        },
        password: (value) => {
            if (!value) {
                errors.password = 'Введите пароль';
            } else if (
              !isAuth &&  !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(value)
            ) {
                errors.password = 'Слишком легкий пароль';
            }
        },
        password_2: (value) => {
            if (!isAuth && value !== values.password) {
                errors.password_2 = 'Пароли не совпадают';
            }else if(!isAuth && !value) {
                errors.password_2 = 'Введите пароль';
            }
        },
        fullname: (value) => {
            if (!value && !isAuth) {
                errors.fullname = 'Введите свое ими фамилию';
            }
        }
    }

    Object.keys(values).forEach( key=> rules[key] && rules[key](values[key]) )

}