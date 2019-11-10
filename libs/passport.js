const passport = require('passport');
const { google : { clientID, clientSecret } } = require('../config.json');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


passport.use(new LocalStrategy(
    async function(username, password, done) {

        let user = await User.findByUsername(username)
            .catch(done);
            
        if (!user) {
            return done(null, false);
        }

        if (!await User.validPassword(user.id, password)) {
            return done(null, false);
        }

        return done(null, user);
    }
));

passport.use(new GoogleStrategy({
        clientID,
        clientSecret,
        callbackURL: "/auth/google/callback"
    },
    async function(accessToken, refreshToken, profile, done) {

        let user = await User.findByUsername(profile.id)
            .catch(done);
        
        if (!user) {
            user = await User.create(profile.id)
                .catch(done);
        }
        
        done(null, user);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(async function(id, done) {
    const user = await User.findByID(id)
        .catch(done);
    done(null, user);
});