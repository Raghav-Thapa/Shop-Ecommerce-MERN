const bcrypt = require("bcryptjs")
const userServ = require("../services/user.service")
const mailSvc = require("../services/mailer.service")
const dotenv = require("dotenv");
const helpers = require("../utilities/helpers");
dotenv.config();
const { MongoClient } = require("mongodb");
const jwt = require('jsonwebtoken');


class authController {
    login = async (req, res, next) => {
        try {
            //todo
            let payload = req.body;
            if (!payload.email || !payload.password) {
                next({ status: 400, msg: "Credentials required" })
            }

            //validation
            let userDetail = await userServ.getUserByEmail(payload.email)
            //password match
            if (bcrypt.compareSync(payload.password, userDetail.password)) {
                //password match

                if (userDetail.status === 'active') {
                    let accessToken = jwt.sign({
                        userId: userDetail._id
                    }, process.env.JWT_SECRET, { expiresIn: '3h' });

                    let refreshToken = jwt.sign({
                        userId: userDetail._id
                    }, process.env.JWT_SECRET, { expiresIn: '5d' });

                    res.json({
                        //  result:payload
                        result: {
                            data: userDetail,
                            token: {
                                accessToken: accessToken,
                                accessType: "Bearer",
                                refreshToken: refreshToken
                            }
                        },
                        status: true,
                        msg: "you are logged in"
                    })
                } else {
                    next({ status: 403, msg: 'Your account has not been activated yet' })
                }

            } else {
                //password does not match
                next({ status: 400, msg: 'Credentials does not match' })
            }

            //db query

        } catch (exception) {
            console.log(exception);
            next({ status: 400, msg: "Query exception. View console" })

        }

    }
    register = async (req, res, next) => {
        try {
            let registerData = req.body
            registerData.status = 'inactive';
            //   console.log(req.file)
            if (req.file) {
                registerData.image = req.file.filename
            }

            userServ.validatedata(registerData)

            registerData.password = bcrypt.hashSync(registerData.password, 10);
            //TODO generate random string
            registerData.activationToken = helpers.generateRandomString();

            //TODO DB QUERY
            // from local

            // let client = await MongoClient.connect("mongodb://127.0.0.1:27017") 


            // let client = await MongoClient.connect(process.env.MONGODB_URL) 
            // let db = client.db(process.env.MONGODB_NAME)

            // let queryResponse = await db.collection('users').insertOne(registerData)

            let registerResponse = await userServ.registerUser(registerData)

            if (registerResponse) {

                let mailMsg = `Dear ${registerData.name}, <br/> Your account has been registered
            successfully. Please click the link below to activate your account:
            <a href="${process.env.FRONTEND_URL}activate/${registerData.activationToken}">"${process.env.FRONTEND_URL}activate/${registerData.activationToken}"</a>
            <br/>
            Regards,<br>
            Np-Reply, Admin
            `

                await mailSvc.sendMail(registerData.email, "Activate your account", mailMsg);

                //data store -> db

                //   console.log(registerData)
                res.json({
                    result: registerData,
                    msg: "user registered successfully",
                    status: true
                })

            }
            else {
                next({ status: 400, msg: "user cannot be registered at this moment" })
            }


            //    await MongoClient.connect("mongodb+srv://raghavmern:<password>@cluster0.aguznsx.mongodb.net/") from cluster





        }
        catch (exception) {
            console.log(exception);
            next(exception)

        }

    }
    activateUser = async (req, res, next) => {
        try {
            let token = req.params.token;
            let userInfo = await userServ.getUserByFilter({
                activationToken: token
            })
            console.log(userInfo);

            if (!userInfo || userInfo.length <= 0) {
                throw { status: 400, msg: "Token expired or already used" }
              }
              else {
            let update = await userServ.updateUser({
                activationToken : null,
                status: "active"
            }, userInfo[0]._id)
            res.json({
                result: userInfo,
                msg: "user activated successfully",
                status: true
            })
        }

        } catch (exception) {
            console.log(exception);
            next(exception)

        }

    }

    forgetPassword = async (req, res, next) => {
        try{
            console.log("Received forget password request");

            const {email} = req.body

            if (!email) {
                throw { status: 400, msg: "Email is required" };
              }

            const user = await userServ.getUserByEmail(email)

            if(!user){
                throw{status:404, msg:"User not found"}
            }
            
            const resetToken =  helpers.generateRandomString();

            await userServ.updateUser({resetToken}, user._id)

            let mailMsg = `Dear ${user.name}, <br/> You have requesteed top reset your password. Please click the link below to reset password:
            <a href="${process.env.FRONTEND_URL}reset-password/${resetToken}">"${process.env.FRONTEND_URL}reset-password/${resetToken}"</a>
            <br/>
            Regards,<br>
            Np-Reply, Admin
            `
            await mailSvc.sendMail(user.email, "Reset your password", mailMsg);
            
            res.json({
                result: user,
                msg: "Reset link sent",
                status: true
            });

        } catch(exception){
            console.log(exception);
            next(exception)
        }

    }

    resetPassword = async (req, res, next) => {
        try{
            // const {email, password} = req.body
            // const payload = req.body
            const { email, newPassword } = req.body;

            if (!email || !newPassword) {
                throw { status: 400, msg: "Email and new Password are required" };
              }
            const user = await userServ.getUserByEmail(email);

            if (!user) {
                throw { status: 400, msg: "User not found" };
              }

              let hashedPassword = bcrypt.hashSync(newPassword, 10);

              await userServ.updateUser({
                password: hashedPassword
              }, user._id)

              res.json({
                result: user,
                msg: "Password has been reset successfully",
                status: true,
              });


        }catch(exception){
            console.log(exception);
            next(exception)
        }
        

    }
    getLoggedInUser = (req, res, next) => {
        try {
            res.json({
                result: req.authUser,
                msg: "Your detail",
                status: true

            })
        } catch (exception) {
            console.log(exception);
            next(exception)
        }

    }
    refreshToken = async (req, res, next) => {
    }

}

const authCtrl = new authController()
module.exports = authCtrl