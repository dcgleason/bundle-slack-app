const express = require('express')
const router = express.Router()
var axios = require('axios');


//users Home page
router.get('/',(req, res)=>{
    res.send("Users home page!!!")
})

router.post('/send', (req, res) => {

  console.log('req.body' + req.body)

// sending 4 x 6 handwritten post card 

    var data = JSON.stringify({
        "handwriting_style": 12,
        "message": req.body.message,
        "recipients": [
          {
            "name": req.body.name,
            "address": req.body.street, 
            "city": req.body.city,
            "province": req.body.state,
            "postal_code": req.body.postal,
            "country": req.body.country
          }
        ],
        "giftcard_brand": req.body.brand,
        "giftcard_amount_in_cents": req.body.amount
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