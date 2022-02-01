const schedule = require('node-schedule')

module.exports = app => {
    setInterval( async date => {
        const usersCount = await app.db('users').count('id').first()

        const { Stat } = app.api.stat

        const lastStats = await Stat.findOne({}, {}, { sort: { 'createdAt': -1 } })

        const stat = new Stat ({
            users: usersCount.count,
            createdAt: new Date()
        })

        const chengeUsers = !lastStats || lastStats.users !== stat.users

        if (!chengeUsers) {
            stat.save()
                .then(() => console.log('\x1b[34m%s\x1b[37m', '[Stats]:\x1b[0m','Estatísticas atualizadas com sucesso!'))
        }
    }, 1000)
}