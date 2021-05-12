// const db = require('../database/dbConfig');

module.exports = {
  find,
  add,
  findById,
  update,
  remove,
}

function find() {
  return db('adverts')
  .select(
    'adverts.id',
    'advertName',
    'websiteUrl',
    'country',
    'tags',
    'days',
    'number',
    'datestring'
    )
}

function findById(id) {
  return db('adverts')
  .where({ id: Number(id) })
  .first()
}

function add(adverts) {
  return db('adverts')
  .insert(adverts)
  .then(ids => ({ id: ids[0]}));
}

function update(id, advert) {
  return db('adverts')
  .where({ id: Number(id)})
  .update(advert)
}

function remove(id) {
  return db('adverts')
  .where('id', Number(id))
  .del();
}
