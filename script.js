const solc = require('solc');

const compile = (content, fileName) => {
    let sources = {
        [fileName]: {
            content
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
        return {
            success: false,
            output
        }
    }
    else{
        return {
            success: false,
            output
        }
    }
}

const content = `
    pragma solidity >=0.4.22 <0.6.0;
    contract Form{
        address field;
        function setData(address _fields) public payable{
            field = _fields;
        }
    }
`

compile(content, 'new.sol');

module.exports = {
    compile
}