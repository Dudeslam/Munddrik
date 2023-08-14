const express = require('express');
const cors = require('cors');
const app = express()
const bodyParser = require('body-parser')
const helmet = require('helmet');
const folders = './files/';
const fs = require('fs')

const server = require('http').Server(app);
const PORT = 8080;


app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
	res.setHeader('Access-Control-Allow-Origin', '*')
    next();
});

server.listen(PORT, (err) => {
	if (err) {
		throw err;
	}
	/* eslint-disable no-console */
    console.log(`http://localhost:${PORT}`)
});

// admin_server.listen(Admin_PORT, (err) =>{
//     if(err){
//         throw err;
//     }
//     console.log(`https://localhost:${Admin_PORT}`)
// })

app.get('/', (req, res) => {
    res.status(200).send({
        stat: "isOk!!"
    })
})

module.exports = server;

app.get('/getFiles', (req, res) => {
    let nameArray = [];
    fs.readdir(folders, (err, files) => {
        files.forEach(file => {
            const FileName = file;
            nameArray.push(FileName);
        })
        const retVal = nameArray;
        res.status(200).send({
            files: retVal
        })
    })

})

app.get('/getFile/:name', (req, res) => {
    const { name } = req.params;
    name.replace('%', ' ');
    let jsonRes = {};
    fs.readdir(folders, (err, files) =>{
        files.forEach(file => {
            const substr = file.split('.')[0];
            if(name == substr){
                const tsvFile = fs.readFileSync("./files/"+file)
                jsonRes = tsvJSON(tsvFile.toString());
            }
        })
        if(Object.keys(jsonRes).length != 0)
        {
            res.status(200).send({
                data: jsonRes
            })
        }
        else{
            res.status(404).send({
                data: 'Not Found'
            })
        }

    })
})

function tsvJSON(tsv) {
    const lines = tsv.split("\n");
    const result = [];
    const headers = lines[0].split("\t");
  
    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentline = lines[i].split("\t");
  
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
  
      result.push(obj);
    }
  
    return result;
  }