const express = require('express');
const app = express();
const { pool } = require('./dbConfig')
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')
const passport = require('passport');

const PORT = process.env.PORT || 4000;

const initializePassport = require('./passportConfig');

initializePassport(passport)


app.use(express.urlencoded({extended: false}));
app.set("view engine", "ejs");


app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

function checkAuthentication(req, res, next) {
	if (req.isAuthenticated())
		return res.redirect('/users/dashboard')
	next()
}

function checkNotAuthentication(req, res, next) {
	if (req.isAuthenticated()){
		return next()
	}
	res.redirect('/users/login')
}

app.get('/', (req, res) => {
	res.render('index');
})

app.get('/users/register', checkAuthentication, (req, res) => {
	res.render('register');
})

app.get('/users/login', checkAuthentication, (req, res) => {
	res.render('login');
})

app.get('/users/logout', (req, res) => {
	req.logOut(function(err) {
        if (err) { return next(err); }
        req.flash("success_msg", "You have successfully logged out.");
        res.redirect("/users/login");
    });

})

app.get('/users/dashboard', checkNotAuthentication, (req, res) => {
	res.render('dashboard', {user: req.user.name});
})

app.post('/users/register', async (req, res) => {
	const {name, email, password, password2} = req.body;
	const errors = []

	if (!name || !email || !password || !password2)
		errors.push({message: "Please enter all fields!"})

	if (password.length < 6 )
		errors.push({message: "Please enter a longer password"})

	if (password != password2)
		errors.push({message: "Passwords do not match!"})

	if (errors.length > 0)
		res.render('register', {errors})
	else {
		let hashedPassword = await bcrypt.hash(password, 10)
		pool.query(
			`
			SELECT * FROM users
			WHERE email = $1`, [email], (err, results) => {
				if (err)
					throw err


				console.log(results.rows)
				if (results.rows.length > 0) {
					errors.push({message: "Email already registered"})
					res.render('register', {errors})
				}
				else {
					pool.query(
						`
						INSERT INTO users (name, email, password)
						VALUES ($1, $2, $3)
						RETURNING id, password
						`, [name, email, hashedPassword],
						(err, results) => {
							if (err)
								throw err
							console.log(results.rows)
							req.flash('success_msg', "You are now registered: Please log in")
							res.redirect('/users/login')
						}
					)
				}
			}

		)
	}
})

app.post('/users/login', passport.authenticate('local' , {
	successRedirect: '/users/dashboard',
	failureRedirect: '/users/login',
	failureFlash: true
	})
)

app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`)
})
