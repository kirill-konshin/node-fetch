/**
 * response.js
 *
 * Response class provides content decoding
 */

var http = require('http');
var convert = require('encoding').convert;
var Headers = require('./headers');
var Body = require('./body');

module.exports = Response;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Response(body, opts) {

	opts = opts || {};

	this.url = opts.url;
	this.status = opts.status;
	this.statusText = http.STATUS_CODES[this.status];
	this.headers = new Headers(opts.headers);
	this.ok = this.status >= 200 && this.status < 300;
	this.opts = opts; // save for future

	Body.call(this, body, opts);

}

Response.prototype = Object.create(Body.prototype);

/**
 * @return {Response}
 */
Response.prototype.clone = function(){

    var clone = new Response(null, this.opts);
    Body._clone(this, clone);
    return clone;

};

// expose Promise
Response.Promise = global.Promise;
