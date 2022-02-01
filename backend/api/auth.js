const {authSecret} = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app =>{
    const signin = async (req,res) =>{

        try{
            if(!req.body.email || !req.body.password) res.status(400).send()

            const userData = await app.db('users')
                .where({email: req.body.email})
                .first()
            
            if(!userData) res.status(400).send('Usuário não encontrado.')
    
            const validator = bcrypt.compareSync(req.body.password , userData.password)
    
            if(!validator) res.status(401).send('Email/Senha inválidos.')
            
            const now = Date.now() / 1000
    
            const payload = {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                admin: userData.admin,
                iat: now,
                exp: now + (60 * 60 * 24)
            }
            res.json({
                ...payload,
                token: jwt.encode(payload, authSecret)
            })
        }catch(e){
            return 
        }

    }

    const validateToken = (req, res) =>{
        const userData = req.body || null

        try {
            if(userData) {
                const token = jwt.decode(userData.token, authSecret)
                
                if(new Date(token.exp * 1000) > new Date()) return res.status(201).send(true)
            }
        } catch (e) {

        }
        res.send(false)
        
    }
    
    return { signin , validateToken }
}