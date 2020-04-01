const fs = require('fs')
const person = {
    "id" : 2, 
    "name" : "gokul"
}
fs.readFile('./data.json', 'utf-8', (err, data) => {
    if(err) {
        console.log(err) 
    } else {
        const users = JSON.parse(data) 
        users.push(person) 
        fs.writeFile('./data.json', JSON.stringify(users), () => {
            console.log('written to file')
        })
    }
})