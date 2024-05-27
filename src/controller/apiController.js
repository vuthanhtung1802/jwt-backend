import loginRegisterService from '../service/loginRegisterService';
const testApi = (req, res) => {
    return req.status(200).json({
        message: 'API is working',
        status: 200,
        data: 'test api is working',
    });
};
const handleRegister = async (req, res) => {
    try {
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(400).json({
                EM: 'missing required parameters',
                EC: '1',
                DT: '',
            });
        }
        if (req.body.password.length < 3) {
            return res.status(400).json({
                EM: 'Password is too short',
                EC: '1',
                DT: '',
            });
        }
        //service create user account
        let data = await loginRegisterService.registerNewUser(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: '',
        });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({
            EM: 'Internal server error',
            EC: '2',
            DT: error.message,
        });
    }
};

const handleLogin = async (req, res) => {
    try {
        let data = await loginRegisterService.handleUserLogin(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({
            EM: 'Internal server error',
            EC: '2',
            DT: error.message,
        });
    }
};

module.exports = {
    testApi,
    handleRegister,
    handleLogin,
};
