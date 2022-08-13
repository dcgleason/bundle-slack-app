const express = require('express')
const router = express.Router()
var axios = require('axios');


//users Home page
router.get('/',(req, res)=>{
    res.send("Users home page!!!")
})

router.post('/send', (req, res) => {

  res.sendStatus(200);

  if(req.body.type == 'block_actions' || req.body.type == 'shortcut'){

    console.log('test value: ' + req.body.view.state.values);
    console.log('test value2: ' + req.body.state.values);

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

router.post('/echo', (req, res) => {
  res.sendStatus(200);
  
})

module.exports = router;