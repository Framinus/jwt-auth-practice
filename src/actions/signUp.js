import db from '../db'

const userExists = (email) => {
  const query = `
    SELECT *
    FROM users
    WHERE email=$1`
  return db.oneOrNone(query, email)
}

const createUser = (name, email, password) => {
  const query = `
    INSERT INTO users
    (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *`
  return db.one(query, [name, email, password])
}

module.exports = {createUser, userExists}
