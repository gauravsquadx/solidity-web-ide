const solc = require('solc');

const compile = (req, res, next) => {
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
                    '*': [ '*' ]
                }
            }
        }
    }
    var output = JSON.parse(solc.compile(JSON.stringify(input)));
    if(output.errors){
        output.errors.map(o=>{
            o.lineNumber = parseInt(o.formattedMessage.slice(fileName.length+1,fileName.length+2));
        })
        res.json({
            success: false,
            output
        })
    }
    else{
        let contract = Object.keys(output.contracts[fileName])[0];
        res.json({
            success: true,
            output:{
                raw: output,
                abi: output.contracts[fileName][contract].abi,
                bytecode: output.contracts[fileName][contract].evm.bytecode,
            }
        })
    }
}

module.exports = {
    compile
}