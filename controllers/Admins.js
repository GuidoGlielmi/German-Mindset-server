const Admins = require('../models/Admins')

const getAdmins = (req, res) => {
  Admins.find()
    .then((Admins) =>{
      return res.status(200).json(Admins)
    })
    .catch((error) =>{
      return res.status(400).json(error)
    })
}

const updateAdmin = (req, res) => {
	Admins.findByIdAndUpdate(req.params.id,
	{
	  full_name: req.query.full_name,
    username: req.query.username,
    password: req.query.password,
	},
	{new: true},
	(error, newAdmin) => {
	  if(!newAdmin) {
	    return res.status(404).json({
	      msg: 'Admin with id: ${req.params.id} was not found'	
	    })
	}
	if(error) {
	    return res.status(400).json(error)	
	}
	    return res.status(200).json(newAdmin)
	}
)}

const createAdmin = (req, res) => {
  const newAdmin = new Admins({
      full_name: req.query.full_name,
      username: req.query.username,
      password: req.query.password,
    });
  
    newAdmin.save((error, newAdmin) => {
      if (error) {
      return res.status(400).json(error);
      }
      return res.status(201).json(newAdmin);
    });
};

const deleteAdmin = (req, res) => {
  Admins.findByIdAndDelete(req.params.id, (error, chosenAdmin) => {
    if (!chosenAdmin) {
      return res.status(404).json(`Admin with id ${req.params.id} was not found`);
    } if (error) {
      return res.status(400).json(error);
    }
    return res.status(204).send(`Admin with id ${req.params.id} was remove successfully`);
  });
};

module.exports = {
  getAdmins,
  updateAdmin,
  createAdmin,
  deleteAdmin,
}
