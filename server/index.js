require('dotenv').config();

const express = require('express')
    , bodyParser = require('body-parser')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , session = require('express-session');

const app = express();

app.use(bodyParser())

//MIDDLEWARE
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))

//FOR TESTING ONLY COMMENT OUT LATER
app.use((req, res, next) => {
    req.session.user = {};
    req.session.user.id = 1;
    req.session.user.birthday = "September 8, 1989";
    req.session.user.hair_color = "purple";
    req.session.user.eye_color = "blue";
    req.session.user.gender = "male";
    req.session.user.first_name = "Dan";
    req.session.user.last_name = "ifFactor";
    next()
});

// app.use(passport.initialize());
// app.use(passport.session());



//DATABASE CONNECTION
massive(process.env.CONNECTIONSTRING).then(db => {
    app.set('db', db);
})

//AUTHENTICATION
// passport.use(new Auth0Strategy({
//     domain: process.env.AUTH_DOMAIN,
//     clientID: process.env.AUTH_CLIENT_ID,
//     clientSecret: process.env.AUTH_CLIENT_SECRET,
//     callbackURL: process.env.AUTH_CALLBACK
// }, function (accessToken, refreshToken, extraParams, profile, done) {
//     const db = app.get('db')

//     db.find_user(profile.id).then(user => {
//         if (user[0]) {
//             return done(null, user);
//         } else {
//             db.create_user([profile.displayName, profile.emails[0].value, profile.picture, profile.id])
//                 .then(user => {
//                     return done(null, user[0]);
//                 })
//         }
//     })
// }));

// passport.serializeUser(function (user, done) {
//     done(null, user)
// })

// passport.deserializeUser(function (user, done) {
//     app.get('db').find_session_user(user[0].id).then(user => {
//             return done(null, user[0]);
//         })
// })

// //AUTH ENDPOINTS
// app.get('/api/auth/login', passport.authenticate('auth0'));

// app.get('/auth/callback', passport.authenticate('auth0', {
//     successRedirect: 'http://localhost:3000/#/api/auth/setUser',
//     failureRedirect: 'http://localhost:3000/#/api/auth/login'
// }));

// app.get('/api/auth/setUser', (req, res) => {
//     if(!req.user) {
//         return res.status(404).send('User not found')
//     } else {
//         return res.status(200).send(req.user);
//     }
// })

// app.get('/auth/logout', (req, res) => {
//     req.logOut()
//     return res.redirect(302, 'http://localhost:3000/#/');
// })

app.get('/api/me', (req, res) => {
    res.status(200).send(req.session.user)
})

//FRIEND ENDPOINTS
app.get('/api/friend/list', ((req, res) => {
    const dbInstance = req.app.get('db');
    dbInstance.getFriends(req.session.user.id)
        .then(friends => { res.status(200).send(friends)})
        .catch(err => { res.status(500).send(err) })
}))

app.post('/api/friend/add', ((req, res) => {
    const dbInstance = req.app.get('db');
    dbInstance.addFriend(req.session.user.id, req.body.friendID)
    .then(friends => { res.status(200).send(friends)})
    .catch(err => { res.status(500).send(err) })
}))

app.post('/api/friend/remove', ((req, res) => {
    const dbInstance = req.app.get('db');
    dbInstance.removeFriend(req.session.user.id, req.body.friendID)
    .then(friends => { res.status(200).send(friends)})
    .catch(err => { res.status(500).send(err) })
}))

//USER ENDPOINTS
app.patch('/api/user/patch/:id', ((req, res) => {
    const dbInstance = req.app.get('db');
    let {birthday, hair_color, eye_color, gender, first_name, last_name} = req.body;
    dbInstance.updateUser(req.params.id, birthday, hair_color, eye_color, gender, first_name, last_name)
    .then(attributes => {res.status(200).send(attributes)})
    .catch(err => { res.status(500).send(err) })
}))

app.get('/api/user/list', ((req, res) => {
    const dbInstance = req.app.get('db');
    let page = req.query.page ? req.query.page : 1;
    dbInstance.getUsersPagination(req.session.user.id, ((page-1)*24))
    .then(users => {res.status(200).send(users)})
    .catch(err => { res.status(500).send(err) })
}))

app.get('/api/user/search', ((req, res) => {
    const dbInstance = req.app.get('db');
    dbInstance.getUsersFilter()
    .then(users => {
        for(let prop in req.query) {
            users = users.filter(user => {
                return user[prop].includes(req.query[prop])
            })
        }
        res.status(200).send(users)
    })
    .catch(err => { res.status(500).send(err) })
}))



//RECOMMENDED ENDPOINTS
app.get('/api/recommended', ((req, res) =>{
    const dbInstance = req.app.get('db');
    dbInstance.getUsersFilter()
    .then(users => {
        for(let prop in req.query) {
            users = users.filter(user => {
                return user[prop]==(req.session.user[prop])
            })
        }
        res.status(200).send(users)
    })
    .catch(err => { res.status(500).send(err) })
}))

app.post('/api/recommended/add', ((req, res) => {
    const dbInstance = req.app.get('db');
    dbInstance.addFriend(req.session.user.id, req.body.friendID)
    .then(_ => { 
        dbInstance.getUsersFilter()
        .then(users => {
            for(let prop in req.query) {
                users = users.filter(user => {
                    return user[prop]==(req.session.user[prop])
                })
            }
            res.status(200).send(users)
        })
        .catch(err => { res.status(500).send(err) })
    })
    .catch(err => { res.status(500).send(err) })
}))




let PORT = 4040;
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
})