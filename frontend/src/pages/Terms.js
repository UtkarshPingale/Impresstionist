import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";

const Terms = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 6 }}>
        <Paper elevation={3} sx={{ p: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Terms and Conditions
          </Typography>

          <Typography paragraph>
            The term "IMPRESSIONIST" refers to the owner of
            www.http://impressionist.in (hereinafter referred to as "Website")
            whose registered office is Jasminium, C-1102, Magarpatta City,
            Hadapsar, Pune - 411028, with registration number Hadapsar/II/21033,
            Pune. Impressionist, including its subsidiaries, affiliates or
            assignees, provide the information contained on the website to the
            website user (hereinafter referred to as "you" or "your") subject to
            the terms and conditions set out on the Website and any other
            relevant policies, rules, guidelines etc. which may be applicable
            from time to time.
          </Typography>

          <Typography paragraph>
            If you continue to browse and use this Website you are agreeing to
            comply with and be bound by the following terms and conditions of
            use, which together with our other policies under this Website
            govern Impressionist's relationship with you in relation to this
            Website.
          </Typography>

          <Typography paragraph>
            It is hereby mutually understood and accepted that all artworks made
            available for sale on the Website do not include duties, taxes
            (direct or indirect), insurance, packing, shipping and handling
            charges, which will be charged as applicable and would vary
            according to the size, weight (with packaging) of the artwork,
            freight, destination for shipment address etc. Subject to the terms
            and conditions laid down in the Cancellation and Refund Policy,
            placing an order with Impressionist constitutes an irrevocable
            acceptance, unless rescinded/cancelled by Impressionist, within 3
            working days on account any reasonable reason, and such acceptance
            results in an enforceable contact of sale.
          </Typography>

          <Typography paragraph>
            All artwork displayed on the Website is supported by an authenticity
            guarantee from the collector/seller/Artist. We take great care to
            reproduce the colours of the original paintings as depicted on the
            Website. There may be variations in shade and colour. No complaints
            in this regard would be entertained.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
            Terms of Use
          </Typography>

          <Box component="ul" sx={{ pl: 4 }}>
            <Typography component="li" paragraph>
              The content of this Website is for your general information and
              use only. It is subject to change without notice.
            </Typography>
            <Typography component="li" paragraph>
              Neither Impressionist nor any third parties provide any warranty
              or guarantee as to the accuracy, timeliness, performance,
              completeness or suitability of the information and materials found
              or offered on this Website for any particular purpose. You
              acknowledge that such information and materials may contain
              inaccuracies or errors and Impressionist expressly excludes
              liability for any such inaccuracies or errors to the fullest
              extent permitted by law.
            </Typography>
            <Typography component="li" paragraph>
              Your use of any information or materials on this Website is
              entirely at your own risk, for which we shall not be liable. It
              shall be your own responsibility to ensure that any products,
              services or information available through this Website meet your
              specific requirements.
            </Typography>
            <Typography component="li" paragraph>
              This Website contains material which is owned by or licensed to
              Impressionist. This material includes, but is not limited to, the
              design, layout, look, appearance and graphics. Reproduction is
              prohibited other than in accordance with the copyright notice,
              which forms part of these terms and conditions.
            </Typography>
            <Typography component="li" paragraph>
              Unauthorized use of this Website may give rise to a claim for
              damages and/or be a criminal offence.
            </Typography>
            <Typography component="li" paragraph>
              From time to time this Website may also include links to other
              websites. These links are provided for your convenience to provide
              further information. They do not signify that Impressionist
              endorses the website(s). We have no responsibility for the content
              of the linked website(s).
            </Typography>
            <Typography component="li" paragraph>
              You are strictly prohibited from creating a link to this Website
              from another website or document without Impressionist's prior
              written consent.
            </Typography>
            <Typography component="li" paragraph>
              Your use of this Website and any dispute arising out of such use
              of the Website is subject to the laws of India or other regulatory
              authority.
            </Typography>
            <Typography component="li" paragraph>
              You hereby acknowledge and accept that Impressionist shall be
              under no liability whatsoever in respect of any loss or damage
              arising directly or indirectly out of the decline of authorization
              for any transaction, on account of the cardholder (payments made
              online) having exceeded the present limit mutually agreed by
              Impressionist with its acquiring bank from time to time.
            </Typography>
            <Typography component="li" paragraph>
              Any dispute with respect to Impressionist and the Website, if any,
              shall be strictly subject to the jurisdiction of the Courts in
              Pune.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Terms;
