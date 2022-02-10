const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)

        const hash = bcrypt.hashSync(password, salt)

        return hash
    }
    const save = async (req, res) => {
        const user = { ...req.body }
        if (req.params.id) user.id = req.params.id

        try {
            existsOrError(user.name, 'O nome não foi informado.')
            existsOrError(user.email, 'O email não foi informado.')
            existsOrError(user.password, 'A senha não foi informada.')
            existsOrError(user.confirmPassword, 'A confirmação da senha não foi informada.')
            equalsOrError(user.confirmPassword, user.password, 'Confirmação de senha inválida.')

            if (!user.id) {
                const userFromDB = await app.db('users')
                    .where({ email: user.email })
                notExistsOrError(userFromDB, 'Usuário já cadastrado.')
            }

        } catch (msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if (user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))

        }
    }

    const get = (req, res) => {
        app.db('users')
            .select('id','name','email','admin')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getUserById = (req, res) => {

        const id = req.params.id
        app.db('users')
            .select('id','name','email','admin')
            .where({id})
            .first()
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    return { save , get, getUserById}
}