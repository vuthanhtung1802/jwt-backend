import db from '../models/index';
import bcrypt from 'bcryptjs';
import { raw } from 'body-parser';
import { Op } from 'sequelize';
const salt = bcrypt.genSaltSync(10);

/// REGISTER
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};

const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: {
            email: userEmail,
        },
    });
    if (user) {
        return true;
    }
    return false;
};

const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: {
            phone: userPhone,
        },
    });
    if (user) {
        return true;
    }
    return false;
};

const registerNewUser = async (rawUserData) => {
    try {
        // check email and password exists
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if (isEmailExist) {
            return {
                EM: 'Email already exist',
                EC: '1',
            };
        }
        let isPhoneExist = await checkPhoneExist(rawUserData.phone);

        if (isPhoneExist) {
            return {
                EM: 'Phone already exist',
                EC: '1',
            };
        }
        // hash password
        let hashPassword = hashUserPassword(rawUserData.password);

        // create new user
        await db.User.create({
            username: rawUserData.username,
            email: rawUserData.email,
            password: hashPassword,
            phone: rawUserData.phone,
        });
        return {
            EM: 'Created successfully',
            EC: '0',
        };
    } catch (error) {
        console.log(error);
    }
};

/// LOGIN
const checkPassword = (inputpassword, hashPassword) => {
    return bcrypt.compareSync(inputpassword, hashPassword);
};

const handleUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
            },
        });
        if (user) {
            let isCorrectPassword = checkPassword(rawData.password, user.password);
            if (isCorrectPassword === true) {
                return {
                    EM: 'Login successfully',
                    EC: '0',
                };
            }
        }
        console.log('>>> check UserLogin failed: ', rawData.valueLogin, 'password', rawData.password);
        return {
            EM: 'Phone or email is incorrect',
            EC: '1',
        };
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    registerNewUser,
    handleUserLogin,
};
