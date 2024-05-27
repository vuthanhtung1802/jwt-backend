import { where } from 'sequelize/lib/sequelize'
import db from '../models/index'

const getAllUser = async () => {
  try {
    let user = await db.User.findAll({
      attributes: ['id', 'username', 'email', 'phone', 'sex'],

      include: { model: db.Group, attributes: ['name', 'description'] },
    })
    if (user) {
      return {
        EM: 'success',
        EC: '0',
        DT: user,
      }
    } else {
      return {
        EM: 'fail',
        EC: '1',
        DT: [],
      }
    }
  } catch (err) {
    console.log(err)
    return {
      EM: 'something wrong with service',
      EC: '1',
      DT: [],
    }
  }
}

const createNewUser = async (data) => {
  try {
    await db.User.create({})
  } catch (error) {}
}

const updateUser = async (data) => {
  try {
    let user = await db.User.findOne({
      where: { id: data.id },
    })
    if (user) {
      user.save()
    }
  } catch (error) {}
}

const deleteUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where: { id: id },
    })
    if (user) {
      user.destroy()
    }
  } catch (error) {}
}

module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
}
