/* alexa refined skills based on draw.io. */

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

        // if (!slots.Description.value) {
        //     let slotToConfirm = "Description"
        //     let beginMsg = `Hi ${slots.PatientName.value}. Contrary to many thinking that mental illness is so depressing and very diffcult to handle , we can rewire the thought process and continue to remain calm in the visititutes of life. `
        //     return this.emit(':confirmSlot', slotToConfirm, beginMsg, beginMsg);
        // }

        // Sport's Name 

        // if (!slots.Sports.value) {
        //     const slotToElicit = 'Sports';
        //     const speechOutput = 'Lets see , tell me what sport would you love to play?'
        //     const repromptSpeech = 'Please tell me the sport of urs'
        //     return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        // }
        // else if (slots.Sports.confirmationStatus !== 'CONFIRMED') {
        //     if (slots.Sports.confirmationStatus !== 'DENIED') {
        //         //slot status: unconfirmed
        //         const slotToConfirm = 'Sports';
        //         const speechOutput = `The Sport Name is ${slots.Sports.value}, correct?`;
        //         const repromptSpeech = speechOutput;
        //         return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
        //     }

        //     // slot status: denited -> reprompt for slot data
        //     const slotToElicit = 'Sports';
        //     const speechOutput = 'Lets see , tell me what sport would you love to play?';
        //     const repromptSpeech = 'Please tell me the sport of urs';
        //     return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        // }

        // if (slots.Sports.value) {
        //     const slotToConfirm = 'Sports';
        //     const speechOut       put = `${slots.PatientName.value} can you imagine playing it right now?? background music for like 20 seccond`;
        //     const repromptSpeech = speechOutput;
        //     return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
        // }


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
        const sports = slots.Sports.value;
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

                this.emit(':tell', `Patient ${name} added! Please say, ask neuro centre welcome`);
            })
            .catch(err => {
                console.error(err);
            });

    },

    'WelcomeIntent'() {
        console.log("welcome Intent trigered.....");
        const params = {
            TableName: patientTable
        }
        console.log(params);

        docClient.scan(params).promise().then(data => {
            console.log('patient succeeded', data);
            console.log(data.Items);
            console.log(data.Items.length)
            let count = data.Items.length;

            const welcomeSpeech = `Hi ${data.Items[count-1].Name} . Contrary to many thinking that mental illness is so depressing and very diffcult to handle , we can rewire the thought process and continue to remain calm in the visititutes of life.  over the course i will be walking you through the myth and reality as well for you to better understand .`
            this.emit(':tell', welcomeSpeech);
        })

    },

    'ProceedIntent'() {
        const proceedSpeech = 'Lets play a small game called whats in front of me.. ... For the next 1 min i want you to describe each and everything that you may see hear or feel.. like i see a black TV i see this man with a big moustache i see this and i see that.. Dont worry I will keep a tab of the time.'
        this.emit(':tell', proceedSpeech)
    },

    'SkillIntent'() {
        const { slots } = this.event.request.intent;
        // prompt for slot values and request a confirmation for each

        //QuestionAnswer
        if (!slots.QuestionAnswer.value) {
            const slotToElicit = 'QuestionAnswer'
            const speechOutput = 'chal here we go.... Do you have any questions before we can start?'
            const repromptSpeech = 'Please ask me any if u ask any question';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        else if ((slots.QuestionAnswer.confirmationStatus !== 'CONFIRMED')) {
            if (slots.QuestionAnswer.confirmationStatus !== 'DENIED') {
                // slot status: unconfirmed
                const slotToConfirm = 'QuestionAnswer';
                const speechOutput = `Have u answered correctly?`
                const repromptSpeech = speechOutput;
                return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
            }

            // slot status: denied -> reprompt for slot data
            const slotToElicit = 'QuestionAnswer';
            const speechOutput = 'chal here we go.... Do you have any questions before we can start?'
            const repromptSpeech = 'Please answer my question, then only i can judge you?';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }

        if (!slots.Sleep.value) {
            const slotToElicit = 'Sleep'
            const speechOutput = 'Its been observed that most of the the stress and anixiety related issues are better dealt with proper sleep. Given the constaint how long do you sleep on  an average every single day?'
            const repromptSpeech = 'Please tell me how long you will sleep?';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        else if ((slots.Sleep.confirmationStatus !== 'CONFIRMED')) {
            if (slots.Sleep.confirmationStatus !== 'DENIED') {
                // slot status: unconfirmed
                const slotToConfirm = 'Sleep';
                const speechOutput = `Have u told your sleeping hours?`
                const repromptSpeech = speechOutput;
                return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
            }

            // slot status: denied -> reprompt for slot data
            const slotToElicit = 'Sleep';
            const speechOutput = 'Its been observed that most of the the stress and anixiety related issues are better dealt with proper sleep. Given the constaint how long do you sleep on  an average every single day?'
            const repromptSpeech = 'Please tell me how long you will sleep?';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }

        // sleep quality check.......
        if (!slots.MentalScale.value) {
            const slotToElicit = 'MentalScale'
            const speechOutput = 'The sleep quality is a part of daily cleansing and a very important natural process. On a scale of 1 - 10 rate your sleep quality'
            const repromptSpeech = 'Please tell me whether I can proceed or not?';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        else if ((slots.MentalScale.confirmationStatus !== 'CONFIRMED')) {
            if (slots.MentalScale.confirmationStatus !== 'DENIED') {
                // slot status: unconfirmed
                const slotToConfirm = 'MentalScale';
                const speechOutput = `Have u accept to proceed further?`
                const repromptSpeech = speechOutput;
                return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
            }

            // slot status: denied -> reprompt for slot data
            const slotToElicit = 'MentalScale';
            const speechOutput = 'The sleep quality is a part of daily cleansing and a very important natural process. On a scale of 1 - 10 rate your sleep quality'
            const repromptSpeech = 'Please tell me whether I can proceed or not?';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }

        const params = {
            TableName: patientTable
        }
        console.log(params);
        let list_data;

        docClient.scan(params).promise().then(data => {
            console.log('patient succeeded in sleep mode', data);
            console.log(data.Items);
            list_data = data.Items;
        })

        var params1 = {
            TableName: patientTable,
            Key: {
                "userId": list_data[list_data.length].userId
            },
            UpdateExpression: "set QuesAns = :ques, sleep = :num, scale = :str",
            ExpressionAttributeValues: {
                ":ques": slots.QuestionAnswer.value,
                ":num": slots.Sleep.value,
                ":str": slots.MentalScale.value
            },
            ReturnValues: "UPDATED_NEW"
        };
        docClient.update(params1).promise().then(data => {
            console.log("question and sleep hours and mental scale updated...", data);

            const instructions = 'question and sleep hours and mental scale updated...';

            this.emit(':tell', instructions);

        }).catch(err => {

            console.error(err);

        })
    },

    'QuizIntent'() {

        if (!slots.QuesOne.value) {
            const slotToElicit = 'QuesOne'
            const speechOutput = 'Sleep Timings results in proper melatonin secretion which is natural process for sleep being induced. What generally is your sleep timings?'
            const repromptSpeech = 'Please tell me correct the answer according to the question';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        else if ((slots.QuesOne.confirmationStatus !== 'CONFIRMED')) {
            if (slots.QuesOne.confirmationStatus !== 'DENIED') {
                // slot status: unconfirmed
                const slotToConfirm = 'QuesOne';
                const speechOutput = `U had answered this ${slots.QuesOne.value}, correct?`
                const repromptSpeech = speechOutput;
                return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
            }

            // slot status: denied -> reprompt for slot data
            const slotToElicit = 'QuesOne';
            const speechOutput = 'Sleep Timings results in proper melatonin secretion which is natural process for sleep being induced. What generally is your sleep timings?'
            const repromptSpeech = 'Please tell me correct the answer according to the question';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }

        if (!slots.QuesTwo.value) {
            const slotToElicit = 'QuesTwo'
            const speechOutput = 'The subconscious mind unlike the way it sounds it extremely conscious. (pause 4 seconds) Remember the act of hitting a mosquito while you are in deep sleep? (pause 3 seconds) Do you wake up become of frequent nightmares ? do you wake up dead tired because of dreams?'
            const repromptSpeech = 'Please tell me correct the answer according to the question';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        else if ((slots.QuesTwo.confirmationStatus !== 'CONFIRMED')) {
            if (slots.QuesTwo.confirmationStatus !== 'DENIED') {
                // slot status: unconfirmed
                const slotToConfirm = 'QuesTwo';
                const speechOutput = `U had answered this ${slots.QuesTwo.value}, correct?`
                const repromptSpeech = speechOutput;
                return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
            }

            // slot status: denied -> reprompt for slot data
            const slotToElicit = 'QuesTwo';
            const speechOutput = 'The subconscious mind unlike the way it sounds it extremely conscious. (pause 4 seconds) Remember the act of hitting a mosquito while you are in deep sleep? (pause 3 seconds) Do you wake up become of frequent nightmares ? do you wake up dead tired because of dreams?'
            const repromptSpeech = 'Please tell me correct the answer according to the question';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }

        if (!slots.QuesThree.value) {
            const slotToElicit = 'QuesThree'
            const speechOutput = 'Alcohol make knock you down but doesnt mean your sleep is great. is alcohol a part of your daily/weekly routine? Smoking or drugs results in abnormal sleep cycles . if either is part of you please do elaborate on them'
            const repromptSpeech = 'Please tell me correct the answer according to the question';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        else if ((slots.QuesThree.confirmationStatus !== 'CONFIRMED')) {
            if (slots.QuesThree.confirmationStatus !== 'DENIED') {
                // slot status: unconfirmed
                const slotToConfirm = 'QuesThree';
                const speechOutput = `U had answered this ${slots.QuesThree.value}, correct?`
                const repromptSpeech = speechOutput;
                return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
            }

            // slot status: denied -> reprompt for slot data
            const slotToElicit = 'QuesThree';
            const speechOutput = 'Alcohol make knock you down but doesnt mean your sleep is great. is alcohol a part of your daily/weekly routine? Smoking or drugs results in abnormal sleep cycles . if either is part of you please do elaborate on them'
            const repromptSpeech = 'Please tell me correct the answer according to the question';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }

        if (!slots.QuesFour.value) {
            const slotToElicit = 'QuesFour'
            const speechOutput = 'Tortoise live a very very long life thanks to their slow heart rate . Emotional outbreaks are at times the reasons for mood swings , which over time turns habitual. Can you quantify your happiness quotient?? on a scale of 1 - 10 1 being the lowest and 10 being the highest'
            const repromptSpeech = 'Please tell me correct the answer according to the question';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        else if ((slots.QuesFour.confirmationStatus !== 'CONFIRMED')) {
            if (slots.QuesFour.confirmationStatus !== 'DENIED') {
                // slot status: unconfirmed
                const slotToConfirm = 'QuesFour';
                const speechOutput = `U had answered this ${slots.QuesFour.value}, correct?`
                const repromptSpeech = speechOutput;
                return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
            }

            // slot status: denied -> reprompt for slot data
            const slotToElicit = 'QuesFour';
            const speechOutput = 'Tortoise live a very very long life thanks to their slow heart rate . Emotional outbreaks are at times the reasons for mood swings , which over time turns habitual. Can you quantify your happiness quotient?? on a scale of 1 - 10 1 being the lowest and 10 being the highest'
            const repromptSpeech = 'Please tell me correct the answer according to the question';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }

        if (!slots.QuesFive.value) {
            const slotToElicit = 'QuesFive'
            const speechOutput = 'AntiDepressants have a soothing effect on the body . Do you know the body has the natural way of producing Antidepressants??  How long do you work out every day ? could you elaborate??? it could as simple as walking for half an hour to intense physical workouts at gym.'
            const repromptSpeech = 'Please tell me correct the answer according to the question';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        else if ((slots.QuesFive.confirmationStatus !== 'CONFIRMED')) {
            if (slots.QuesFive.confirmationStatus !== 'DENIED') {
                // slot status: unconfirmed
                const slotToConfirm = 'QuesFive';
                const speechOutput = `U had answered this ${slots.QuesFive.value}, correct?`
                const repromptSpeech = speechOutput;
                return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
            }

            // slot status: denied -> reprompt for slot data
            const slotToElicit = 'QuesFive';
            const speechOutput = 'AntiDepressants have a soothing effect on the body . Do you know the body has the natural way of producing Antidepressants??  How long do you work out every day ? could you elaborate??? it could as simple as walking for half an hour to intense physical workouts at gym.'
            const repromptSpeech = 'Please tell me correct the answer according to the question';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }

        if (!slots.QuesSix.value) {
            const slotToElicit = 'QuesSix'
            const speechOutput = 'Gratitude and self content are what seperates us Humans from all the other Mammals living across in the world. How contented are you ? is there any long term or short term grudge that you are holding onto any person? or situation?'
            const repromptSpeech = 'Please tell me correct the answer according to the question';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        else if ((slots.QuesSix.confirmationStatus !== 'CONFIRMED')) {
            if (slots.QuesSix.confirmationStatus !== 'DENIED') {
                // slot status: unconfirmed
                const slotToConfirm = 'QuesSix';
                const speechOutput = `U had answered this ${slots.QuesSix.value}, correct?`
                const repromptSpeech = speechOutput;
                return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
            }

            // slot status: denied -> reprompt for slot data
            const slotToElicit = 'QuesSix';
            const speechOutput = 'Gratitude and self content are what seperates us Humans from all the other Mammals living across in the world. How contented are you ? is there any long term or short term grudge that you are holding onto any person? or situation?'
            const repromptSpeech = 'Please tell me correct the answer according to the question';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }

        if (!slots.QuesSeven.value) {
            const slotToElicit = 'QuesSeven'
            const speechOutput = 'Money is always something that causes greatest happiness as it the commodity that each and every single human being in the world are running after. This on the contrary leads to a lot of anxiety which is known to hinder happiness and in turn bring down all the negativities  associated. Do you hold any Anxiety with respect to money? job loss or financial repayments associated??'
            const repromptSpeech = 'Please tell me correct the answer according to the question';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        else if ((slots.QuesSeven.confirmationStatus !== 'CONFIRMED')) {
            if (slots.QuesSeven.confirmationStatus !== 'DENIED') {
                // slot status: unconfirmed
                const slotToConfirm = 'QuesSeven';
                const speechOutput = `U had answered this ${slots.QuesSeven.value}, correct?`
                const repromptSpeech = speechOutput;
                return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
            }

            // slot status: denied -> reprompt for slot data
            const slotToElicit = 'QuesSeven';
            const speechOutput = 'Money is always something that causes greatest happiness as it the commodity that each and every single human being in the world are running after. This on the contrary leads to a lot of anxiety which is known to hinder happiness and in turn bring down all the negativities  associated. Do you hold any Anxiety with respect to money? job loss or financial repayments associated??'
            const repromptSpeech = 'Please tell me correct the answer according to the question';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }

        if (!slots.QuesEight.value) {
            const slotToElicit = 'QuesEight'
            const speechOutput = 'Every Human in this modern world must have heard this hyped word Meditation(we gotto play with the sound synthesis to make this look interesting) Have you tried any such cognitive way to handle your mental status? if So what was meditation type you worked with and the for how long?'
            const repromptSpeech = 'Please tell me correct the answer according to the question';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        else if ((slots.QuesEight.confirmationStatus !== 'CONFIRMED')) {
            if (slots.QuesEight.confirmationStatus !== 'DENIED') {
                // slot status: unconfirmed
                const slotToConfirm = 'QuesEight';
                const speechOutput = `U had answered this ${slots.QuesEight.value}, correct?`
                const repromptSpeech = speechOutput;
                return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
            }

            // slot status: denied -> reprompt for slot data
            const slotToElicit = 'QuesEight';
            const speechOutput = 'Every Human in this modern world must have heard this hyped word Meditation(we gotto play with the sound synthesis to make this look interesting) Have you tried any such cognitive way to handle your mental status? if So what was meditation type you worked with and the for how long?'
            const repromptSpeech = 'Please tell me correct the answer according to the question';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }

        if (!slots.QuesNine.value) {
            const slotToElicit = 'QuesNine'
            const speechOutput = 'Genetic imprints are often see to be passed to the offsprings. Does you family have any known health issues? kindly Elaborate'
            const repromptSpeech = 'Please tell me correct the answer according to the question';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        else if ((slots.QuesNine.confirmationStatus !== 'CONFIRMED')) {
            if (slots.QuesNine.confirmationStatus !== 'DENIED') {
                // slot status: unconfirmed
                const slotToConfirm = 'QuesNine';
                const speechOutput = `U had answered this ${slots.QuesNine.value}, correct?`
                const repromptSpeech = speechOutput;
                return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
            }

            // slot status: denied -> reprompt for slot data
            const slotToElicit = 'QuesNine';
            const speechOutput = 'Genetic imprints are often see to be passed to the offsprings. Does you family have any known health issues? kindly Elaborate'
            const repromptSpeech = 'Please tell me correct the answer according to the question';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }

        if (!slots.QuesTen.value) {
            const slotToElicit = 'QuesTen'
            const speechOutput = 'Secrets have always caused the deep mind to work without pause . Do we  need to know anything? we promise it will continue to be with us for ever (a promising voice)'
            const repromptSpeech = 'Please tell me correct the answer according to the question';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        else if ((slots.QuesTen.confirmationStatus !== 'CONFIRMED')) {
            if (slots.QuesTen.confirmationStatus !== 'DENIED') {
                // slot status: unconfirmed
                const slotToConfirm = 'QuesTen';
                const speechOutput = `U had answered this ${slots.QuesTen.value}, correct?`
                const repromptSpeech = speechOutput;
                return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
            }

            // slot status: denied -> reprompt for slot data
            const slotToElicit = 'QuesTen';
            const speechOutput = 'Secrets have always caused the deep mind to work without pause . Do we  need to know anything? we promise it will continue to be with us for ever (a promising voice)'
            const repromptSpeech = 'Please tell me correct the answer according to the question';
            return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }

        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }

        console.log(getRandomInt(10));

        const params = {
            TableName: patientTable
        }
        let list_data;

        docClient.scan(params).promise().then(data => {
            console.log('patient succeeded in sleep mode', data);
            console.log(data.Items);
            list_data = data.Items;
        })

        var params1 = {
            TableName: patientTable,
            Key: {
                "userId": list_data[list_data.length].userId
            },
            UpdateExpression: "set One = :num1, Two = :num2, Three = :num3, Four = :num4, Five = :num5, Six = :num6, Seven = :num7, Eight = :num8, Nine = :num9, Ten = :num10",
            ExpressionAttributeValues: {
                ":num1": getRandomInt(10),
                ":num2": getRandomInt(10),
                ":num3": getRandomInt(10),
                ":num4": getRandomInt(10),
                ":num5": getRandomInt(10),
                ":num6": getRandomInt(10),
                ":num7": getRandomInt(10),
                ":num8": getRandomInt(10),
                ":num9": getRandomInt(10),
                ":num10": getRandomInt(10)
            },
            ReturnValues: "UPDATED_NEW"
        };
        docClient.update(params1).promise().then(data => {
            console.log("Quiz section Updated...", data);

            let sum = slots.QuesOne.value + slots.QuesTwo.value + slots.QuesThree.value + slots.QuesFour.value + slots.QuesFive.value + slots.QuesSix.value + slots.QuesSeven.value + slots.QuesEight.value + slots.QuesNine.value + slots.QuesTen.value

            let instructions;

            switch (true) {
                case sum <= 10:
                    instructions = 'a';
                    this.emit(':tell', instructions);
                    break;
                case sum <= 20:
                    instructions = 'b';
                    this.emit(':tell', instructions);
                    break;
                case sum <= 30:
                    instructions = 'c';
                    this.emit(':tell', instructions);
                    break;
                case sum <= 40:
                    instructions = 'd';
                    this.emit(':tell', instructions);
                    break;
                case sum <= 50:
                    instructions = 'e';
                    this.emit(':tell', instructions);
                    break;
                case sum <= 60:
                    instructions = 'f';
                    this.emit(':tell', instructions);
                    break;
                case sum <= 70:
                    instructions = 'g';
                    this.emit(':tell', instructions);
                    break;
                case sum <= 80:
                    instructions = 'h';
                    this.emit(':tell', instructions);
                    break;
                case sum <= 90:
                    instructions = 'i';
                    this.emit(':tell', instructions);
                    break;
                case sum <= 100:
                    instructions = 'j';
                    this.emit(':tell', instructions);
                    break;
                default:
                    break;
            }
        }).catch(err => {

            console.error(err);

        })
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