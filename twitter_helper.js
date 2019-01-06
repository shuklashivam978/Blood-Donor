'use strict';
module.change_code = 1;
var _ = require('lodash');
var Twitter = require('twit');
var CONSUMER_KEY = 'ayOqqb7Vzg63xFeCmalLhPztl';
var CONSUMER_SECRET = 'DPrAJ07d1owWvVrrFPDgq95g90FPHB3ucfNV5FB5OfQd3Ar5J5';

function TwitterHelper(accessToken) {
    this.accessToken = accessToken.split(',');
    this.client = new Twitter({
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET,
        access_token: this.accessToken[0],
        access_token_secret: this.accessToken[1]
    });
}

TwitterHelper.prototype.postTweet = function (message) {
    //console.log('hello');
    return this.client.post('statuses/update', {
        status: message
    }).catch(function (err) {
        console.log('caught error', err.stack);
    });
};

module.exports = TwitterHelper;