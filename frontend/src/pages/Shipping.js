import React from "react";
import { Container, Typography, Box, Paper, Divider } from "@mui/material";

const Shipping = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 6 }}>
        <Paper elevation={3} sx={{ p: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Ordering and Buying
          </Typography>

          <Typography paragraph>
            Impressionist ships worldwide using reputed companies such as FedEx,
            DHL for international deliveries and companies such as GATI, ARAMEX,
            Blue Dart, DTDC for deliveries within and outside India. The
            shipment of all the paintings, sculptures, antiques or any artistic
            item (collectively hereinafter referred to as "Artworks" or
            "Artwork") will be done by Impressionist. Impressionist takes great
            care for packing all consignments. The term website user/customer
            shall be hereinafter referred to as "you" or "your").
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
            Ordering and Buying Terms
          </Typography>

          <Box component="ul" sx={{ pl: 4, mb: 4 }}>
            <Typography component="li" paragraph>
              All images displayed are based on the images provided by the
              artists.
            </Typography>
            <Typography component="li" paragraph>
              The order will be processed subject to availability of the
              paintings / sculptures / prints / graphics / Antiques items only
              ordered.
            </Typography>
            <Typography component="li" paragraph>
              The prices for the paintings do not include framing.
            </Typography>
            <Typography component="li" paragraph>
              The order will be processed only after the amount of the Artwork
              as displayed on the Website is credited and appears in the account
              of Impressionist.
            </Typography>
            <Typography component="li" paragraph>
              For delivery in India, the price of the Artwork shall be as
              applicable in India (Indian Rupees) and for delivery outside
              India, the price of the Artwork shall be as applicable in the
              Country (Dollar/Pound).
            </Typography>
          </Box>

          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
            Methods of Safe and Secure Payments
          </Typography>

          <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3 }}>
            1. Credit Card Payments
          </Typography>
          <Typography paragraph>
            You can pay confidently using Visa, MasterCard and debit cards with
            the Visa and MasterCard logo. Each card transaction is verified for
            genuineness using a variety of parameters. After adding the Artwork
            to your Shopping Cart, you will be prompted to select Payment Type.
            If you select Credit Card Payment option, and submit the order we
            will redirect you through EBS Payment Gateway to make your payment.
            After the order is confirmed, Impressionist will forward Online
            Credit Card Payment Invoice through EBS which uses encryption
            technology on secured socket layer. If the name of the buyer does
            not match with the name in the Credit Card used, the payment
            transaction will be rejected. On your completing the credit card
            transaction, you will receive email confirming the same. After your
            card is charged and money is credited to The Art India account, we
            will intimate you with confirmation of receipt of payment and status
            of shipping.
          </Typography>

          <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3 }}>
            2. Cheque / Demand Draft
          </Typography>
          <Typography paragraph>
            All payments are to be made in favour of "Impressionist" by way of
            cheque /demand draft payable at Pune.
          </Typography>

          <Typography variant="h6" component="h3" gutterBottom>
            3. Direct Transfer/Wire Transfer
          </Typography>
          <Typography paragraph>
            Alternatively the payment can also be made directly into The Art
            India account in the name of "Impressionist". A wire transfer is a
            transaction that you initiate via your bank. It authorizes your bank
            to wire funds from your account to the Art India bank account, with
            the help of the following details:
          </Typography>

          <Box sx={{ my: 4 }}>
            <Typography variant="h6" gutterBottom>
              For Orders Within India:
            </Typography>
            <Typography component="pre" sx={{ whiteSpace: "pre-wrap", pl: 2 }}>
              State Bank of India, Account No. 32142477916 At Pune-Solapur Road,
              Hadapsar, Pune - 411028, (Maharastra) India. RTGS / NEFT IFSC:
              code for making online transfer is SBIN0009062
            </Typography>
          </Box>

          <Box sx={{ my: 4 }}>
            <Typography variant="h6" gutterBottom>
              For Orders Outside India:
            </Typography>
            <Typography paragraph>
              Please make the payment through wire transfer of which details are
              given below. Please handover the information given below to your
              banker to wire the money to us.
            </Typography>
            <Typography component="pre" sx={{ whiteSpace: "pre-wrap", pl: 2 }}>
              State Bank of India, Account No: 32142477916 At Pune-Solapur Road,
              Hadapsar, Pune - 411028, (Maharashtra) RTGS / NEFT IFSC: code for
              making online transfer is SBIN0009062
            </Typography>
          </Box>

          <Typography paragraph>
            Please note that while we would have paid for the shipment to your
            door, any local customs or equivalent tax / duty will be to your
            account. Please send us a confirmation mail after the wire transfer
            is done. Please provide your name and detailed postal address with
            zip code and telephone number for shipment. The painting will be
            sent in a rolled format in rigid PVC container on receipt of payment
            in our account.
          </Typography>

          <Typography paragraph>
            We will ask you to send the payment to us only after we confirm the
            availability of the painting / sculpture being ordered. The
            consignment is usually shipped within a week of we getting the
            payment credit into our account.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Shipping;
