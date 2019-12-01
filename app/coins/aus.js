var Decimal = require("decimal.js");
Decimal8 = Decimal.clone({ precision:8, rounding:8 });

var currencyUnits = [
	{
		type:"native",
		name:"AUS",
		multiplier:1,
		default:true,
		values:["", "aus", "AUS"],
		decimalPlaces:8
	},
	{
		type:"native",
		name:"ace",
		multiplier:1000,
		values:["ace"],
		decimalPlaces:5
	},
	{
		type:"native",
		name:"ause",
		multiplier:1000000,
		values:["ause"],
		decimalPlaces:2
	},
	{
		type:"native",
		name:"austoshi",
		multiplier:100000000,
		values:["austoshi", "ace"],
		decimalPlaces:0
	},
	{
		type:"exchanged",
		name:"AUD",
		multiplier:"aud",
		values:["aud"],
		decimalPlaces:2,
		symbol:"$"
	},
];

module.exports = {
	name:"AustraliaCash",
	ticker:"AUS",
	logoUrl:"/img/logo/aus.svg",
	siteTitle:"Australia Cash Explorer",
	nodeTitle:"Australia Cash Full Node",
	nodeUrl:"https://explorer.australiacash.org/",
	demoSiteUrl: "https://",
	miningPoolsConfigUrls:[
		"https://",
	],
	maxBlockWeight: 4000000,
	targetBlockTimeSeconds: 150,
	currencyUnits:currencyUnits,
	currencyUnitsByName:{"AUS":currencyUnits[0], "ace":currencyUnits[1], "ause":currencyUnits[2], "austoshi":currencyUnits[3]},
	baseCurrencyUnit:currencyUnits[3],
	defaultCurrencyUnit:currencyUnits[0],
	feeSatoshiPerByteBucketMaxima: [5, 10, 25, 50, 100, 150, 200, 250],
	genesisBlockHash: "aa43989047f144331fc6400859c691b11c0e111ead1977511d340860c1c5ad1f",
	genesisCoinbaseTransactionId: "273a20070d7cb57e4c77354d8bd5e01c1cf7d96ad32d91a7b7d183e30da12ef5",
	genesisCoinbaseTransaction: {
		"txid":"273a20070d7cb57e4c77354d8bd5e01c1cf7d96ad32d91a7b7d183e30da12ef5",
		"hash":"273a20070d7cb57e4c77354d8bd5e01c1cf7d96ad32d91a7b7d183e30da12ef5",
		"blockhash":"aa43989047f144331fc6400859c691b11c0e111ead1977511d340860c1c5ad1f",
		"version":1,
		"locktime":0,
		"size":303,
		"vsize":303,
		"time":1542015250,
		"blocktime":1542015250,
		"vin":[
			{
				"prev_out":{
					"hash":"0000000000000000000000000000000000000000000000000000000000000000",
					"n":2084598007
				},
				"coinbase":"04ffff001d0104404e592054696d65732030352f4f63742f32303131205374657665204a6f62732c204170706c65e280997320566973696f6e6172792c2044696573206174203536"
			}
		],
		"vout":[
			{
				"value":"50.00000000",
				"n":0,
				"scriptPubKey":{
					"hex":"040174720fa689ad5023690c80f3a49c8f13f8d45b8c857fbcbc8bc4a8e4d3eb4b10f4d4604fa08dce601aaf0f470216fe1b51850b4acf21b179c45070ac7b03a9 OP_CHECKSIG",
					"type":"pubkey",
					"reqSigs":1,
					"addresses":[
						"AaDekaUUTDtopJVKrPbVQCQB4kBwM8LEYr"
					]
				}
			}
		]
	},
	historicalData: [
		{
			type: "blockheight",
			date: "12-11-2018",
			blockHeight: 0,
			blockHash: "aa43989047f144331fc6400859c691b11c0e111ead1977511d340860c1c5ad1f",
			summary: "The Australia Cash genesis block.",
			alertBodyHtml: "This is the first block in the Australia Cash blockchain.",
			referenceUrl: "https://"
//		},
//		{
//			type: "tx",
//			date: "2017-05-10",
//			txid: "ce385e55fb2a73fa438426145b074f08314812fa3396472dc572b3079e26e0f9",
//			summary: "First SegWit transaction.",
//			referenceUrl: "https://twitter.com/satoshilite/status/862345830082138113"
//		},
//		{
//			type: "blockheight",
//			date: "2011-10-13",
//			blockHeight: 448,
//			blockHash: "6995d69ce2cb7768ef27f55e02dd1772d452deb44e1716bb1dd9c29409edf252",
//			summary: "The first block containing a (non-coinbase) transaction.",
//			referenceUrl: ""
//		},
//		{
//			type: "link",
//			date: "2016-05-02",
//			url: "/rpc-browser?method=verifymessage&args%5B0%5D=Ler4HNAEfwYhBmGXcFP2Po1NpRUEiK8km2&args%5B1%5D=G7W57QZ1jevRhBp7SajpcUgJiGs998R4AdBjcIgJq5BOECh4jHNatZKCFLQeo9PvZLf60ykR32XjT4IrUi9PtCU%3D&args%5B2%5D=I%2C+Charlie+Lee%2C+am+the+creator+of+Litecoin&execute=Execute",
//			summary: "Litecoin's Proof-of-Creator",
//			referenceUrl: "https://medium.com/@SatoshiLite/satoshilite-1e2dad89a017"
		}
	],
	exchangeRateData:{
		jsonUrl:"https://api.coingecko.com/api/v3/coins/australia-cash",
		exchangedCurrencyName:"aud",
		responseBodySelectorFunction:function(responseBody) {
			if (responseBody[0] && responseBody[0].price_usd) {
				return {"aud":responseBody[0].price_usd};
			}
			
			return null;
		}
	},
	blockRewardFunction:function(blockHeight) {
		var eras = [ new Decimal8(50) ];
		for (var i = 1; i < 34; i++) {
			var previous = eras[i - 1];
			eras.push(new Decimal8(previous).dividedBy(2));
		}

		var index = Math.floor(blockHeight / 840000);

		return eras[index];
	}
};