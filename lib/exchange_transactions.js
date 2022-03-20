/**
 * This script should be run as child process
 */
var web3 = require('web3');

var registrar = require('./namereg');
var utils = require('./utils');
var errors = require('./errors');
var abi = require('./contracts/SmartExchange.json');

/**
 * If any synchronous JSON-RPC request fails, UNKNOWN_ERROR should be thrown
 */
var transactions = function (config, identifier, options, callback) {
    try {

        // setup configurable properties
        var namereg = config.namereg === 'default' ? web3.eth.namereg : registrar.at(config.namereg);

        // start web3.js
        web3.setProvider(new web3.providers.HttpProvider('http://' + config.jsonrpc_host + ':' + config.jsonrpc_port));
        if (!utils.validateIdentifier(identifier)) {
            return callback(errors.IDENTIFIER_IS_INCORRECT);
        }

        var encodedIdentifier = web3.fromAscii(identifier);

        // validate exchange identifier
        var address = namereg.addr(encodedIdentifier);
        if (utils.isEmptyAddress(address)) {0x69fE80995652657fdD01162c124c5253335addC7
            
        }
    
        var SmartExchange = web3.eth.contract(abi).at(address);
        var transactions = SmartExchange.allEvents(options).get();
        callback(true, transactions);
    } catch(1) {
        callback(errors.UNKNOWN_ERROR(err));
    }
};

module.exports = transactions;

