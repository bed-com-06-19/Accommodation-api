const express = require('express')
const app = express()

const post = require('./src/posts/post.model')
const dbConnection = require('./src/utils/mysql.connector')

app.get('/api/v1', function(req,res){
    return res.json(res)
})

app.get('/api/v1/posts', function(req, res){
    return res.json([posts])
})

 app.listen(3000,function(){
    console.log('ACCOMMODATION listening on port 3000')
    dbConnection.connect(function(err){
        if(err) throw err.message

        console.log("connected to mysql")
    })
 })