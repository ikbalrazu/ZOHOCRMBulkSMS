const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
const bodyparser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
// const cors=require("cors");
// const corsOptions ={
//    origin:'*', 
//    credentials:true,            //access-control-allow-credentials:true
//    optionSuccessStatus:200,
// }

// app.use(cors({ origin: "https://bulksmsfrontend.netlify.app", credentials: false }));

// app.use(cors(corsOptions))
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

// const accountSid = 'ACadc3ffb43cef495abeafebce2609c137'; // Your Account SID from www.twilio.com/console
// const authToken = '1069b3764bb73164952c4effb0259a96'; // Your Auth Token from www.twilio.com/console


//const client = new twilio(accountSid, authToken);

function sendSMS() {
    console.log("send sms method");
    client.messages
        .create({
            body: 'Hello from Node by iqbal',
            to: '+8801622869685', // Text this number
            from: '+44 7480 609895', // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));
        

    console.log("this is the function end");

}

app.get("/",(req,res)=>{
    res.send("Bulk SMS with Twilio");
})



app.post("/twilioconfiq", (req,res)=>{
    const {phonenumber,twilionumber,twilioSID,twilioauthtoken,templatemessage} = req.body;
    console.log(phonenumber);
    // console.log("phone number 0: ",phonenumber[0]);
    // console.log("phone number 1: ",phonenumber[1]);
    //console.log("length: ",phonenumber.length);
    console.log(twilionumber);
    console.log(twilioSID);
    console.log(twilioauthtoken);
    console.log(templatemessage);
    
    for(let i=0; i<phonenumber.length; i++){
        //console.log("phone number: ",phonenumber[i]);
        const client = new twilio(twilioSID, twilioauthtoken);
        client.messages.create({
            body: templatemessage,
            to: phonenumber[i],
            from: twilionumber
        })
        .then(function(message){
            console.log(message.sid);
            res.send({status: "Success"});
            //console.log("phoene: ",phonenumber[i], "sid: ",message.sid);
            //var messagesid = message.sid;
            // sendSMSinfo.push({"Phone":phonenumber[i],"MessageSID":message.sid});
            // var SMSno = phonenumber[i];
            //res.json(message);
            //res.json({status: "SMS Send Successfully", phone: phonenumber[i], twilionumber, twilioSID, twilioauthtoken, templatemessage, messagesid})
            //sendSMSinfo.push({"msgSID":messagesid,"smsNumber":SMSno});
        });
    }

});

app.get("/sendsms", (req, res) => {
    var name="iqbal"
    var location="dhaka"
    res.json([{name,location}]);
    // sendSMS();
    console.log("sendsms call");
})


app.listen(port, function (error) {
    if (error) {
        console.log("Server fail");
    }
    else {
        console.log("Server Success");
    }
})