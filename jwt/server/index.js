const express = require('express');
const app = express();
const cors = require('cors');

// middleware
app.use(express.json());
app.use(cors());

app.listen(3000, () => {
	  console.log('Server is running on port 3000');
});
