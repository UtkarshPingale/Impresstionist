import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 6 }}>
        <Paper elevation={3} sx={{ p: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Privacy Policy
          </Typography>

          <Typography paragraph>
            Impressionist strongly believes in the security of the website
            user's (hereinafter referred to as "Website") privacy. This Privacy
            Policy guides everything that Impressionist strives to achieve and
            states how we will respect the privacy of our website users. It
            states what information we will gather, how we will use it and how
            we will keep it secure.
          </Typography>

          <Typography paragraph>
            This Privacy Policy sets out how Impressionist uses and protects any
            information that you give Impressionist, when you use
            https://imptrssionist.in (hereinafter referred to as "Website").
            Should Impressionist ask you to provide any information, you can be
            assured that it will only be used in accordance with the provisions
            of this Privacy Policy.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
            WHAT WE COLLECT
          </Typography>

          <Typography paragraph>
            In order to successfully process transactions under this Website,
            Impressionist may collect the following information from you:
          </Typography>

          <Box component="ul" sx={{ pl: 4 }}>
            <Typography component="li">Name and job title.</Typography>
            <Typography component="li">
              Contact information including email address.
            </Typography>
            <Typography component="li">
              Demographic information such as postcode, preferences and
              interests.
            </Typography>
            <Typography component="li">
              Other information relevant to customer surveys and/or offers.
            </Typography>
          </Box>

          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
            WHAT WE DO WITH THE INFORMATION WE GATHER
          </Typography>

          <Typography paragraph>
            Impressionist requires this information to understand your needs and
            provide you with a better service, without limitation, for the
            following reasons:
          </Typography>

          <Box component="ul" sx={{ pl: 4 }}>
            <Typography component="li">Internal record keeping.</Typography>
            <Typography component="li">
              Improve products and services.
            </Typography>
            <Typography component="li">
              Send periodically promotional emails about new products, special
              offers or other information.
            </Typography>
            <Typography component="li">Market research purposes.</Typography>
            <Typography component="li">
              Customize the Website according to your interests.
            </Typography>
          </Box>

          <Typography paragraph sx={{ mt: 2 }}>
            Impressionist may contact you by email, phone, fax or mail.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
            SECURITY
          </Typography>

          <Typography paragraph>
            Impressionist is committed to ensuring that your information is
            secure. In order to prevent unauthorized access or disclosure,
            Impressionist has put in place a suitable physical electronic and
            managerial procedure to safeguard and secure the information
            collected online.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
            COOKIES
          </Typography>

          <Typography paragraph>
            A cookie is a small file which asks permission to be placed on your
            computer's hard drive. Cookies help Impressionist to provide you
            with a better website, by enabling it to monitor which pages you
            find useful and which you do not. A cookie in no way gives
            Impressionist access to your computer or any information about you,
            other than the data you choose to share. Cookies helps analyze web
            traffic or lets you know when you visit a particular site. Cookies
            allow web applications to respond to you as an individual. The web
            application can tailor its operations to your needs, likes and
            dislikes by gathering and remembering information about your
            preferences.
          </Typography>

          <Typography paragraph>
            Impressionist uses traffic log cookies to identify which pages are
            being used. This help Impressionist to analyze data about webpage
            traffic and improve the Website in order to tailor it to customer
            needs. Impressionist only uses this information for statistical
            analysis purposes and then the data is removed from the system. You
            can choose to accept or decline Cookies. Most web browsers
            automatically accept cookies, but you can usually modify your
            browser setting to decline cookies if you prefer. This may prevent
            you from taking full advantage of the Website.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
            LINK TO OTHER WEBSITES
          </Typography>

          <Typography paragraph>
            The Website may contain links to other websites of interest.
            However, once you have used these links to leave Impressionist's
            site, you should note that we do not have any control over other
            websites. Therefore, we cannot be responsible for the protection and
            privacy of any information which you provide whilst visiting such
            sites and such sites are not governed by this Privacy Policy. You
            should exercise caution and look at the privacy statement applicable
            to the other websites in question.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
            CONTROLLING YOUR PERSONAL INFORMATION
          </Typography>

          <Typography paragraph>
            You may choose to restrict the collection or use of your personal
            information in the following ways:
          </Typography>

          <Box component="ul" sx={{ pl: 4 }}>
            <Typography component="li" paragraph>
              Whenever you are asked to fill in a form on the Website, look for
              the box that you can click to indicate that you do not want the
              information to be used by anybody for direct marketing purposes.
            </Typography>
            <Typography component="li" paragraph>
              If you have previously agreed with Impressionist for using your
              personal information for direct marketing purposes, you may change
              your mind at any time by writing to or emailing at
              info@impressionist.in. We will not sell, distribute or lease your
              personal information to third parties unless Impressionist has
              your permission or are required by law to do so. Impressionist may
              use your personal information to send you promotional information
              about third parties which it thinks you may find interesting.
            </Typography>
            <Typography component="li" paragraph>
              You may request details of personal information which
              Impressionist holds about you under the Data Protection Act 1998,
              for which a small fee will be requested. If you would like a copy
              of the information held on you please write to Jasminium , C-1102,
              Magapatta City, Hadapsar, Pune- 411028.
            </Typography>
            <Typography component="li" paragraph>
              If you believe that any information we are holding on you is
              incorrect or incomplete, please write to or email as soon as
              possible, at the above address. We will promptly correct any
              information found to be incorrect.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
