var express = require("express"),
    nodemailer = require("nodemailer"),
    router = express.Router();

router.get("/", function(req, res) {
    res.render("index");
})

router.get("/about", function(req, res) {
    res.redirect("/");
})

router.get("/contact", function(req, res) {
    res.render("contact");
})

router.post("/contact", function(req, res) {
    var contact = req.body.contact,
        sender = contact.name + "<" + contact.email + ">",
        phone = contact.phone,
        subject = contact.subject,
        message = contact.message;

    console.log("Sending Mail");

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "emailtesting2871@gmail.com", // generated ethereal user
                pass: "1782gnitset"  // generated ethereal password
                // clientid: 917412920355-kg8gusdp4j3o35b1shjnmvnpbbjqhi8q.apps.googleusercontent.com.
                // clientsecret: 8F-Fvv6GyGzCUk5YZYLn-Iho
            },
            // requiresAuth: true,
            // domains: ["gmail.com", "googlemail.com"],
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: sender, // sender address
            to: 'richardlwchang@gmail.com', // list of receivers
            subject: subject, // Subject line
            text: phone + " " + message, // plain text body
            html: phone + " " + message // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });

    res.redirect("/contact");
})

module.exports = router;
