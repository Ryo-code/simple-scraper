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

      console.log("Quote of the Day...");
      console.log("");
      console.log(actualQuote);
      console.log("");
      console.log(quotedBy);

    }
  })
}



var merriamWebster = () => {
  request('https://www.merriam-webster.com/word-of-the-day', function (err, resp, html) {
  // request('https://www.merriam-webster.com/word-of-the-day/reciprocate-2017-04-17', (err, resp, html) => {
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
      var definitionsOnly = entireDefinitionsBox.slice(35, -exampleChars -40).trim();
      var didYouKnow = $('.wod-did-you-know-container').children().next().text();

      console.log("Word of the day:", todaysWord, "(" + wordType + ")" ,"[" + pronunciation + "]");
      console.log("~ ~ ~ ~ ~ ~ ~ ~ ~")
      console.log(definitionsOnly) //You have to experiment with .slice() on different days (you could do -40, -50, etc.)
      console.log("~ ~ ~ ~ ~ ~ ~ ~ ~")
      console.log("Example 1 -->", exampleOne); //DONE!
      console.log("")
      console.log("Example 2 -->", exampleTwo); //DONE!
      console.log("- - - - - - - - - - - - - - - - - - - - ")
      console.log("Food for thought:", didYouKnow); //DONE!!! (though there are no italics)

      // console.log("Definitions---->", entireDefinitionsBox)

    }//idiom of the day?
  });
}

// var dictionaryCrossReference = () => {
//   request('www.dictionary.com/browse/' + todaysWord, function (err, resp, html) {
//     if (!err) {
//       var $ = cheerio.load(html);
//       var defList = $('def-list').text() 
//       console.log("Definition list:", defList);
//     }
//   });
// }

var factOfTheDay = () => {
  request('https://www.beagreatteacher.com/daily-fun-fact/', function (err, resp, html) {
    if (!err) {
      var $ = cheerio.load(html);
      var factOfTheDay = $('span:contains("Random Fact of the Day:")').parent().next().text() //It's weird because of the way their HTML is structured
      console.log("Random fact:", factOfTheDay);
    }
  });
}

merriamWebster();
// factOfTheDay();
// quoteOfTheDay();

