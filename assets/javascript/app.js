var game = {
	numOfQuestionsCorrectlyAnswered: 0,
	numOfQuestionsIncorrectlyAnswered: 0,
	chosenQuestion: 1,
	questionsAlreadyAnsweredIndices: [],
	questions: [
		"Which quarterback has won 4 Superbowl Titles?" ,
		"What is Steph Curry's record for most made 3-pointers in a season?",
		"Who is the longest tenured Sharks player in franchise history?"
	],
	answers: [
		["Joe Montana.cor" , "Steve Young" , "Colin Kaepernick" , "Jeff Garcia"],
		["272" , "324" , "402.cor" , "410"],
		["Patrick Marleau.cor" , "Joe Thorton" , "Joe Pavelski" , "Marc-Edouard Vlasic"]
	],
	gifs: [
		"joeM.gif", 
		"stephC.gif", 
		"patrickM.gif"
	],
	randomNumGenerator: function(max , min) {
		return Math.floor(Math.random() * (max - min) + min);
	},
	chosenQuestionFx: function() {
		this.chosenQuestion = this.randomNumGenerator(this.questions.length, 0);
	},
	correctAnswerExtPopOff: function(correctAnswer) {
		return correctAnswer.slice(0, correctAnswer.lastIndexOf("."));
	},
	questionAnsweredTimer: function() {

	},
	intervalId: 0,
	//prevents the clock from being sped up unnecessarily
	clockRunning: false,
	//  Our stopwatch object.
	stopwatch: {
	  time: 30,
	  reset: function() {
	    game.stopwatch.time = 30;
	    //  TODO: Change the "display" div to "00:00."
	    $("#display").text(game.stopwatch.time);
	  },
	  start: function() {
	      //  TODO: Use setInterval to start the count here and set the clock to running.
	      if (!game.clockRunning) {
	        game.intervalId = setInterval(function() {
	        game.stopwatch.count();
	        game.clockRunning = true;
	        }, 1000);
	      }
	  },
	  stop: function() {
	    //  TODO: Use clearInterval to stop the count here and set the clock to not be running.
	    clearInterval(game.intervalId);
	    game.clockRunning = false;
	  },
	  count: function() {
	    //  TODO: increment time by 1, remember we cant use "this" here.
	    game.stopwatch.time--;
	    //  TODO: Get the current time, pass that into the stopwatch.timeConverter function,
	    //        and save the result in a variable.
	    var currentTime = game.stopwatch.timeConverter(game.stopwatch.time);
	    //  TODO: Use the variable you just created to show the converted time in the "display" div.
	    $("#display").text(currentTime);
	  },
	  timeConverter: function(t) {
	    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
	    var minutes = Math.floor(t / 60);
	    var seconds = t - (minutes * 60);
	    if (seconds < 10) {
	      seconds = "0" + seconds;
	    };
	    if (minutes === 0) {
	      minutes = "00";
	    }
	    else if (minutes < 10) {
	      minutes = "0" + minutes;
	    };
	    return minutes + ":" + seconds;
	  }
	}
}

//Dom Manipulation Object

var ui = {
	//Page Start
	newQuestion: function(){
		$(".mainContent").empty();
		game.chosenQuestionFx();
		this.otherDiv("div", "Time Remaining: " + game.stopwatch.time + " Seconds", "timer mainBodyDiv", ".mainContent");
		game.stopwatch.start();
		this.otherDiv("div", game.questions[game.chosenQuestion], "currentQuestion mainBodyDiv", ".mainContent");
		$("<div>")
			.addClass("answersBox")
			.appendTo(".mainContent");
		for (var i = 0; i < 4; i++) {
			this.answerDiv("div", game.answers[game.chosenQuestion][i],"answer mainBodyDiv", ".answersBox");
		};
	},
	otherDiv: function(elementType, htmlText, classesAdded, parentElement) {
		$("<" + elementType + ">")
			.html(htmlText)
			.addClass(classesAdded)
			.appendTo(parentElement)
	},
	answerDiv: function(elementType, htmlText, classesAdded, parentElement) {
		if (htmlText.indexOf(".cor") !== -1){
			htmlText = game.correctAnswerExtPopOff(htmlText);
			classesAdded = classesAdded + " correctAnswer";
		};
		$("<" + elementType + ">")
			.html(htmlText)
			.addClass(classesAdded)
			.appendTo(parentElement)
			.on("click", function() {
				ui.questionAnswered(this);
			});
	},
	questionAnswered: function(object) {
		console.log(object);
		$(".answersBox").empty();
		game.stopwatch.stop();
		// game.stopwatch
		if ($(object).hasClass("correctAnswer")){
			$(".currentQuestion")
				.html("Correct");
		}
		else {
			$(".currentQuestion")
				.html("Nope");
		}
	}
}


$(document).ready(function(){
	//Start Button
	$(".startBtn").on("click", function(){
		ui.newQuestion();
	});
});