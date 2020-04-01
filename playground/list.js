const fs = require('fs') // file system

fs.readFile('./data.json', 'utf-8', function(err, data){
    if(err) {
        console.log(err) 
    } else {
        const users = JSON.parse(data) 
        console.log(users)
    }
})