"use strict";
var Alexa = require("alexa-sdk");

var TwitterHelper = require('./twitter_helper.js');



const byesayings = ['Bye, see you soon', 'Okay, bye', 'Great to help you, bye', 'have a good day', 'Okay, hope to see you soon', 'Visit again, bye', 'glad to help you, bye'];
const greetings = ['Hello, Welcome to Blood Donor, I will help you to know your blood type in planning your future', 'Welcome, to Blood donor here you will get the facts regarding your blood group'];

var handlers = {
    'LaunchRequest': function () {

        

        const speechOutput = 'Hello world!';
        const repromptSpeech = 'Hello again!';
        const cardTitle = 'Blood Donor Twitter Linking';
        const cardContent = 'Link your Twitter Account';
        
        this.response.speak(randomgreet(greetings) + ` <break time = "1s" />Please first select a Blood Group. If you are in a need of a blood then just say Twit and i will post it in your twitter account`)
            .listen("say something, for example:A positive")
            .shouldEndSession(false);
        this.emit(':responseReady');

        if (!this.event.session.user.accessToken || this.event.session.user.accessToken == null || this.event.session.user.accessToken == undefined || this.event.session.user.accessToken === "") {
            this.emit(':tellWithLinkAccountCard', 'You need to link your Twitter account to use the tweet feature. Link your account from the card in the app or ask for project ideas.');
        }
        else
            this.emit(':askWithCard', speechOutput, speechOutput, cardTitle, cardContent);
    },
    'AMAZON.StopIntent': function () {
        this.response.speak('Ok, see you again soon.');
        this.emit(':responseReady');
    },




    'bloodIntent': function () {
        //   let conStat = this.event.request.intent.slots.language.confirmationStatus;
        let statusCode = this.event.request.intent.slots.group.resolutions.resolutionsPerAuthority[0].status.code;

        if (!this.event.request.intent.slots.group.value) {
            this.response.speak(`sorry, i didn't get it. try again and be more specific and use one or two words if possible`).listen(`say something for example: A positive or just say "help"`).shouldEndSession(false);
            this.emit(':responseReady');
        }

        else {
            let statusCode = this.event.request.intent.slots.group.resolutions.resolutionsPerAuthority[0].status.code;

            if (statusCode == 'ER_SUCCESS_NO_MATCH') {
                this.response.speak(`sorry, i didn't get it. try again and be more specific`).listen(`say something for example: A positive or just say "help"`).shouldEndSession(false);
                this.emit(':responseReady');
            }
            else {
                var slot = this.event.request.intent.slots.group.resolutions.resolutionsPerAuthority[0].values[0].value.id.toLowerCase();
                let statusCode = this.event.request.intent.slots.group.resolutions.resolutionsPerAuthority[0].status.code;

                if (slot == 'aplus') {
                    this.attributes.groupSelected = 'A+';
                    this.response.speak(`You Know 34% of people are A+, making it the second most common blood type.
                            A+ platelets are always high in demand for patients undergoing chemotherapy.   People having A+ can give red blood cells to other A+ and A B + recipients.  Those with A+ can only receive red blood cells from A or O blood types <break time = "1s" />if you are in a need of this blood group just say tweet and i will tweet it in your linked twitter account or try for another blood group`).listen(`say something for example: A positive or just say "help"`).shouldEndSession(false);
                    this.emit(':responseReady');
                    
                }
                else if (slot == 'aminus') {
                    this.attributes.groupSelected = 'A-';
                    this.response.speak(`A Negative blood is typically transfused quickly because of the community’s need and known as a special donor,
                            so it’s constantly in demand. Only 1 in 16 people have A Negative blood.
                            A Negative can give red blood cells to other A Negative as well as A+, AB+ and AB- recipients. Those with A Negative can only receive blood from A Negative or O Negative blood types <break time = "1s" /> if you are in a need of this blood group just say tweet and i will tweet it in your linked twitter account or try for another blood group`).listen(`say something for example:A positive or just say "help"`).shouldEndSession(false);
                    this.emit(':responseReady');
    
                }
                else if (slot == 'bplus') {
                    this.attributes.groupSelected = 'B+';
                    this.response.speak(`Only 1 in every 12 people of the population has B+ blood. B+ blood is always in
                            high demand and can help patients with many medical and surgical conditions.  B+ can give red blood cells to other B+ and AB+ recipients  Those with B+ can only receive red blood cells from B or O blood types. Since various types of B+ donations are useful, donations are important. Only 8% of the population has B+ blood <break time = "1s" /> if you are in a need of this blood group just say tweet and i will tweet it in your linked twitter account or try for another blood group`).listen(`say something for example: A positive or just say "help"`).shouldEndSession(false);
                    this.emit(':responseReady');
                }
                else if (slot == 'bminus') {
                    this.attributes.groupSelected = 'B-';
                    this.response.speak(`B- is only found in 1 in every 61 people, making it extremely rare.
                            Every two seconds, someone needs blood, so B Negative is in high demand constantly. B Negative can give red blood cells to other B+, B Negative, A B+ and A B Negative. Those with B- can only receive red blood cells from B Negative or O Negative blood types.
                            B Negative is only found in less than 2% of the population, making it an incredibly important blood type to have on the shelves <break time = "1s" />if you are in a need of this blood group just say tweet and i will tweet it in your linked twitter account or try for another blood group`).listen(`say something for example:A positive or just say "help"`).shouldEndSession(false);
                    this.emit(':responseReady');
                }
                else if (slot == 'oplus') {
                    this.attributes.groupSelected = 'O+';
                    this.response.speak(`38% of people are O+, making it the most common blood type. O+ red blood cells
                            can be transfused to any positive blood types, so it’s still one of the most in-demand blood types. O+ can give red blood cells to any positive blood types. Those with O+ can only receive red cells from O+ or O negative donors  <break time = "1s" />if you are in a need of this blood group just say tweet and i will tweet it in your linked twitter account or try for another blood group`).listen(`say something for example: A positive or just say "help"`).shouldEndSession(false);
                    this.emit(':responseReady');
                }
                else if (slot == 'ominus') {
                    this.attributes.groupSelected = 'O-';
                    this.response.speak(`The “universal red cell donor,” the O- blood type occurs in 1 of every 15 people
                            and is the only blood type that is able to give red cells to all other blood types .. Those with O negative can only receive from other O negative donors.  O- blood type is the universal red blood cell donor because their red blood cells can be transfused into any patient, regardless of blood type. O- red cells must be used for trauma situations and other emergencies when the patient’s blood type is not known. O- red cells are also frequently used for babies and sickle cell anemia patients.  O minus makes up only 6.6% of the population, found in just 1 of every 15 people.<break time = "1s" />if you are in a need of this blood group just say tweet and i will tweet it in your linked twitter account or try for another blod group`).listen(`say something for example: A positive or just say "help"`).shouldEndSession(false);
                    this.emit(':responseReady');
                }
                else if (slot == 'abplus') {
                    this.attributes.groupSelected = 'AB+';
                    this.response.speak(`Only 1 in every 29 people of the population have AB+ blood. A B+ is the universal
                            recipient and the universal plasma donor, making it a very important blood type.  A B+ can only give red blood cells to other AB+ blood types  Those with AB+ can receive red blood cells from all blood types. Type AB donors can donate plasma and platelets to all blood types<break time = "1s" /> if you are in a need of this blood group just say tweet and i will tweet it in your linked twitter account or try for another blood group`).listen(`say something for example:A positive or just say "help"`).shouldEndSession(false);
                    this.emit(':responseReady');
                }
                else if (slot == 'abminus') {
                    this.attributes.groupSelected = 'AB-';
                    this.response.speak(`A B negative is only found in 1 of every 167 people, making it the rarest blood type there
                            is. A B Negative patients can receive red blood cells from all negative blood types. A B negative can give red blood cells to both AB- and AB+ blood types. A B Negative can give platelets or plasma to a patient of any blood type. Those with A B Negative can receive red blood cells from all negative blood types. ith A B Negative can receive red blood cells from all negative blood types. <break time = "1s" />if you are in a need of this blood group just say tweet and i will tweet it in your linked twitter account or try for another blood group`).listen(`say something for example: A positive or just say "help"`).shouldEndSession(false);
                    this.emit(':responseReady');
                }
    
                else {
                    this.response.speak(`sorry, i didn't get it. try again and be more specific`).listen(`say something for example:A+ or just say "help"`).shouldEndSession(false);
                    this.emit(':responseReady');
                }                
            }

        }
        
    },

    'Unhandled': function () {
        this.response.speak(`Sorry, I didn't get it. Please try again or ask for help`).shouldEndSession(false);
        this.emit(':responseReady');
    },

    'AMAZON.CancelIntent': function () {


        this.response.speak(randomPhrase(byesayings))
            .listen("say something, for example:A+ or ab+")
            .shouldEndSession(true);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {


        this.response.speak(randomPhrase(byesayings))
            .listen("say something, for example:A+ or ab+")
            .shouldEndSession(true);
        this.emit(':responseReady');
    },

    'AMAZON.HelpIntent': function () {
        const speechOutput = 'Hello world!';
        const repromptSpeech = 'Hello again!';
        this.response.speak(`Here you can get the details of Blood group like to whom you should donate and from whom should you receive a blood. just choose The blood group and follow the instructions. <say-as interpret-as="interjection">simple</say-as>`)
            .listen("say something, for example:a positive or o negative")     
        this.emit(':responseReady');
    },
    'startOverIntent': function () {
        this.emit('LaunchRequest');

    },
    'TweetIntent': function () {
        //console.log(this.event.session.user.accessToken);

        //let state=this.attributes.groupSelected
        const speechOutput = 'Your Tweet for Blood Group has been posted on your Linked Twitter Account ';
        var ref = this;


        if (!this.event.session.user.accessToken || this.event.session.user.accessToken == null || this.event.session.user.accessToken == undefined || this.event.session.user.accessToken === "") {
            this.emit(':tellWithLinkAccountCard', 'You need to link your Twitter account to use the tweet feature. Link your account from the card in the app.');
        }
        else {
            let twitterHelper = new TwitterHelper(this.event.session.user.accessToken);

            let state=this.attributes.groupSelected;
            
            Promise.resolve(twitterHelper.postTweet(' I am in a need of '+state+' Blood group.  @Tweeted_via_Blood_Donor')).then(function(status){
                ref.emit(':tell',speechOutput);
            });
        }
    }
}


exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = "amzn1.ask.skill.6d1e5554-e888-40c2-9f06-bdc362486788";
    alexa.registerHandlers(handlers);
    alexa.execute();
};

function randomPhrase(myData) {
    var i = 0;
    i = Math.floor(Math.random() * myData.length);
    return (myData[i]);
}

function randomgreet(myData) {
    var i = 0;
    i = Math.floor(Math.random() * myData.length);
    return (myData[i]);
}








