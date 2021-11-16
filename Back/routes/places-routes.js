express = require('express');

const { getPlaceById, getPlacesByUser, createPlace, editPlace, deletePlace } = require('../controllers/place-controllers');
const dummy = require('../DummyPlaces');
const authCheck = require('../middleware/auth-check');
const uploadFiles = require('../middleware/file-upload');
const myError = require('../models/myError');

router = express.Router();

//return all place by creator id



// router.get("/user/:uid",function(req,res,next){
//     const userId = req.params.uid;
//     const userPlaces = dummy.filter((item)=>{
//         if(item.creatorId == userId){
//             return item;
//         }
//     })
//     if(typeof userPlaces === "undefined"){
//         // res.status(404).json({msg:"places not found"});
//         // let error = new Error("places not found")
//         // error.code = 404;
//         // throw error
//         const myError = new myError("places not found",404);
//         throw myError;
//     }
//     else{
//     res.json({userPlaces:userPlaces});
//     }
// })
//return one place by id
router.get("/user/:uid",getPlacesByUser);
router.get('/:pid',getPlaceById);
router.use(authCheck);
router.patch('/:pid',editPlace);
router.delete('/:pid',deletePlace);
router.post('/',uploadFiles.single("image"),createPlace);

module.exports = router;