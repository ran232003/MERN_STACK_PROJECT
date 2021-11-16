const  express  = require("express");
const { usersList, signUp, login, test } = require("../controllers/user-controllers");
const uploadFiles = require("../middleware/file-upload");
const router = express.Router();

router.get("/",usersList);
//router.post("/test",uploadFiles.single("image"),test)
router.post("/signup",uploadFiles.single("image"),signUp);
router.post("/login",login);





module.exports = router;