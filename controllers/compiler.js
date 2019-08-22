const solc = require('solc');
const request = require('request');
const Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/817e63240f504ee7a0834d8acce7dfb5'));

const compile = (req, res, next) => {
    solc.loadRemoteVersion(req.body.compiler, (err, snapshot)=>{
        if(err){
            console.log(err);
        }
        let fileName = req.body.filename;
        let sources = {
            [fileName]: {
                content: req.body.content
            }
        }
        let input = {
            language: 'Solidity',
            sources,
            settings: {
                outputSelection: {
                    '*': {
                        '*': ['*']
                    }
                }
            }
        }
        var output = JSON.parse(snapshot.compile(JSON.stringify(input)));
        if (output.errors) {
            output.errors.map(o => {
                o.lineNumber = parseInt(o.formattedMessage.split(':')[1]);
            })
            res.json({
                success: false,
                output
            })
        }
        else {
            let contract = Object.keys(output.contracts[fileName])[0];
            res.json({
                success: true,
                output: {
                    raw: output,
                    abi: output.contracts[fileName][contract].abi,
                    bytecode: output.contracts[fileName][contract].evm.bytecode,
                }
            })
        }
    })
    
}

const getVersions = (req, res, next) => {
    request.get('https://ethereum.github.io/solc-bin/bin/list.json', (error, response, body) => {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body).releases;
            let list = [];
            for(let i in body){
                list.push({
                    name: i,
                    url: body[i].substring(8, body[i].length)
                })
            }
            res.json({
                success: true,
                data: list
            })
        }
        else{
            res.json({
                success: false,
                data: null
            })
        }
    })
}

const getTx = (req, res, next) => {
    web3.eth.getTransaction(req.params.hash, (err, data)=>{
        if(err){
            res.json({
                success: false,
                data: null,
                err: err.message
            })
        }
        else{
            res.json({
                success: true,
                data,
            })
        }
    })
}

module.exports = {
    compile,
    getVersions,
    getTx
}