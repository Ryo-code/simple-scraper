'use strict';
//コードを短くするには、もっと順調なセレクターを使うべきだろう。ここ、見てみ：
//https://code.tutsplus.com/tutorials/the-30-css-selectors-you-must-memorize--net-16048

var request = require('request');
var cheerio = require('cheerio');
// var rp = require('request-promise'); //使うかどうか分からない

var quoteOfTheDay = () => {
  request('https://en.wikiquote.org/wiki/Main_Page', (err, resp, html) => {
    if(!err) {
      const $ = cheerio.load(html);
      const QOTDobj = {};
      const todaysQuote = $('small').parent().parent().parent().children().children().children().children().children().children().children().has('td:contains("~")'); //.html() <- To see the HTML structure

      console.log("Quote----------------->:", todaysQuote.children().children().first('td').text().trim());
      console.log("Quoter----------------->:", todaysQuote.children().children().first('td').next().children().children('a').html());
      console.log("QuoterLink----------------->:", "https://en.wikiquote.org" + todaysQuote.children().children().first('td').next().children().children('a').attr('href'));
      console.log("Image source----------------->:", "https:" + todaysQuote.parent().parent().children().children('a').children('img').attr('src') );

      const quote = todaysQuote.children().children().first('td').text().trim();
      const quoter = todaysQuote.children().children().first('td').next().children().children('a').html();
      const quoterLink = "https://en.wikiquote.org" + todaysQuote.children().children().first('td').next().children().children('a').attr('href');
      const imageSrc = "https:" + todaysQuote.parent().parent().children().children('a').children('img').attr('src');

    }
  })
}


var merriamWebsterWOTD = () => {
  request('https://www.merriam-webster.com/word-of-the-day', function (err, resp, html) {
    if (!err) {
      var $ = cheerio.load(html);
      var WOTDobj = {};

      var todaysWord = $('.word-and-pronunciation h1').text();
      var wordType = $('.main-attr').text().trim();
      var pronunciation = $('.word-syllables').text().trim();

      var entireDefinitionsBox = $('.wod-definition-container').text();
      var exampleOne = $('.wod-definition-container h2:contains("Examples")').next().text();
      var exampleTwo = $('.wod-definition-container h2:contains("Examples")').next().next().text();
      var exampleChars = exampleOne.length + exampleTwo.length
      var definitionsOnly = entireDefinitionsBox.slice(35, -exampleChars -50).trim();
      var didYouKnow = $('.wod-did-you-know-container').children().next().html();

      console.log("#####################wotd#####################")
      console.log(" ---===< Word of the day:", todaysWord, "(" + wordType + ")" ,"[" + pronunciation + "] >===---");
      console.log("Definitions ====>", definitionsOnly) //You have to experiment with .slice() on different days (you could do -40, -50, etc.)
      console.log("~ ~ ~ ~ ~ ~ ~ ~ ~")
      console.log("Example 1 -->", exampleOne);
      console.log("")
      console.log("Example 2 -->", exampleTwo);
      console.log("~ ~ ~ ~ ~ ~ ~ ~ ~")
      console.log("Food for thought:", didYouKnow);
      console.log("#####################wotd#####################")

    }
  });
}


var beAGreatTeacherFOTD = () => {
  request('https://www.beagreatteacher.com/daily-fun-fact/', function (err, resp, html) {
    if (!err) {
      var $ = cheerio.load(html);
      var FACTobj = {};
      var todaysFact = $('span:contains("Random Fact of the Day:")').parent();

      var factOfTheDay = todaysFact.parent().next().text();
      var factOfTheDayBackup = todaysFact.next().text();

      // console.log("`````````````````````````````````")
      // console.log("Random fact:", factOfTheDay, factOfTheDayBackup); //One of these will work, the other won't (which is perfect, since it seems to randomly alternate)

      FACTobj.factoid = factOfTheDay + factOfTheDayBackup; //八月で正しく出来たかどうか確認しないといけないじゃん
      console.log("Full FACTobj object...", FACTobj)
      return FACTobj;
    }
  });
}

const redditTopNews = () => {
  request('https://www.reddit.com/r/news/top/', (err, resp, html) => {
    if (!err) {
      const $ = cheerio.load(html);
      const todaysTopStory = $('span.rank:contains("1")').next().next().children().first('p.title').children().first();
      const abbrevLink = todaysTopStory.children().first().next().text().trim().slice(1, -1);
      const newsTitle = todaysTopStory.children().first().text();
      const fullLink = todaysTopStory.children().attr('href');

      const commentsNumbers = todaysTopStory.next().next().text().trim().slice(0, 5).trim(); //This will potentially screw up if you have less than 1000 commenters (because it would be only 3 digits)
      const commentsLink = todaysTopStory.next().next().children().children().attr('href');

      console.log("- - - - - - - - - - - - - - - - - -");
      console.log("News Title  -->", newsTitle);
      console.log("News source -->", abbrevLink);
      console.log("Article link ->", fullLink);
      console.log("#of comments ->", commentsNumbers, "(a", typeof(commentsNumbers), ")");
      console.log("Comments link->", commentsLink);
      console.log("- - - - - - - - - - - - - - - - - -");

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
