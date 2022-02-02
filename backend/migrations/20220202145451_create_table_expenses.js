
exports.up = function(knex, Promise) {
    return knex.schema.createTable('expenses',table =>{
        table.increments('id').primary()
        table.integer('userId').notNull()
        table.string('name').notNull()
        table.float('value').notNull()
        table.date('date').notNull()
        table.boolean('paid').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('expenses')
};
