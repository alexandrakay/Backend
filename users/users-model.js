const db = require("../database/dbConfig")

module.exports = {
  add,
  find,
  findBy,
  findById,
  findUsersComments,
  findUserComments,
}

function findUserComments (id) {
  return db("users as u")
    .select("u.id", 'c.negativity as negativityScore', 'c.comment')
    .join('comments as c', 'u.id', 'c.user_id')
    .orderBy("u.id")
    .where({ id })
}

function findUsersComments() {
  return db("users as u")
    .select("u.id", 'c.negativity as negativityScore', 'c.comment')
    .join('comments as c', 'u.id', 'c.user_id')
    .orderBy("u.id")

}
function find() {
  return db("users").select("id", "first_name", 'last_name', 'email').orderBy("id")
}

function findBy(filter) {
  // console.log(`-- user model inside findBy --`)
  // console.log(filter)

  return db("users")
    .where(filter)
    .orderBy("id")
}


async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id")

    return findById(id)
  } catch (error) {
    throw error
  }
}

function findById(id) {
  return db("users")
  .where({ id })
  .first()
}