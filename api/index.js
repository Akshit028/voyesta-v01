// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('./models/User.js');
// const Place = require('./models/Place.js');
// const Booking = require('./models/Booking.js');
// const cookieParser = require('cookie-parser');
// const imageDownloader = require('image-downloader');
// const multer = require('multer');
// const fs = require('fs');
// require('dotenv').config()
// const app = express();
// const bcryptSalt = bcrypt.genSaltSync(10);
// const jwtSecret = 'asdgfafdgdsgdf';
// app.use(express.json());
// app.use(cookieParser());
// app.use('/uploads', express.static(__dirname + '/uploads'));

// app.use(cors({
//     credentials: true,
//     origin: 'http://127.0.0.1:5173',
// }));


// mongoose.connect(process.env.MONGO_URL);

// function getUserDatafromReq(req) {
//     return new Promise((resolve, reject) => {
//         jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
//             if (err) throw err;
//             resolve(userData);
//         });
//     });
// }



// app.get('/test', (req, res) => {
//     res.json('test ok');
// });

// app.post('/register', async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         const userDoc = await User.create({
//             name,
//             email,
//             password: bcrypt.hashSync(password, bcryptSalt),
//         });

//         res.json(userDoc);
//     } catch (e) {
//         res.status(422).json(e);
//     }
// });

// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Check if a user with the provided email exists
//         const userDoc = await User.findOne({ email });

//         if (!userDoc) {
//             return res.status(422).json({ message: 'Invalid email or password' });
//         }

//         // Verify the provided password against the hashed password stored in the database
//         const passwordMatch = bcrypt.compareSync(password, userDoc.password);

//         if (!passwordMatch) {
//             return res.status(422).json({ message: 'Invalid email or password' });
//         }

//         // If both email and password are correct, generate a JWT token and return it along with the user data
//         jwt.sign({
//             email: userDoc.email,
//             id: userDoc._id,
//         }, jwtSecret, {}, (err, token) => {
//             if (err) throw err;
//             res.cookie('token', token).json(userDoc);
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });


// app.get('/profile', (req, res) => {
//     const { token } = req.cookies;
//     if (token) {
//         jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//             if (err) throw err;
//             const { name, email, _id } = await User.findById(userData.id)
//             res.json({ name, email, _id });
//         });
//     } else {
//         res.json(null);
//     }
// });

// app.post('/logout', (req, res) => {
//     res.cookie('token', '').json(true);
// });

// app.post('/upload-by-link', async (req, res) => {
//     const { link } = req.body;
//     const newName = 'photo' + Date.now() + '.jpg';
//     await imageDownloader.image({
//         url: link,
//         dest: __dirname + '/uploads/' + newName,

//     });
//     res.json(newName);
// });

// // Add a new endpoint for canceling bookings
// app.delete('/bookings/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         await Booking.findByIdAndDelete(id);
//         res.json({ message: 'Booking cancelled successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to cancel booking' });
//     }
// });

// // Add a new endpoint to handle place deletion
// app.delete('/places/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         await Place.findByIdAndDelete(id);
//         res.json({ message: 'Place removed successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to remove place' });
//     }
// });


// const photosMiddleware = multer({ dest: 'uploads/' });
// app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
//     const uploadedFiles = [];
//     for (let i = 0; i < req.files.length; i++) {
//         const { path, originalname } = req.files[i];
//         const parts = originalname.split('.');
//         const ext = parts[parts.length - 1];
//         const newPath = path + '.' + ext;
//         fs.renameSync(path, newPath);
//         uploadedFiles.push(newPath.replace(/uploads\\/g, ''));
//     }
//     res.json(uploadedFiles);
// });



// app.post('/places', (req, res) => {
//     const { token } = req.cookies;
//     const {
//         title, address, addedPhotos,
//         description, perks, extraInfo,
//         checkIn, checkOut, maxGuests, price,
//     } = req.body;

//     jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//         if (err) throw err;
//         const placeDoc = await Place.create({
//             owner: userData.id, price,
//             title, address, photos: addedPhotos,
//             description, perks, extraInfo,
//             checkIn, checkOut, maxGuests,
//         });
//         res.json(placeDoc);
//     });

// });

// app.get('/user-places', (req, res) => {
//     const { token } = req.cookies;
//     jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//         const { id } = userData;
//         res.json(await Place.find({ owner: id }));
//     });
// });

// app.get('/places/:id', async (req, res) => {
//     const { id } = req.params;
//     res.json(await Place.findById(id));
// });

// app.put('/places', async (req, res) => {
//     const { token } = req.cookies;
//     const {
//         id, title, address, addedPhotos,
//         description, perks, extraInfo,
//         checkIn, checkOut, maxGuests, price,
//     } = req.body;
//     jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//         if (err) throw err;
//         const placeDoc = await Place.findById(id);
//         if (userData.id === placeDoc.owner.toString()) {
//             placeDoc.set({
//                 title, address, photos: addedPhotos,
//                 description, perks, extraInfo,
//                 checkIn, checkOut, maxGuests, price,
//             });
//             await placeDoc.save();
//             res.json('ok');
//         }
//     });
// });

// app.get('/places', async (req, res) => {
//     res.json(await Place.find());
// })

// app.post('/bookings', async (req, res) => {
//     const userData = await getUserDatafromReq(req);
//     const {
//         place, checkIn, checkOut, guests, name, phone, price,
//     } = req.body;
//     Booking.create({
//         place, checkIn, checkOut, guests, name, phone, price,
//         user: userData.id,
//     }).then((doc) => {
//         res.json(doc);
//     }).catch((err) => {
//         throw err;
//     });
// });

// app.get('/bookings', async (req, res) => {
//     const userData = await getUserDatafromReq(req);
//     const currentDate = new Date();

//     try {
//         // Find bookings where the checkout date is in the future
//         const bookings = await Booking.find({
//             user: userData.id,
//             checkOut: { $gte: currentDate }
//         }).populate('place');

//         res.json(bookings);
//     } catch (error) {
//         console.error("Error fetching bookings:", error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.listen(4000);

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const Place = require('./models/Place.js');
const Booking = require('./models/Booking.js');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config()
const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'asdgfafdgdsgdf';
const mime = require('mime-types');

app.use(express.json());
app.use(cookieParser());

app.use('api/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
    credentials: true,
    origin: "https://voyesta-v1.vercel.app/api"
}));

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // Path to your Firebase service account key file

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "voyesta-ef64d.appspot.com" // Replace with your Firebase Storage bucket URL
});

async function uploadToFirebaseStorage(filePath, originalFilename, mimetype) {
    const bucket = admin.storage().bucket();
    const newFilename = Date.now() + '_' + originalFilename;

    await bucket.upload(filePath, {
        destination: newFilename,
        metadata: {
            contentType: mimetype,
            metadata: {
                custom: 'metadata'
            }
        }
    });

    const file = bucket.file(newFilename);
    const url = await file.getSignedUrl({
        action: 'read',
        expires: '03-09-2491' // Replace with an appropriate expiry date
    });

    return url[0];
}

mongoose.connect(process.env.MONGO_URL);

function getUserDatafromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        });
    });
}



app.get('/api/test', (req, res) => {
    res.json('test ok');
});

app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });

        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if a user with the provided email exists
        const userDoc = await User.findOne({ email });

        if (!userDoc) {
            return res.status(422).json({ message: 'Invalid email or password' });
        }

        // Verify the provided password against the hashed password stored in the database
        const passwordMatch = bcrypt.compareSync(password, userDoc.password);

        if (!passwordMatch) {
            return res.status(422).json({ message: 'Invalid email or password' });
        }

        // If both email and password are correct, generate a JWT token and return it along with the user data
        jwt.sign({
            email: userDoc.email,
            id: userDoc._id,
        }, jwtSecret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json(userDoc);
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/api/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(userData.id)
            res.json({ name, email, _id });
        });
    } else {
        res.json(null);
    }
});

app.post('/api/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

const photosMiddleware = multer({ dest: '/tmp' });

app.post('/api/upload', photosMiddleware.array('photos', 100), async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname, mimetype } = req.files[i];
        const url = await uploadToFirebaseStorage(path, originalname, mimetype);
        uploadedFiles.push(url);
    }
    res.json(uploadedFiles);
});

app.post('/api/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: '/tmp/' + newName,
    });
    const url = await uploadToFirebaseStorage('/tmp/' + newName, newName, mime.lookup('/tmp/' + newName));
    res.json(url);
});
// Add a new endpoint for canceling bookings
app.delete('/api/bookings/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Booking.findByIdAndDelete(id);
        res.json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to cancel booking' });
    }
});

// Add a new endpoint to handle place deletion
app.delete('/api/places/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Place.findByIdAndDelete(id);
        res.json({ message: 'Place removed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to remove place' });
    }
});






app.post('/api/places', (req, res) => {
    const { token } = req.cookies;
    const {
        title, address, addedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price,
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id, price,
            title, address, photos: addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests,
        });
        res.json(placeDoc);
    });

});

app.get('/api/user-places', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Place.find({ owner: id }));
    });
});

app.get('/api/places/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id));
});

app.put('/api/places', async (req, res) => {
    const { token } = req.cookies;
    const {
        id, title, address, addedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: addedPhotos,
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests, price,
            });
            await placeDoc.save();
            res.json('ok');
        }
    });
});

app.get('/api/places', async (req, res) => {
    res.json(await Place.find());
})

app.post('/api/bookings', async (req, res) => {
    const userData = await getUserDatafromReq(req);
    const {
        place, checkIn, checkOut, guests, name, phone, price,
    } = req.body;
    Booking.create({
        place, checkIn, checkOut, guests, name, phone, price,
        user: userData.id,
    }).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        throw err;
    });
});

app.get('/api/bookings', async (req, res) => {
    const userData = await getUserDatafromReq(req);
    const currentDate = new Date();

    try {
        // Find bookings where the checkout date is in the future
        const bookings = await Booking.find({
            user: userData.id,
            checkOut: { $gte: currentDate }
        }).populate('place');

        res.json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(4000);