// include the libraries we need
var request = require('request');
var cheerio = require('cheerio');

var $ = cheerio.load('<h2 class="title">Original text</h2>');

$('h2.title').text('New stuff!');
$('h2').addClass('welcome');

console.log($.html()); //<h2 class="title welcome">Hello there!</h2>
