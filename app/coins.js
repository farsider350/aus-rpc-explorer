var btc = require("./coins/btc.js");
var ltc = require("./coins/ltc.js");
var aus = require("./coins/aus.js");

module.exports = {
	"BTC": btc,
	"LTC": ltc,
	"AUS": aus,

	"coins":["BTC", "LTC", "AUS"]
};