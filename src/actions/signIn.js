import db from '../db'

const findUserById = (id) => {
  return db.one(`SELECT * FROM users
    WHERE id=$1`, id)
}

const verifyUser = (email) => {
  return db.one(`
    SELECT * FROM users
    WHERE email=$1`,
    [email])
}

module.exports = {findUserById, verifyUser}
