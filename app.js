'use strict';
var request = require('request');
var cheerio = require('cheerio');
var rp = require('request-promise'); //使うかどうか分からない

var wiktionaryWOTD = () => {
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
      console.log(quotedBy)

    }
  })
}

wiktionaryWOTD();


var merriamWebster = () => {
  request('https://www.merriam-webster.com/word-of-the-day', function (err, resp, html) {
  // request('https://www.merriam-webster.com/word-of-the-day/reciprocate-2017-04-17', (err, resp, html) => {
    if (!err) {
      var $ = cheerio.load(html);
      var todaysWord = $('.word-and-pronunciation h1').text();
      var wordType = $('.main-attr').text().trim();
      var pronuciation = $('.word-syllables').text().trim();

      var defs = $('.wod-definition-container').text();

      var beforeExamples = defs.split("Examples")

      // var defSplits = defs.split(":");
      // // var noLines = defSplits.split("/n");
      // var onlyDefs = [];
      // for(var i = 0; i < defSplits.length; i++){
      //   if(defSplits[i].length > 4){
      //     onlyDefs.push(defSplits[i]);
      //   }
      // }

      console.log("word of the day:", todaysWord, "(" + wordType + ")");
      console.log("Pronunciation:", pronuciation);
      console.log("Definitions:", defs, "...which is a", typeof(defs));

      // console.log("defSplits:", defSplits.length, defSplits);
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
      // console.log("onlyDefs:", onlyDefs);
      console.log("beforeExamples --->", beforeExamples.length, beforeExamples)

    }
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
      var factOfTheDay = $('span:contains("Random Fact of the Day:")').parent().parent().next().text() //It's weird because of the way their HTML is structured
      console.log("Random fact:", factOfTheDay);
    }
  });
}

// merriamWebster();
// factOfTheDay();
