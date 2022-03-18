const express = require("express");
const router = express.Router();
//const protect  = require("../middleware/protect")
const { addUser, deleteUser, addlogin, changeUserInfo, userLogout, idUser } = require("../controller/adminController");


router.post("/user", addUser)
router.delete("/user/delete", deleteUser)
router.post("/user/login", addlogin)
router.put("/user/change/:email", changeUserInfo)
router.get("/user/logout", userLogout)

router.get("/user/id/get/:email", idUser);


module.exports = router;