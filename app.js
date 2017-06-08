'use strict';
var request = require('request');
var cheerio = require('cheerio');
var rp = require('request-promise'); //使うかどうか分からない

var quoteOfTheDay = () => {
  request('https://en.wikiquote.org/wiki/Main_Page', (err, resp, html) => {
    if(!err) {
      var $ = cheerio.load(html);

      //The code below looks insane because of the way they structured their HTML
      var quoterElement = $('small').parent().parent().parent().children().children().children().children().children().children().children().has('td:contains("~")');
      var quotedBy = quoterElement.text().trim().slice(0, -1);
      var quoteElement = $('small').parent().parent().parent().children().children().children().children().children().children().children().children();
      var actualQuote = quoteElement.text().trim().slice(0, -quotedBy.length -1);

      console.log("==================================================")
      console.log("Quote of the Day...");
      console.log("");
      console.log(actualQuote);
      console.log("");
      console.log("Quoted by:", quotedBy);
      console.log("==================================================")
    }
  })
}


var merriamWebsterWOTD = () => {
  request('https://www.merriam-webster.com/word-of-the-day', function (err, resp, html) {
    if (!err) {
      var $ = cheerio.load(html);
      var todaysWord = $('.word-and-pronunciation h1').text();
      var wordType = $('.main-attr').text().trim();
      var pronunciation = $('.word-syllables').text().trim();

      //NOTE: Don't change the ORDER of these variables!
      var entireDefinitionsBox = $('.wod-definition-container').text();
      var exampleOne = $('.wod-definition-container h2:contains("Examples")').next().text();
      var exampleTwo = $('.wod-definition-container h2:contains("Examples")').next().next().text();
      var exampleChars = exampleOne.length + exampleTwo.length
      var definitionsOnly = entireDefinitionsBox.slice(35, -exampleChars -50).trim();
      var didYouKnow = $('.wod-did-you-know-container').children().next().text();

      console.log(" ---===< Word of the day:", todaysWord, "(" + wordType + ")" ,"[" + pronunciation + "] >===---");
      console.log("~ ~ ~ ~ ~ ~ ~ ~ ~")
      console.log("Definitions ====>", definitionsOnly) //You have to experiment with .slice() on different days (you could do -40, -50, etc.)
      console.log("~ ~ ~ ~ ~ ~ ~ ~ ~")
      console.log("Example 1 -->", exampleOne); //DONE!
      console.log("")
      console.log("Example 2 -->", exampleTwo); //DONE!
      console.log("- - - - - - - - - - - - - - - - - - - - ")
      console.log("Food for thought:", didYouKnow); //DONE!!! (though there are no italics)
    }
  });
}


var beAGreatTeacherFOTD = () => {
  request('https://www.beagreatteacher.com/daily-fun-fact/', function (err, resp, html) {
    if (!err) {
      var $ = cheerio.load(html);
      var factOfTheDay = $('span:contains("Random Fact of the Day:")').parent().parent().next().text();
      var factOfTheDayBackup = $('span:contains("Random Fact of the Day:")').parent().next().text();
      console.log("`````````````````````````````````")
      console.log("Random fact:", factOfTheDay, factOfTheDayBackup); //One of these will work, the other won't (which is perfect)
    }
  });
}


var redditTopNews = () => {
  request('https://www.reddit.com/r/news/top/', function (err, resp, html) {
    if (!err) {
      var $ = cheerio.load(html);
      var softPaywallCheck = $('span.rank:contains("1")').next().next().first().children('p.title').children().text()//...
      //Make an IF statement
      var abbrevLink = $('span.rank:contains("1")').next().next().first().children('p.title').children().children().text(); //must be able newsTitle
      var newsTitle = $('span.rank:contains("1")').next().next().first().children('p.title').not('span.domain').text().trim().slice(0, -abbrevLink.length -3);
      // var newsTitleIfBehindSoftPaywall = $('span.rank:contains("1")').next().next().first().children('p.title').children().next().not('span.domain').text();
      var fullLink = $('span.rank:contains("1")').next().next().first().children('p.title')[0].children[0].attribs.href;
      // var fullLinkIfBehindSoftPaywall = $('span.rank:contains("1")').next().next().first().children('p.title').children().next().not('span.domain').attr('href');
      var commentsNumbers = parseInt($('span.rank:contains("1")').next().next().first().children('p.title').next().next().children('li.first').text().trim().slice(0, -9));
      // var commentsNumbers = parseInt($('span.rank:contains("1")').next().next().first().children('p.title').next().next().children().children().text().trim().slice(0, -14));
      var commentsLink = $('span.rank:contains("1")').next().next().first().children('p.title').next().next().children('li.first').children('a')[0].attribs.href;

      // var newsTitle = $('.entry').text();

      //can we skip until it doesn't say "Soft paywall?"

      console.log("softPaywallCheck", softPaywallCheck)
      console.log("- - - - - - - - - - - - - - - - - -");
      // console.log("News Title (if behind a soft paywall) -->", newsTitleIfBehindSoftPaywall);
      console.log("News Title  -->", newsTitle);
      console.log("News source -->", abbrevLink);
      // console.log("News link (if behind a soft paywall) --->", fullLinkIfBehindSoftPaywall);
      console.log("Article link ->", fullLink);
      console.log("`````````````````````````````````");
      console.log("#of comments ->", commentsNumbers, typeof(commentsNumbers));
      console.log("Comments link->", commentsLink);
    }
  });
}


var dailyCurio = () => {
  request('https://curious.com/curios/daily-curio', function (err, resp, html) {
    if (!err) {
      var $ = cheerio.load(html);
      var todaysCurio = $('span.date').text();

      console.log("`````````````````````````````````")
      console.log("Curio of the day:", todaysCurio); //One of these will work, the other won't (which is perfect)
    }
  });
}


// merriamWebsterWOTD();
// quoteOfTheDay();
// beAGreatTeacherFOTD();
redditTopNews();
// dailyCurio();
