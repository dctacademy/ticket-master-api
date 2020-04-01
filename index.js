const express = require('express')
const fs = require('fs')
const app = express() 
const port = 3035

// application middleware
app.use(express.json())

// Route / Request Handler 
// app.HttpMethod(url, callbck)

// request - header - key - secret123
const auth = (req, res, next) => {
    // execute code
    const key = req.headers['key']
    if(key == 'secret123') {
        const msg = 'welcome user' 
        req.msg = msg // make changes req-res obj
        next()   // call the next middleware functi
    } else {
        res.json({ errors: 'invalid key'}) // end req-res-cycle
    }
}

app.use(function(req, res, next){
    console.log(`${req.ip} - ${req.method} - ${req.url} - ${new Date()}`)
    next()
})

// localhost:3035/
app.get('/', function(req, res){
    res.send('welcome to the website')
})

app.get('/error', (req, res) => {
    throw new Error('oops!!! something went wrong')
})  

app.get('/number', (req, res) => {
    const random = Math.round(Math.random() * 100)
    const msg = req.msg 
    res.json({ random, msg })
})

// localhost:3035/users 
app.get('/users', (req, res) => {
    fs.readFile('./info.json', 'utf-8', (err, data) => {
        if(err) {
            res.json(err) 
        } else {
            const users = JSON.parse(data) 
            res.json(users)
        }
    })
})

// localhost:3035/users/2
app.get('/users/:id', (req, res) => {
    const id = req.params.id 
    fs.readFile('./info.json', 'utf-8', (err, data) => {
        if(err) {
            res.json(err) 
        } else {
            const users = JSON.parse(data) 
            const user = users.find(user => user.id == id) 
            if(user) {
                res.json(user) 
            } else {
                res.json({})
            }
        }
    })
})

app.post('/users', (req, res) => {
   const body = req.body 
   fs.readFile('./info.json', 'utf-8', (err, data) => {
        if(err) {
            res.json(err) 
        } else {
            const users = JSON.parse(data) 
            users.push(body) 
            fs.writeFile('./info.json', JSON.stringify(users), () => {
                res.json({
                    notice: 'successfully created record'
                })
            })
        }
   })
})

// delete - localhost:3035/users/1
app.delete('/users/:id', (req, res) => {
    res.send('method - delete was sent')
})

app.put('/users/:id', (req, res) => {
    console.log('put', req.body)
    res.send('put method was sent')
})

app.use((err, req, res, next) => {

    res.json({
        notice: err.message
    })
})

// handle 404's
app.use(function(req, res, next){
    res.status('404').json({
        notice: 'url not found'
    })
})

app.listen(port, () => {
    console.log('listening on port', port)
})