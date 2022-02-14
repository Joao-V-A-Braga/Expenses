module.exports = app => {
    app.post("/signup", app.api.user.save)
    app.post("/signin", app.api.auth.signin)
    app.post("/validateToken", app.api.auth.validateToken)

    app.route("/users")
        .all(app.config.passport.authenticate)
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route("/users/:id")
        .all(app.config.passport.authenticate)
        .put(app.api.user.save)
        .get(app.api.user.getUserById)

    app.route("/stat")
        .get(app.api.stat.get)

    app.route('/expenses')
        .all(app.config.passport.authenticate)
        .post(app.api.expenses.save)
        
    app.route('/expenses/:id')
        .all(app.config.passport.authenticate)
        .post(app.api.expenses.get)
        .put(app.api.expenses.update)
        .delete(app.api.expenses.del)
        
    app.route('/months/:id')
        .all(app.config.passport.authenticate)
        .get(app.api.months.get)
        .patch(app.api.months.patch)
        
    app.route('/months')
        .all(app.config.passport.authenticate)
        .post(app.api.months.post)
}