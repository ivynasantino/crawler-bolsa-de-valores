var request = require('request');
var cheerio = require('cheerio');

var parsedResults = [];

request('https://www.neocambio.io/cotacao/euro/25-09-2018', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        
        $('.currency__wrapper').each(function(i, element){
        var a = $(this);
        var title = a.prev().text();
        var euro = a.find('h2').first().text();
        var real = a.find('h2').last().text();
        
        // Our parsed meta data object
        var metadata = {
            title: title,
            euro: euro,
            real: real
            
        };
        // Push meta-data into parsedResults array
        parsedResults.push(metadata);
        });
        
        // Log our finished parse results in the terminal
        console.log(parsedResults);
        //var json = JSON.stringify(parsedResults);
        //console.log(json);
    }
});

