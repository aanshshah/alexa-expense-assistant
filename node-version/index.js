var alexa = require('alexa-app');

var app = new alexa.app();

app.launch(function(request, response)) {
	response.say("Welcome to expense assistant! Tell Alexa about your expenses and she will keep track of them!");
	response.shouldEndSession(false, "What have you spent? For examples say help. To leave expense assistant, say exit")
});

app.intent('HelpIntent',
{
	"slots": {},
	"utterances": [
		"help"
	]
},
	function (request, response){
		response.say("You can say something like I spent ten dollars on cheese today")
	}
);

app.intent('AskIntent',
{
	"slots": {"DOLLARS": "LITERAL",
				"OCCASION": "LITERAL"
			},
	"utterances": [
		"I spent {dollars|DOLLARS} on {occasion|OCCASION}"
	]
},
function (request, response) {
        console.log ("[AskIntent]");
        lookup(response, process_title(request.slot("DOLLARS")), process_title(request.slot("OCCASION")))
        // lookup_movie (response, process_title (request.slot('TITLE')), 'ratings');
        return false;
    }
	);

function process_title (movie_title)
{
    var AmbiguousMovies = require('AmbiguousMovies');

    console.log ("  title before: " + movie_title);

    movie_title = WordsToNumber (movie_title, true);

    console.log ("  title after: " + movie_title);

    return movie_title;
}

function lookup(response, dollar, occasion){

            var response_text = "You spent" + dollar + "on" + occasion;
            var card_title = occasion;
            var card_text = response_text;

            response.say (response_text);
            response.card (card_title, card_text);
            response.send ();
        }

exports.handler = app.lambda();

if ((process.argv.length === 3)&& (process.argv[2] === 'schema'))
{
	console.log(app.schema());
	console.log(app.utterances());
}