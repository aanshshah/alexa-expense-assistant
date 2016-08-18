var alexa = require('alexa-app');

var app = new alexa.app();

app.launch(function(request, response)) {
	response.say("Welcome to quizlet! Alexa will quiz you on a quizlet!");
	response.shouldEndSession(false, "What would you like to know? For examples say help. To leave quizlet, say exit")
});

exports.handler = app.lambda();

if ((process.argv.length === 3)&& (process.argv[2] === 'schema'))
{
	console.log(app.schema());
	console.log(app.utterances());
}

app.intent('HelpIntent',
{
	"slots": {},
	"utterances": [
		"help"
	]
},
	function (request, response){
		response.say("You can say something like quiz me on coral reefs")
	}
);

app.intent('AskIntent',
{
	"slots": {"TITLE": "LITERAL"},
	"utterances": [
		"quiz me on "
		"{for|what is|what's the rating {for|of} {the movie |} {movie_names|TITLE}",
		"{for|what are|what're} {the |}ratings {for|of} {the movie |}{movie_names|TITLE}"
	]
},
function (request, response) {
        console.log ("[RatingsIntent]");
        lookup_movie (response, process_title (request.slot('TITLE')), 'ratings');
        return false;
    }
	);