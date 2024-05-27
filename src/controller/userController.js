import userApiService from '../service/userApiService'

const readFunc = async (req, res) => {
  try {
    let data = await userApiService.getAllUser()
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      EM: 'Internal server error ',
      EC: '2',
      DT: error.message,
    })
  }
}
const createFunc = async (req, res) => {
  try {
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      EM: 'Internal server error',
      EC: '2',
      DT: error.message,
    })
  }
}
const updateFunc = async (req, res) => {
  try {
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      EM: 'Internal server error',
      EC: '2',
      DT: error.message,
    })
  }
}
const deleteFunc = async (req, res) => {
  try {
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      EM: 'Internal server error',
      EC: '2',
      DT: error.message,
    })
  }
}

module.exports = {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
}
