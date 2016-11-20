const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect('mongodb://journey:far@ds031597.mlab.com:31597/journeyman');

//Mongo and Mongoose Setup

var User = mongoose.model('User', {
    clientID: String,
    trips: [],
    favoritePlaces: []
})

//Express setup
const app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/client/build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Routes
app.get('/', (req, res) => {
    res.sendFile(path.join('index.html'));
});

//User calls a save trip
app.post('/trips', (req, res) => {
    let clientID = req.body.clientID;
    let trip = {
        tripName: req.body.tripName,
        route: req.body.route
    }
    User.findOne({
        'clientID': clientID
    }, (err, user) => {
        if (err)
            return handleError(err);
        if (user) { //If a user is found matching the id
            let existing = false;
            // checks to see if the user already has a trip by that name.
            user.trips.forEach((item) => {
                if (item.tripName === trip.tripName) {
                    item.route = trip.route;
                    existing = true;
                }
            })
            if (!existing) {
                user.trips.push(trip);
            }
            // Handle the favorite places
            if (user.favoritePlaces != req.body.favoritePlaces) {
                let difference = [];
                req.body.favoritePlaces.forEach((place) => {
                    if (user.favoritePlaces.indexOf(place) === -1) {
                        difference.push(place)
                    }
                })
                user.favoritePlaces.push(difference)
            }
            user.save((err) => {
                if (err)
                    handleError(res, err);
                res.sendStatus(200);
            })
        } else { //If a user is not found
            var newUser = new User({clientID: clientID});
            newUser.trips.push(trip);
            newUser.save((err) => {
                if (err)
                    handleError(res, err);
                res.sendStatus(200);
            })
        }
    })

})

//User accesses 'my trips'
app.get('/trips/:clientID', (req, res) => {
    let trips;
    User.findOne({
        'clientID': req.params.clientID
    }, (err, user) => {
        if (err)
            console.log(err);
        if (user) {
            res.send(user)
        }
    })
})

//User deletes a trip

app.delete('/trips/:clientID/:tripIndex', (req, res) => {
    User.findOne({
        'clientID': req.params.clientID
    }, (err, user) => {
        if (!err) {
            user.trips.splice(req.params.tripIndex, 1)
            user.save();
            res.send(user.trips)
        }
    })
})

app.listen(app.get('port'), () => {
    console.log(`The magic happens at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
