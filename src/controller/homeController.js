import userService from '../service/userService';
const handleHelloWord = (req, res) => {
    return res.render('home.ejs');
};

const handleUserPage = async (req, res) => {
    let userList = await userService.getUserList();
    return res.render('user.ejs', { userList });
};
const handleCreateNewUser = (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    userService.createNewUser(username, email, password);
    return res.redirect('/user');
};

const handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);
    return res.redirect('/user');
};
const handleUpdateUserPage = async (req, res) => {
    let id = req.params.id;

    let user = await userService.getUserById(id);

    let userData = {};

    userData = user;

    return res.render('update-user.ejs', { userData });
};

const handleUpdateUser = async (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let id = req.body.id;
    await userService.updateUserInfor(email, username, id);
    return res.redirect('/user');
};

module.exports = {
    handleHelloWord,
    handleUserPage,
    handleCreateNewUser,
    handleDeleteUser,
    handleUpdateUserPage,
    handleUpdateUser,
};
