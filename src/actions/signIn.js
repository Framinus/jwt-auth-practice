import db from '../db'

const findUserById = (id) => {
  return db.one(`SELECT * FROM users
    WHERE id=$1`, id)
}

const verifyUser = (email, password) => {
  return db.one(`
    SELECT * FROM users
    WHERE email=$1 AND password=$2`,
    [email, password])
}

module.exports = {findUserById, verifyUser}
