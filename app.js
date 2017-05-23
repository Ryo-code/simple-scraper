var request = require('request');
var cheerio = require('cheerio');

request('https://www.beagreatteacher.com/daily-fun-fact/', function(err, resp, html) {
    if (!err){
        $ = cheerio.load(html);
        var factOfTheDay = $('span:contains("Random Fact of the Day:")').parent().parent().next().text() //It's weird because of the way their HTML is structured
        console.log("Random fact:", factOfTheDay);
    }
});