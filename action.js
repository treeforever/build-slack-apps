const axios = require('axios');
// const { writeFile } = require('./utils/fsUtils');
// const { writeAnswerToDB } = require('./mongoDBClient');

const survey = require('./survey.json');

const openDialog = triggerId => {
    const options = {
        url: 'https://slack.com/api/dialog.open',
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${process.env.BOT_TOKEN}`,
        },
        data: {
            dialog: survey.question_2,
            trigger_id: triggerId,
        },
    };
    axios(options)
        .then(response => {
            console.log('open dialog:', response.data);
        })
        .catch(error => {
            console.log('open dialog failed:', error);
        });
};

const interestHandler = (payload, respond) => {
    console.log(
        `🌟 The user ${payload.user.name} chose ${payload.actions[0].value}`,
    );

    const shouldContinue = payload.actions[0].value.toLowerCase() === 'yes';

    // writeUserAnswersToFile(payload, pickAnswerFromQualifier);

    // validate token

    if (shouldContinue) {
        const response = { text: `Your answer is: ${payload.actions[0].value}` };
        respond(response).catch(e => console.error('something went wrong', e));
        openDialog(payload.trigger_id);
    } else {
        const response = {
            text: `Your answer is: ${
                payload.actions[0].value
                }. Let's find a better time`,
        };
        respond(response).catch(e => console.error('something went wrong', e));
    }

    // Before the work completes, return a message object that is the same as the original but with
    // the interactive elements removed.
    const reply = payload.original_message;
    delete reply.attachments[0].actions;
    return reply;
};

const confirm = (payload, respond) => {
    try {
        console.log(
            `🌟 The user ${payload.user.name} answered skill set is ${
            payload.submission.skill_set
            } and interest is ${payload.submission.interest}`,
        );

        // writeAnswerToDB(payload);

        // writeUserAnswersToFile(payload, pickAnswerFromDialog);

        // validate token

        const response = {
            text: `Your answer is: skill set is ${
                payload.submission.skill_set
                } and interest is ${payload.submission.interest}`,
        };
        respond(response).catch(e =>
            console.error(
                "An error occurred when trying to respond to user's dialog submission",
                e,
            ),
        );

        return;
    } catch (e) {
        console.error('Error happened in skillInterestStepTwo');
    }
};

const handler = {
    interestHandler,
    confirm,
}; 
module.exports = handler;



