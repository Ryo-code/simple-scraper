// include the libraries we need
var request = require('request');
var cheerio = require('cheerio');

request('https://www.beagreatteacher.com/daily-fun-fact/', function(err, resp, html) {
    if (!err){
        $ = cheerio.load(html);
        // console.log(html);
        console.log($('main.content').find('h2').text())
        // console.log($('main.content.0.children'));
        // console.log($('.logo-subtext').text());
    }
});

// var $ = cheerio.load('<h2 class="title">Original text</h2>');

// $('h2.title').text('New stuff!');
// $('h2').addClass('welcome');

// console.log($.html()); //<h2 class="title welcome">Hello there!</h2>
