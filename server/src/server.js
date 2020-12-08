const express = require('express')
const pokedex = require('../data/pokedex.json')
const cors = require('cors')

const app = express()

app.use(cors())


app.use(express.json())
app.use(express.urlencoded({ extended: true}))


const knex = require("knex")({
    client: "pg",
    connection: {
      host: "127.0.0.1",
      user: "postgres",
      password: "postgres",
      database: "pokemons"
    }
})

app.post('/pokemons', async (req, res) => {
    await knex("pokemon").insert(req.body)
    res.send("done")
})

app.delete('/pokemons/:id', async (req, res) => {
    const {id} = req.params
    await knex.from("pokemon").where("id", id).del()
    res.json("done")
})

app.get('/', (req, res) => {
    res.send("pokedex db")
})

app.get('/pokemons', (req, res) => {
    knex.select().from("pokemon").then(rows => {
        res.json(rows)
    })
})

app.get('/pokemons/:id', (req, res) => {
    const {id} = req.params
    knex.from("pokemon").where("numéro", id).then(row => {
        //console.log(typeof row)
        res.json(row[0])
    })
})

app.listen(4242, () => {
    console.log('Server is listening on port 4242')
})