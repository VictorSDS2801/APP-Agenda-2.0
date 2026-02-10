const express = require('express')
const cors = require('cors')
const userRoutes = require('./infrastructure/http/routes/userRoutes')
const activityRoutes = require('./infrastructure/http/routes/activityRoutes')
const activityCompletionRoutes = require('./infrastructure/http/routes/activityCompletionRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/activities', activityRoutes)
app.use("/api/completions", activityCompletionRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'API está funcionando!' })
});

module.exports = app