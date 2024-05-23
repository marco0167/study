const express = require('express');
const app = express();
const personeRouter = require('./routes/persone')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/persone', personeRouter)

app.get('/', (req, res) => {
	res.sendFile('index.html', {root: __dirname })
})



app.listen(3000)

