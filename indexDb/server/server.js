const express = require('express')
const app = express()
const path = require('path')

const PORT = 3001

app.use(express.static('../public'));


app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client'))
})

app.listen(PORT, () => {
	console.log("Server running on port: " + PORT)
})
