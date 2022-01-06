const Admins = require('../models/Admins');
const Firebase = require('../helper/firebase');

const registerAdmin = async (req, res) => {
  try {
    // Create user in Firebase
    const newFirebaseUser = await Firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    // Create new user
    const userCreated = new Admins({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      name: req.body.name,
      firebaseUid: newFirebaseUser.uid,
    });
    // Save the new user on DB
    const userSaved = await userCreated.save();
    await Firebase.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'ADMIN' });
    // Response with the new user created
    return res.status(201).json({
      message: 'User created',
      data: userSaved,
    });
  } catch (error) {
    // Return error
    return res.status(400).json({ message: error.toString() });
  }
};

module.exports = {
  registerAdmin,
};
