var right = 0;
var wrong = 0;
var questioncount = 2;
var sentence;
//sätter en random corpus
function setRandomCorpus() {
    var corpuses = ["FAMILJELIV-ADOPTION", "FAMILJELIV-ALLMANNA-EKONOMI",
                    "FAMILJELIV-ALLMANNA-FAMILJELIV", "FAMILJELIV-ALLMANNA-FRITID",
                    "FAMILJELIV-ALLMANNA-HUSDJUR", "FAMILJELIV-ALLMANNA-HUSHEM",
                    "FAMILJELIV-ALLMANNA-KROPP", "FAMILJELIV-ALLMANNA-NOJE",
                    "FAMILJELIV-ALLMANNA-SAMHALLE", "FAMILJELIV-ALLMANNA-SANDLADAN",
                    "FAMILJELIV-ANGLARUM", "FAMILJELIV-EXPERT", "FAMILJELIV-FORALDER",
                    "FAMILJELIV-GRAVID", "FAMILJELIV-KANSLIGA", "FAMILJELIV-MEDLEM-ALLMANNA",
                    "FAMILJELIV-MEDLEM-FORALDRAR", "FAMILJELIV-MEDLEM-PLANERARBARN",
                    "FAMILJELIV-MEDLEM-VANTARBARN", "FAMILJELIV-PAPPAGRUPP",
                    "FAMILJELIV-PLANERARBARN", "FAMILJELIV-SEXSAMLEVNAD",
                    "FAMILJELIV-SVARTATTFABARN", "FLASHBACK-DATOR", "FLASHBACK-DROGER",
                    "FLASHBACK-EKONOMI", "FLASHBACK-FLASHBACK", "FLASHBACK-FORDON",
                    "FLASHBACK-HEM", "FLASHBACK-KULTUR", "FLASHBACK-LIVSSTIL", "FLASHBACK-MAT",
                    "FLASHBACK-OVRIGT", "FLASHBACK-POLITIK", "FLASHBACK-RESOR",
                    "FLASHBACK-SAMHALLE", "FLASHBACK-SEX", "FLASHBACK-SPORT"]
    var index = Math.floor(Math.random() * corpuses.length)
    return corpuses[index];
}
//sätter sätter en random mening och stoppar in nya i preloaded.js
function setRandomSentence() {
    var index = Math.floor(Math.random() * preloaded.length)
    corpus = preloaded[index].f;
    sentence = preloaded[index].s;
    $("#question").text(sentence);
    preloaded.splice(index, 1);
    var newcorpus = setRandomCorpus();
    var url = "https://spraakbanken.gu.se/ws/korp?command=query_sample&cqp=%5B%5D&start=0&end=0&defaultcontext=1+sentence&corpus=" + newcorpus;

    $.getJSON(url, function (data) {
        var ord = data.kwic[0].tokens;
        var mening = "";
        for (i = 0; i < ord.length; i++) {
            mening = mening + " " + ord[i].word;
        }
        preloaded.push({
            'f': newcorpus,
            's': mening
        });
        console.log(mening);
    });



    return sentence;
}
var corpus = setRandomCorpus();
var sentence = setRandomSentence();
//laddar upp texten när sidan laddas
$(document).ready(function () {
    $("#question").text(sentence);
    $(".familjelivimg").click(function () {
        check("FAMILJE");
        $("#question").text(sentence);
    });
    $(".flashbackimg").click(function () {
        check("FLASH");
        $("#question").text(sentence);
    });
});
//funktion som kollar om svaret är rätt eller fel samt uppdaterar progressbaren
function check(val) {
    if (corpus.startsWith(val)) {
        right++;
        if ((right + wrong) > 0) {
            max = right / (right + wrong) * 100;
            myApp.setProgressbar(".progressbar", max, 500);
        }
        $("#righttext").html(right);
        corpus = setRandomCorpus();
        updateQuestionCount();
        sentence = setRandomSentence();
    } else {
        wrong++;
        if ((right + wrong) > 0) {
            max = right / (right + wrong) * 100;
            myApp.setProgressbar(".progressbar", max, 500);
        }
        $("#wrongtext").html(wrong);
        corpus = setRandomCorpus();
        updateQuestionCount();
        sentence = setRandomSentence();
    }
}
//en funktion som uppdaterar nummer på fråga och ger en alert
function updateQuestionCount() {
    $("#questioncount").html("Fråga " + questioncount);
    questioncount++;
    if (questioncount > 11) {
        app.modal({
            title: 'Bra jobbat!',
            text: 'Du gissade rätt ' + right + ' av 10. Vill du spela igen?',
            buttons: [
                {
                    text: 'Ja',
                    onClick: function () {
                        restart();
                    }
      },
                {
                    text: 'Nej',
                    onClick: function () {
                        app.modal({
                            title: "Tack!",
                            text: "Tack för att du spelade!",
                            buttons: [
                                {
                                    text: "OK",
                                    onClick: function () {
                                        window.location.replace("index.html");
                                    }
                    }
                ]
                        })
                    }
      },
    ]
        })


    }
}

function restart() {
    right = 0;
    wrong = 0;
    questioncount = 1;
    corpus = setRandomCorpus();
    $("#question").text(corpus);
    $("#righttext").html(right);
    $("#wrongtext").html(wrong);
    updateQuestionCount();
    sentence = setRandomSentence();
    myApp.setProgressbar(".progressbar", 0, 500);
}