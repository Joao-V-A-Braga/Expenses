module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation
    
    const post = async (req, res) => {
        const month = { ...req.body }

        if (!month.userId) return res.status(400).send()

        try {
            existsOrError(month.name, "O mês não possui um nome.")
            existsOrError(month.userId, "O mês não possui um usuário.")
            existsOrError(month.year, "O mês não possui um ano.")
            existsOrError(month.month, "O mês não possui um month number.")
            existsOrError(month.monthIncome, "O mês não possui um saldo.")

            const ifExistsThisMonthInDb = await app.db('months')
                .where({ userId: month.userId, year: month.year, month: month.month })
            notExistsOrError(ifExistsThisMonthInDb, "Esse mês já existe nesse usuário")
        } catch (msg) {
            return res.status(400).send(msg)
        }

        app.db('months')
            .insert(month)
            .then(_ => res.status(204).send())
            .catch(e => res.status(500).send())
    }

    const get = async (req, res) => {
        const userId = req.params.id

        await app.db('months')
            .where({ userId })
            .then(data => res.json(data))
            .catch(e => res.status(501).send("Não existe meses correspondentes a esse usuário."))
    }

    const patch = (req, res) => {
        const month = { ...req.body }
        const id = req.params.id
        app.db('months')
            .update(month)
            .where({ id })
            .then(_ => res.status(204).send())
            .catch(e => res.status(400).send(e))

    }
    return { get, post, patch }
}