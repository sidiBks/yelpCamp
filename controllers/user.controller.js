const User = require('../models/user.model.js')

module.exports.getNewUserForm = (req, res) => {
    res.render('auth/register')
}
module.exports.createNewUser = async (req, res) => {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username })
        const registerdUser = await User.register(user, password)
        req.login(registerdUser, err => {
            if (err) return next(err)
            req.flash('success', 'welcome to Yelp Camp!')
            res.redirect('/campgrounds')
        })
    } catch (error) {
        req.flash('error', error.message)
        res.redirect('register')
    }
}

module.exports.getLoginForm = (req, res) => {
    res.render('auth/login')
}

module.exports.createUserSession = (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/campgrounds'; // update this line to use res.locals.returnTo now
    res.redirect(redirectUrl);
}

module.exports.endUserSession =  (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err)
        }
        req.flash('success', 'Goodbye!')
        res.redirect('/campgrounds')
    })
}