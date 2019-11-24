/* alexa refined skills based on draw.io. */
// First


const alexaSDK = require('alexa-sdk');
const awsSDK = require('aws-sdk');
const { promisify } = require('es6-promisify');

const appId = 'amzn1.ask.skill.670219dd-3f02-4117-82e0-e6eb1db8eb86';
const patientTable = 'Hospital';
const docClient = new awsSDK.DynamoDB.DocumentClient();

// convert callback style functions to promises
// const dbScan = promisify(docClient.scan, docClient);
// const dbGet = promisify(docClient.get, docClient);
// const dbPut = promisify(docClient.put, docClient);
// const dbDelete = promisify(docClient.delete, docClient);

const instructions = `Welcome to Dr GauthamDas Neuro Centre , Where We train strenghten and rehabilitate  the mind body interaction.`;

const handlers = {

    /**
     *  It will be Triggered
     * when the user says "Alexa, open neuro centre"
     */
    'LaunchRequest'() {
        this.emit(':ask', instructions);
    },

    'AddPatientIntent'() {
        const { userId } = this.event.session.user;
        const { slots } = this.event.request.intent;

        // prompt for slot values and request a confirmation for each

        //PatientName
        if (!slots.PatientName.value) {
            const slotToElicit = 'PatientName'
            const speechOutput = 'Chalo let play buddy , may i know you name please I dont wanna sound generic you see also provide me your number just in case want to keep your mental health updated?'
            const repromptSpeech = 'Please tell me the name and number';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        else if ((slots.PatientName.confirmationStatus !== 'CONFIRMED')) {
            if (slots.PatientName.confirmationStatus !== 'DENIED') {
                // slot status: unconfirmed
                const slotToConfirm = 'PatientName';
                const speechOutput = `The name of the patient is ${slots.PatientName.value}, correct?`
                const repromptSpeech = speechOutput;
                return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
            }

            // slot status: denied -> reprompt for slot data
            const slotToElicit = 'PatientName';
            const speechOutput = 'What is the name of urs?'
            const repromptSpeech = 'Please tell me the name of urs';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }

        //PatientNumber
        if (!slots.PatientNumber.value) {
            const slotToElicit = 'PatientNumber';
            const speechOutput = 'what is the mobile number of urs?'
            const repromptSpeech = 'Please tell me the mobile number of urs'
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        else if (slots.PatientNumber.confirmationStatus !== 'CONFIRMED') {
            if (slots.PatientNumber.confirmationStatus !== 'DENIED') {
                //slot status: unconfirmed
                const slotToConfirm = 'PatientNumber';
                const speechOutput = `The Mobile Number is ${slots.PatientNumber.value}, correct?`;
                const repromptSpeech = speechOutput;
                return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
            }

            // slot status: denited -> reprompt for slot data
            const slotToElicit = 'PatientNumber';
            const speechOutput = 'What is the mobile number of urs?'
            const repromptSpeech = 'Please tell me the mobile number of urs';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }

        let beginMsg = `Hi ${slots.PatientName.value}. Contrary to many thinking that mental illness is so depressing and very diffcult to handle , we can rewire the thought process and continue to remain calm in the visititutes of life. `
        this.emit(':tell', beginMsg);

        // Sport's Name 

        if (!slots.Sports.value) {
            const slotToElicit = 'Sports';
            const speechOutput = 'Lets see , tell me what sport would you love to play?'
            const repromptSpeech = 'Please tell me the sport of urs'
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        else if (slots.Sports.confirmationStatus !== 'CONFIRMED') {
            if (slots.Sports.confirmationStatus !== 'DENIED') {
                //slot status: unconfirmed
                const slotToConfirm = 'Sports';
                const speechOutput = `The Sport Name is ${slots.Sports.value}, correct?`;
                const repromptSpeech = speechOutput;
                return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
            }

            // slot status: denited -> reprompt for slot data
            const slotToElicit = 'Sports';
            const speechOutput = 'Lets see , tell me what sport would you love to play?';
            const repromptSpeech = 'Please tell me the sport of urs';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        
        if (slots.Sports.value) {
            const slotToConfirm = 'Sports';
            const speechOutput = `${slots.PatientName.value} can you imagine playing it right now?? background music for like 20 seccond`;
            const repromptSpeech = speechOutput;
            return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
        }


        //Description 1
        // if (!slots.PatientNumber.value) {
        //     const slotToElicit = 'PatientNumber';
        //     const speechOutput = 'what is the mobile number of urs?'
        //     const repromptSpeech = 'Please tell me the mobile number of urs'
        //     return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        // }
        // else if (slots.PatientNumber.confirmationStatus !== 'CONFIRMED') {
        //     if (slots.PatientNumber.confirmationStatus !== 'DENIED') {
        //         //slot status: unconfirmed
        //         const slotToConfirm = 'PatientNumber';
        //         const speechOutput = `The Mobile Number is ${slots.PatientNumber.value}, correct?`;
        //         const repromptSpeech = speechOutput;
        //         return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
        //     }

        //     // slot status: denited -> reprompt for slot data
        //     const slotToElicit = 'PatientNumber';
        //     const speechOutput = 'What is the mobile number of urs?'
        //     const repromptSpeech = 'Please tell me the mobile number of urs';
        //     return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        // }


        const name = slots.PatientName.value;
        const mobile_number = slots.PatientNumber.value;
        const dynamoParams = {
            TableName: patientTable,
            Item: {
                Name: name,
                UserId: userId,
                MobileNumber: mobile_number
            }
        };

        const checkIfPatientExists = {
            TableName: patientTable,
            Key: {
                Name: name,
                UserId: userId
            }
        };

        console.log('Attempting to add patient', dynamoParams);

        docClient.get(checkIfPatientExists).promise()
            .then(data => {
                console.log('Get patient succeeded', data);

                const patient = data.Item;

                if (patient) {
                    const errorMsg = `Patient ${name} already exists!`;
                    this.emit(':tell', errorMsg);
                    throw new Error(errorMsg);
                }
                else {
                    // no match, add the patient
                    return docClient.put(dynamoParams).promise();
                }
            })
            .then(data => {
                console.log('Add patient succeded', data);

                this.emit(':tell', `Patient ${name} added!`);
            })
            .catch(err => {
                console.error(err);
            });

    },
    'Unhandled'() {
        console.error('problem', this.event);
        this.emit(':ask', 'An unhandled problem occurred!');
    },

    'AMAZON.HelpIntent'() {
        const speechOutput = instructions;
        const reprompt = instructions;
        this.emit(':ask', speechOutput, reprompt);
    },

    'AMAZON.CancelIntent'() {
        this.emit(':tell', 'Goodbye!');
    },

    'AMAZON.StopIntent'() {
        this.emit(':tell', 'Goodbye!');
    }
};

exports.handler = function handler(event, context) {
    const alexa = alexaSDK.handler(event, context);
    alexa.APP_ID = appId;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
