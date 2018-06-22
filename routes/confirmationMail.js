const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.get("/reservations", function(req, res, next) {
  // A CHAQUE APPEL DE LA ROUTE, ENVOIE DU MAIL
  res.send("HEY C'EST POUR ENVOYER LE MAIL A LA GRAND MERE");
  res.send(envoieMail()); // FONCTION QUI RENVOIE LE MAIL
});

const envoieMail = () => {
  // Création de la méthode de transport de l'email
  var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "marlowdevweb@gmail.com",
      pass: "eRwKiiPwSpMr56wXCD"
    }
  });

  smtpTransport.sendMail(
    {
      from: "Valbuenaaaa <marlowdevweb@gmail.com>", // Expediteur
      to: "marlot.tanguy@orange.fr", // Destinataires
      subject: "bijour la famille Benzema en EDF !", // Sujet
      text: "Coucou Zahia :coche_trait_plein:", // plaintext body
      html: "<b>Hello worldd :coche_trait_plein:</b>" // html body
    },
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Message sent: Benzouille ");
      }
    }
  );
};

module.exports = router;
