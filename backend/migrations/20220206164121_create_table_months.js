
exports.up = function(knex, Promise) {
    return knex.schema.createTable('months',table =>{
        table.increments('id').primary()
        table.string('name').notNull()
        table.integer('userId').notNull()
        table.integer('year').notNull()
        table.integer('month').notNull()
        table.float('monthIncome').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('months')
};
