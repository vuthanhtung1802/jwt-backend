import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import bluebird from 'bluebird';
import db from '../models/index';
import { raw } from 'body-parser';
import { where } from 'sequelize/lib/sequelize';

// hash password
const salt = bcrypt.genSaltSync(10);

// hash user password
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};

// create new user
const createNewUser = async (username, email, password) => {
    let hashPass = hashUserPassword(password);

    try {
        await db.User.create({
            username: username,
            email: email,
            password: hashPass,
        });
    } catch (error) {
        console.log(error);
    }
};

// get users list
const getUserList = async () => {
    // test
    let newUser = await db.User.findOne({
        where: {
            id: 1,
        },
        attributes: ['id', 'username', 'email'],

        include: { model: db.Group, attributes: ['name', 'description'] },
        raw: true,
        nest: true,
    });

    let roles = await db.Group.findAll({
        where: { id: 1 },
        include: { model: db.Group, attributes: ['url', 'description'] },
        include: db.Role,
        raw: true,
        nest: true,
    });
    console.log('>>> check users: ', newUser);
    console.log('>>> check roles: ', roles);

    //
    let users = [];

    users = await db.User.findAll();

    return users;
};

const deleteUser = async (userId) => {
    await db.User.destroy({
        where: {
            id: userId,
        },
    });
};

const getUserById = async (id) => {
    let user = {};

    // sequelize converts to javascript objects
    user = await db.User.findOne({
        where: {
            id: id,
        },
    });

    // sequelize converts to javascript objects
    return user.get({ plain: true });
};

const updateUserInfor = async (email, username, id) => {
    await db.User.update(
        {
            username: username,
            email: email,
        },

        {
            where: {
                id: id,
            },
        }
    );
};

module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUserInfor,
};
