import bcrypt from 'bcrypt';

export default (password: string ) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt((err, salt) => {
            if (err) return reject(err);

            bcrypt.hash(password, 10, (err, hash) => {
                if (err) return reject (err);
                resolve(hash)
            })
        })

    })
}