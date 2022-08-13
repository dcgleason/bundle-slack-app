const express = require('express')
const router = express.Router()
var axios = require('axios');


//users Home page
router.get('/',(req, res)=>{
    res.send("Users home page!!!")
})

router.post('/send', (req, res) => {

  res.send(200);

  if(req.body.type == 'block_actions' || req.body.type == 'shortcut'){

    try{

    const result = await client.views.open({
      trigger_id: req.body.trigger_id,
      view: {
        "type": "modal",
        "title": {
          "type": "plain_text",
          "text": "Bundle"
        },
        "close": {
          "type": "plain_text",
          "text": "Close"
        },

        "blocks": [
          {
              "type": "input",
              "element": {
                  "type": "plain_text_input",
                  "action_id": "plain_text_input-action"
              },
              "label": {
                  "type": "plain_text",
                  "text": "Recipient street address",
                  "emoji": true
              }
          },
          {
              "type": "input",
              "element": {
                  "type": "plain_text_input",
                  "action_id": "plain_text_input-action"
              },
              "label": {
                  "type": "plain_text",
                  "text": "Recipient city",
                  "emoji": true
              }
          },
          {
              "type": "input",
              "element": {
                  "type": "plain_text_input",
                  "action_id": "plain_text_input-action"
              },
              "label": {
                  "type": "plain_text",
                  "text": "Recipient state/province",
                  "emoji": true
              }
          },
          {
              "type": "input",
              "element": {
                  "type": "plain_text_input",
                  "action_id": "plain_text_input-action"
              },
              "label": {
                  "type": "plain_text",
                  "text": "Recipient postal code",
                  "emoji": true
              }
          },
          {
              "type": "input",
              "element": {
                  "type": "plain_text_input",
                  "action_id": "plain_text_input-action"
              },
              "label": {
                  "type": "plain_text",
                  "text": "Recipient country",
                  "emoji": true
              }
          },
          {
              "type": "input",
              "element": {
                  "type": "plain_text_input",
                  "multiline": true,
                  "action_id": "plain_text_input-action"
              },
              "label": {
                  "type": "plain_text",
                  "text": "Your message",
                  "emoji": true
              }
          },
          {
              "type": "section",
              "text": {
                  "type": "mrkdwn",
                  "text": "Click submit to send a letter (in the mail)"
              },
              "accessory": {
                  "type": "button",
                  "text": {
                      "type": "plain_text",
                      "text": "Submit",
                      "emoji": true
                  },
                  "value": "click_me_123",
                  "action_id": "button-action"
              }
          }
      ]
      }
    });

    console.log(result);

  }
catch {
  console.log('error while popping up the modal');
}
  

  }


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

module.exports = router;