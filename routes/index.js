var express = require('express');
var router = express.Router();
var token = '';
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Welcome - EC Node JS' });
});

/* Generate EC button. */
router.get('/ec', function(req, res) {
var https = require('https');


// do a POST request

// prepare the request parameters
var content = '';
var userName = 'vimalnath53-facilitator_api1.gmail.com';
var password = 'AZ8QCKRR8DYL4LFW';
var signature = 'AFcWxV21C7fd0v3bYYYRCpSSRl31A29fN5I0Vkzj-YVPkX7.fqpcuUVi';
var version = '115.0';
var methodName = 'SetExpressCheckout';
var RETURNURL = 'http://localhost:3000/ec_result';
var CANCELURL = 'http://localhost:3000/ec_result';

var PAYMENTREQUEST_0_PAYMENTACTION = 'Sale';
var SOLUTIONTYPE = 'Sole';
var PAYMENTREQUEST_0_AMT = '10.00';
var PAYMENTREQUEST_0_ITEMAMT = '10.00';

var L_PAYMENTREQUEST_0_NAME0 = 'FIFA2014';
var L_PAYMENTREQUEST_0_NUMBER0 = '12345';
var L_PAYMENTREQUEST_0_AMT0 = '10.00';

var PAYMENTREQUEST_0_TAXAMT = '0.00';
var L_PAYMENTREQUEST_0_QTY0 = '1';


var parameter_list = userName+'&pwd='+password+'&signature='+signature+'&version='+version+'&METHOD='+methodName+'&RETURNURL='+RETURNURL+'&CANCELURL='+CANCELURL+'&PAYMENTREQUEST_0_PAYMENTACTION='+PAYMENTREQUEST_0_PAYMENTACTION+'&SOLUTIONTYPE='+SOLUTIONTYPE+'&PAYMENTREQUEST_0_AMT='+PAYMENTREQUEST_0_AMT+'&PAYMENTREQUEST_0_ITEMAMT='+PAYMENTREQUEST_0_ITEMAMT+'&L_PAYMENTREQUEST_0_NAME0='+L_PAYMENTREQUEST_0_NAME0+'&L_PAYMENTREQUEST_0_NUMBER0='+L_PAYMENTREQUEST_0_NUMBER0+'&L_PAYMENTREQUEST_0_AMT0='+L_PAYMENTREQUEST_0_AMT0+'&PAYMENTREQUEST_0_TAXAMT='+PAYMENTREQUEST_0_TAXAMT;

var path_string =  '/nvp?user='+parameter_list;

console.log(path_string);
// the post options
var optionspost = {
    hostname : 'api-3t.sandbox.paypal.com',
    path : path_string,
    method : 'GET'
};
// do the POST call
var reqPost = https.request(optionspost, function(data) {
    console.log("statusCode: ", data.statusCode);
    data.on('data', function(content) {
			var response = new Object;
			content = content.toString().split("&");
			for (var i = 0; i < content.length; i++) {
				var title = content[i].split("=");
				if(title.length > 1) {
					response[title[0].toUpperCase()] = title[1];
					
				}
			}
			console.log(response);
			if(response['ACK'].toString() === 'Success') {
				token = response['TOKEN'].toString();
				res.redirect("https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token="+token);
			} else {
				console.log('failure');
			}
			console.log('token val='+token);

    });
});


// write the json data
// reqPost.write(jsonObject);
reqPost.end();
reqPost.on('error', function(e) {
    console.error(e);
});


});
//Do EC
router.get('/ec_result', function(req, res) {
var https = require('https');
var url   = req.url; // gets the URL
var query = url.split('?').pop();
var vars = query.split("&");
 var title = []; 

	for (var i = 0; i < vars.length; i++) {
		 title[i] = vars[i].split("=");
		// console.log(title[1]);
	}
	
	var tokenVal = title[0][1];
	var payerId = title[1][1];
	console.log(tokenVal+'~'+payerId);
	
//do ec
var finalcontent = '';



var userName = 'vimalnath53-facilitator_api1.gmail.com';
var password = 'AZ8QCKRR8DYL4LFW';
var signature = 'AFcWxV21C7fd0v3bYYYRCpSSRl31A29fN5I0Vkzj-YVPkX7.fqpcuUVi';
var version = '115.0';
var methodName = 'DoExpressCheckoutPayment';


var PAYMENTREQUEST_0_PAYMENTACTION = 'Sale';
var SOLUTIONTYPE = 'Sole';
var PAYMENTREQUEST_0_AMT = '10.00';
var PAYMENTREQUEST_0_ITEMAMT = '10.00';

var L_PAYMENTREQUEST_0_NAME0 = 'FIFA2014';
var L_PAYMENTREQUEST_0_NUMBER0 = '12345';
var L_PAYMENTREQUEST_0_AMT0 = '10.00';

var PAYMENTREQUEST_0_TAXAMT = '0.00';
var L_PAYMENTREQUEST_0_QTY0 = '1';


var parameter_list = userName+'&pwd='+password+'&signature='+signature+'&version='+version+'&METHOD='+methodName+'&PAYMENTREQUEST_0_PAYMENTACTION='+PAYMENTREQUEST_0_PAYMENTACTION+'&SOLUTIONTYPE='+SOLUTIONTYPE+'&PAYMENTREQUEST_0_AMT='+PAYMENTREQUEST_0_AMT+'&PAYMENTREQUEST_0_ITEMAMT='+PAYMENTREQUEST_0_ITEMAMT+'&L_PAYMENTREQUEST_0_NAME0='+L_PAYMENTREQUEST_0_NAME0+'&L_PAYMENTREQUEST_0_NUMBER0='+L_PAYMENTREQUEST_0_NUMBER0+'&L_PAYMENTREQUEST_0_AMT0='+L_PAYMENTREQUEST_0_AMT0+'&PAYMENTREQUEST_0_TAXAMT='+PAYMENTREQUEST_0_TAXAMT;
var path_string =  '/nvp?user='+parameter_list;

		// the post options
		var finaloptionspost = {
			hostname : 'api-3t.sandbox.paypal.com',
			path : path_string+'&TOKEN='+tokenVal+'&PAYERID='+payerId,
			method : 'GET'
		};
		// do the POST call
		var finalreqPost = https.request(finaloptionspost, function(finaldata) {
			console.log("statusCode: ", finaldata.statusCode);
		   
			finaldata.on('data', function(finalcontent) {
				console.log(finaloptionspost);
					var finalresponse = new Object;
					finalcontent = finalcontent.toString().split("&");
					for (var i = 0; i < finalcontent.length; i++) {
						var title = finalcontent[i].split("=");
						if(title.length > 1) {
							finalresponse[title[0].toUpperCase()] = title[1];
							
						}
					}
					
					console.info('finalcontent='+finalcontent);
					res.render('thankyou', { title: 'Thank you for your purchase, your transaction id is: '+finalresponse['PAYMENTINFO_0_TRANSACTIONID'] });
					

			});
		});
finalreqPost.end();
finalreqPost.on('error', function(e) {
    console.error(e);
});
	
});



module.exports = router;
