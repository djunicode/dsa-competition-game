require('dotenv').config()
const express = require('express')
const passport = require('passport')
const cookieSession = require('cookie-session')
require('./Model/passport')
require('./config/db')
require('./config/githubAuth')

const oauthRoutes = require('./Routes/oauthRoutes')
const githubAuthRoutes = require('./Routes/githubAuthRoutes')
const userRoutes = require('./Routes/userRoutes')

const app = express()
app.use(cookieSession({ name: 'auth-session', keys: ['key1', 'key2'] }))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())

app.use(oauthRoutes)
app.use('/api/user', githubAuthRoutes)
app.use('/api/user', userRoutes)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server is up and running at port ${port}`)
})
