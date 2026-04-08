const express = require("express");
// Import cors module
const cors = require("cors");
// Import body-parser module
const bodyParser = require("body-parser");
// Import Mongoose Module
const mongoose = require("mongoose");
// Import Bcrypt Module
const bcrypt = require("bcrypt");
// Import path Module
const path = require("path");
// Import Multer Module
const multer = require("multer");
// Import express-session Module
const session = require("express-session");
// Import JWT Module
const jwt = require("jsonwebtoken");
// localhost == 127.0.0.1
mongoose.connect("mongodb://localhost:27017/reservationDB");
// Import axios Module
const axios = require("axios");

// Create the Express application
// -----------------------------------------------------------------
const app = express();


// App configuration
// -----------------------------------------------------------------
// app.use(cors({
//     origin: "http://localhost:4200"
// }));  => specify the origin

// accept all request from any origin
app.use(cors());

// send any response in a JSON format
app.use(bodyParser.json());
//Get object from request  
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration
const secretKey = "RES@vatiob2026@@FSJS"
app.use(session({
    secret: secretKey,
    resave: false, // don't save session if unmodified
    saveUninitialized: false,
}));

// Multer configuration for upload
// '/myShortCut' => shortcut to the path 'backend/uploads'
app.use('/myShortCut', express.static(path.join('backend/uploads')));
// app.use('/myShortCutForCv', express.static(path.join('backend/CVs')));
// 
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "backend/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const User = require('./models/user.js');
const Reservation = require('./models/reservation.js');
const Services = require('./models/services.js');
//user logic
app.post("/users/signup", multer({ storage: storageConfig }).single("photo"), (req, res) => {
    console.log("Business logic for adding user");

    User.findOne({ email: req.body.email }).then((doc) => {
        // 1. Check Email uniqueness
        console.log("Here is DB response:", doc);

        if (doc) {
            res.json({ msg: "0" });
        } else {
            // 2. Encrypt the password if the email is unique
            bcrypt.hash(req.body.password, 10).then((cryptedPassword) => {
                console.log("Here is the crypted Password", cryptedPassword);

                req.body.password = cryptedPassword;
                req.body.img = "http://localhost:3000/myShortCut/" + req.file.filename;

                // 3. Save the user object in the DB
                let userObj = new User(req.body);

                userObj.save()
                    .then((savedUser) => {
                        console.log("Here is the DB response:", savedUser);
                        res.json({ msg: "1" });
                    })
                    .catch((err) => {
                        console.log("Error while saving user:", err);
                        res.json({ msg: "2" });
                    });
            });
        }
    });
});
app.post("/users/login", (req, res) => {
    console.log("Business logic for finding user by Email", req.body);

    User.findOne({ email: req.body.loginEmail }).then(
        (doc) => {
            console.log("Here is the DB response:", doc);
            if (doc) {
                bcrypt.compare(req.body.loginPassword, doc.password).then(
                    (result) => {
                        console.log("Here is the resulat of the search", result);
                        if (!result) {
                            res.json({ msg: "User not found" })
                        } else if (result) {
                            console.log("Here is the user object:", doc);
                            let userToSend = {
                                role: doc.role,
                                firstName: doc.firstName,
                                lastName: doc.lastName,
                                img: doc.img,
                                id: doc._id
                            }
                            let token = jwt.sign(userToSend, secretKey, { expiresIn: "1d" })
                            console.log("Here is the token", token);
                            res.json({ msg: "User found", token });
                        }
                    })
            } else {
                res.json({ msg: "User not found" });
            }
        }
    )
});
app.post("/users/search/prestataire", (req, res) => {
    console.log("Business logic for getting prestataire", req.body);
    User.find({ speciality: req.body.speciality }).then(
        (docs) => {
            console.log("Here is the DB response", docs);
            res.json({ tab: docs })
        }
    )
})
app.get("/users/allusers", (req, res) => {
    console.log("Business logic for getting all users");
    User.find().then(
        (docs) => {
            console.log("Here is DB response:", docs);
            res.json({ tab: docs });
        }
    )
})
app.delete("/users/deletuser/:id", (req, res) => {
    console.log("Business logic for deleting user by ID");

    let id = req.params.id;

    User.findById(id).then((foundUser) => {
        console.log("Here is the found user:", foundUser);

        if (!foundUser) {
            res.json({ msg: false, error: "User not found" });
        }

        else if (foundUser.role == "prestataire") {
            console.log("Deleting prestataire with related services and reservations");

            Services.deleteMany({ prestataireid: id }).then(
                (deleteServicesRes) => {
                console.log("Deleted services:", deleteServicesRes);

                Reservation.deleteMany({ prestataireid: id }).then(
                    (deleteReservationsRes) => {
                    console.log("Deleted reservations:", deleteReservationsRes);

                    User.deleteOne({ _id: id }).then(
                        (deleteRes) => {
                        console.log("DB's response after deleting prestataire", deleteRes);

                        if (deleteRes.deletedCount == 1) {
                            res.json({ msg: true });
                        } else {
                            res.json({ msg: false });
                        }
                    });
                });
            });
        }

        else if (foundUser.role == "user") {
            console.log("Deleting user with his reservations");

            Reservation.deleteMany({ userid: id }).then(
                (deleteReservationsRes) => {
                console.log("Deleted reservations:", deleteReservationsRes);

                User.deleteOne({ _id: id }).then(
                    (deleteRes) => {
                    console.log("DB's response after deleting user", deleteRes);

                    if (deleteRes.deletedCount == 1) {
                        res.json({ msg: true });
                    } else {
                        res.json({ msg: false });
                    }
                });
            });
        }


    })
});
app.put("/users/edit", (req, res) => {
    console.log("Business logic for editing user");
    let newUserObj = req.body;
    console.log("Here is the new user object", newUserObj);
    User.updateOne({ _id: newUserObj._id }, newUserObj).then(
        (updateRes) => {
            console.log("Here is the Update response:", updateRes);
            if (updateRes.nModified == 1) {
                res.json({ msg: true })
            } else {
                res.json({ msg: false })
            }
        }
    );
});
app.put("/users/validate/:id", (req, res) => {
    console.log("Business logic for validating prestataire");

    let id = req.body.id;
    console.log("Here is the user id:", id);

    User.updateOne(
        { _id: id, status: "not valid" },
        { $set: { status: "valid" } }
    )
        .then((updateRes) => {
            console.log("Update response:", updateRes);

            if (updateRes.modifiedCount === 1) {
                res.json({ msg: "Prestataire validated successfully" });
            } else {
                res.json({ msg: "User not found or already valid" });
            }
        })
});
//.................//
//service logic
app.post("/services/addservice", multer({ storage: storageConfig }).single("image"),
    (req, res) => {

        console.log("Business logic for adding service");

        User.findOne({ email: req.body.prestataireemail }).then(
            (foundPrestataire) => {
            console.log("Here is the found prestataire:", foundPrestataire);

            if (!foundPrestataire) {
                res.json({ msg: "Prestataire not found", isadded: false });
            } else {

                let serviceObj = new Service({
                    name: req.body.name,
                    discription: req.body.discription,
                    price: req.body.price,
                    prestataireemail: req.body.prestataireemail,
                    prestataireid: foundPrestataire._id,
                    image: "http://localhost:3000/myShortCut/" + req.file.filename
                });

                serviceObj.save().then((savedService) => {
                    console.log("Here is the saved service:", savedService);

                    User.updateOne(
                        { _id: foundPrestataire._id },
                        { $push: { services: savedService._id } }
                    ).then((updateRes) => {
                        console.log("Here is the update response:", updateRes);

                        res.json({ msg: "Service added", isadded: true });
                    });
                });
            }
        });
    });
app.get("/services/allservice", (req, res) => {
    console.log("Business logic for getting all services");
    Services.find().then(
        // .then => give the result of the previous instruction 
        (docs) => {
            console.log("Here is DB response:", docs);
            res.json({ tab: docs });
        }
    )
});
app.get("/services/:id", (req, res) => {
    console.log("Business logic for getting match by ID");
    let id = req.params.id;
    Services.findById(id).then(
        (doc) => {
            console.log("Here is doc from collection", doc);
            let prestataireid = doc.prestataireid;
            User.findById({ prestataireid }).then(
                (doc1) => {
                    res.json({ serviceObj: doc, prestataireinfo: doc1 });
                }
            )

        }
    )
});
app.put("/services/edit/:id", (req, res) => {
    console.log("Business logic for editing service by ID");
    let newserviceObj = req.body;
    console.log("Here is the new service object", newserviceObj);
    Services.updateOne({ _id: newserviceObj._id }, newserviceObj).then(
        (updateRes) => {
            console.log("Here is the Update response:", updateRes);
            if (nModified == 1) {
                res.json({ msg: true })
            } else {
                res.json({ msg: false })
            }
        }
    );
});
app.delete("/services/delet/:id", (req, res) => {
    console.log("Business logic for deleting service by ID");
    Services.deleteOne({ _id: req.params.id }).then((
        (deleteRes) => {
            console.log("DB's response after deletion", deleteRes);
            if (deleteRes.deletedCount == 1) {
                res.json({ msg: true })
            } else {
                res.json({ msg: false })
            }
        }
    ))
});
app.get("/services/servicebyemail/:email", (req, res) => {
    console.log("Business logic for getting services by prestataire email");

    let email = req.params.email;
    console.log("Here is the prestataire email:", email);

    Services.find({ prestataireemail: email }).then(
        (docs) => {
        console.log("Here are the found services:", docs);
        res.json({ tab: docs });
    })
});

//........//
app.post("/reservation/addreservation", (req, res) => {
    console.log("Business logic for adding reservation");

    Services.findOne({
        name: req.body.service,
        prestataireid: req.body.prestataireid
    }).then((foundService) => {
        console.log("Here is the found service:", foundService);

        if (!foundService) {
            res.json({ msg: "Service not found" });
        } else {

            Reservation.findOne({
                serviceid: foundService._id,
                prestataireid: req.body.prestataireid,
                date: req.body.date,
                time: req.body.time
            }).then(
                (foundReservation) => {
                console.log("Here is the found reservation:", foundReservation);

                if (foundReservation) {
                    res.json({ msg: "This date and time are already reserved for this service" });
                } else {

                    let reservationObj = new Reservation({
                        fullname: req.body.fullname,
                        email: req.body.email,
                        phone: req.body.phone,
                        service: req.body.service,
                        date: req.body.date,
                        time: req.body.time,
                        userid: req.body.userid,
                        prestataireid: req.body.prestataireid,
                        serviceid: foundService._id
                    });

                    reservationObj.save().then(
                        (savedReservation) => {
                        console.log("Here is the saved reservation:", savedReservation);

                        User.updateOne(
                            { _id: req.body.userid },
                            { $push: { reservationids: savedReservation._id } }
                        ).then(
                            (updateClientRes) => {
                            console.log("Client updated:", updateClientRes);

                            User.updateOne(
                                { _id: req.body.prestataireid },
                                { $push: { reservationids: savedReservation._id } }
                            ).then(
                                (updatePrestataireRes) => {
                                console.log("Prestataire updated:", updatePrestataireRes);

                                res.json({ msg: "Reservation added" });
                            });
                        });
                    });
                }
            });
        }
    })
});
module.exports = app;