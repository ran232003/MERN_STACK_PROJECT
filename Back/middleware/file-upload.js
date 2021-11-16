const multer = require('multer');

const fileType = {
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/jpg':'jpg'
}

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"upload/images")
    },
    filename:(req,file,cb)=>{
        cb(null,`${file.originalname}`)
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === "image/png" || file.mimetype === "image/jpeg" ||file.mimetype === "image/jpg"){
        cb(true);
    }
    else{
        cb(false);
    }
}

const uploadFiles = multer({
   
    limits:500000,
    storage: multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,"upload/images")
        },
        filename:(req,file,cb)=>{
            //file.mimetype will bring me example image/jpg.
             // so if i put it in [] it will return jpg only
            const fileExtension = fileType[file.mimetype]
            console.log(file.originalname)
            cb(null,file.originalname);
        },
        fileFilter:(req,file,cb)=>{
            //checking file type
            const type = fileType[file.mimetype];
            if(!type){
                const error = new Error("invalid type");
                cb(error,false)
            }
            else{
                cb(null,true)
            }
        }
    })
   
}); 

module.exports = uploadFiles;