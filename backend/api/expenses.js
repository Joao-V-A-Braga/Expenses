module.exports = app => {

    const { existsOrError } = app.api.validation

    const save = (req, res) => {

        const expense = { ...req.body }
        
        try {
            if (!expense.name && !expense.value && !expense.date) throw 'É necessário preencher os campos'
            if (!expense.userId) throw 'Despesa sem usuário'

            existsOrError(expense.name, 'Título não informado.')
            existsOrError(expense.value, 'Valor não informado.')
            existsOrError(expense.date, 'Data não informada.')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        app.db('expenses')
            .insert(expense)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).send(err))
    }

    const get = (req, res) => {
        const month = req.body.month
        const year = req.body.year
        if (month || month === 0) {
            app.db('expenses')
                .where({ userId: req.params.id, month, year})
                .then(data => res.json(data))
                .catch(_ => res.status(400).send('O usuário não possui despesas.'))
            } else {
            app.db('expenses')
                .where({ userId: req.params.id})
                .then(data => res.json(data))
                .catch(_ => res.status(400).send('O usuário não possui despesas.'))
        }
    }

    const update = (req, res) => {

        app.db('expenses')
            .update(req.body)
            .where({ id: req.params.id })
            .then(data => res.json(data))
            .catch(_ => res.status(400).send())
    }

    const del = (req, res) => {

        app.db('expenses')
            .delete()
            .where({ id: req.params.id })
            .then(data => res.json(data))
            .catch(_ => res.status(400).send())
    }

    return { save, get, update, del }
}