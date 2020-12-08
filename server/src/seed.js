
const { table } = require('console');
const pokedex = require('../data/pokedex.json')


const knex = require("knex")({
    client: "pg",
    connection: {
      host: "127.0.0.1",
      user: "postgres",
      password: "postgres",
      database: "pokemons"
    }
})

function createKeys(){
  let keys = Object.keys(pokedex[0])
  pokedex.forEach(pokemon => {
    const tmpKeys = Object.keys(pokemon)
    tmpKeys.forEach(key => {
      if(!(keys.includes(key))){
        keys.push(key)
      }
    })
  })
  return keys
}

/*function createAttaques(knex, data){
  return knex.schema.createTable('attaques', (table) => {
    table.increments()
    table.string('attaque', 2047);
  })
  .then(() => {
    return knex("attaques").insert(data).then(console.log("insertion completed"))
  })
  .catch((err) => { console.log(err); throw err })
  .finally(() => {
      knex.destroy();
  });
}*/

function createPokemon(knex, data, pokedex){
  /*pokedex.forEach(pokemon => {
    delete pokemon.attaques
  })*/
  return knex.schema.createTable('pokemon', (table) => {
    table.increments()
    const keys = createKeys(pokedex)
    keys.forEach(key => {
      table.string(key, 2047)
    })
  })
  .then(() => {
    return knex("pokemon").insert(data)//.then(console.log("insertion completed"))
  })
  .catch((err) => { console.log(err); throw err })
  .finally(() => {
      knex.destroy()
  })
}

async function insertPokemonAsync(knex, pokedex, data) {
  /*pokedex.forEach(pokemon => {
    delete pokemon.attaques
  })*/
  await knex.schema.createTable('pokemon', (table) => {
    table.increments()
    const keys = createKeys(pokedex)
    keys.forEach(key => {
      table.string(key, 2047)
    })
  })
  pokedex.forEach(async pokemon =>{
    await knex("pokemon").insert(pokemon)
  })
  //await knex("pokemon").insert(data)
}


  insertPokemonAsync(knex, pokedex, pokedex)
