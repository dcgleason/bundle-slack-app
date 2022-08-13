const express = require('express')
const router = express.Router()
var axios = require('axios');
import {app} from '../server';



//users Home page
router.get('/',(req, res)=>{
    res.send("Users home page!!!")
})

router.post('/send', async (req, res) => {

  res.sendStatus(200);

  console.log("req.body.type" + req.body.type);
  console.log('test value: ' + req.body.view.state.values);
  console.log('test value2: ' + req.body.state.values);

   

  


// sending 4 x 6 handwritten post card 

    var data = JSON.stringify({
        "handwriting_style": 12,
        "message": req.body.text,
        "recipients": [
          {
            "name": req.body.name,
            "address": req.body.street, 
            "city": req.body.city,
            "province": req.body.state,
            "postal_code": req.body.postal,
            "country": req.body.country
          }
        ]
      });
      
      var config = {
        method: 'post',
        url: 'https://api.thanks.io/api/v2/send/notecard',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ process.env.bundleToken
        },
        data : data
      };
      
      // axios(config)
      // .then(function (response) {
      //   console.log('post card response' + JSON.stringify(response.data));
      //   res.send(JSON.stringify(response.data))
      // })
      // .catch(function (error) {
      //   console.log('postcard send error' + error);
      //   res.send(error);
      // });

})

router.post('/ticket', (req, res) => {
 
  res.send('testing');


  console.log("ticket req.body.type" + req.body.type);
  console.log('ticket test value: ' + req.body.view.state.values);
  console.log('ticket test value2: ' + req.body.state.values);
  res.sendStatus(200);

  app.command('/ticket', async ({ ack, body, client, logger }) => {
    // Acknowledge the command request
    await ack();
  
    try {
      // Call views.open with the built-in client
      const result = await client.views.open({
        // Pass a valid trigger_id within 3 seconds of receiving it
        trigger_id: body.trigger_id,
        // View payload
        view: {
          type: 'modal',
          // View identifier
          callback_id: 'view_1',
          title: {
            type: 'plain_text',
            text: 'Modal title'
          },
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: 'Welcome to a modal with _blocks_'
              },
              accessory: {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: 'Click me!'
                },
                action_id: 'button_abc'
              }
            },
            {
              type: 'input',
              block_id: 'input_c',
              label: {
                type: 'plain_text',
                text: 'What are your hopes and dreams?'
              },
              element: {
                type: 'plain_text_input',
                action_id: 'dreamy_input',
                multiline: true
              }
            }
          ],
          submit: {
            type: 'plain_text',
            text: 'Submit'
          }
        }
      });
      logger.info("ticket view result" + result);
    }
    catch (error) {
      logger.error(error);
    }
  });



})

module.exports = router;