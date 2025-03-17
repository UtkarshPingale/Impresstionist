import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";

const AuthenticityGuarantee = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 6 }}>
        <Paper elevation={3} sx={{ p: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Authenticity Guarantee
          </Typography>

          <Typography paragraph>
            Impressionist provides an assurance on behalf of the seller that
            each piece of art which we offer for sale on the site is a genuine
            work of the artist listed.
          </Typography>

          <Typography paragraph>
            Impressionist guarantees the authenticity of the artwork for a
            period of six month. Authenticity in relation to artworks shall mean
            compliance of the artwork with the description provided on the web
            site, particularly with reference to the name of the artist, title
            (if any) of the artwork itself, date, the school of art (if
            mentioned), dimensions, medium etc.
          </Typography>

          <Typography paragraph>
            In the unlikely event that within six month from the sale of the
            artwork, it is proved by the buyer to the reasonable satisfaction of
            Impressionist that the item was not authentic and if, in
            Impressionist's opinion, this would have significantly impacted the
            price a buyer would have been willing to pay for the item,
            Impressionist shall be entitled to rescind the sale and the seller
            will be liable to refund to the buyer the price paid for the item,
            once the buyer returns the item to Impressionist. Impressionist
            shall hand over to the seller the item returned by the buyer.
          </Typography>

          <Typography paragraph>
            All such claims will be handled on a case-by-case basis, and in the
            case of an authenticity claim in relation to artwork will require
            that examinable proof, which clearly demonstrates that the item is
            not authentic, is provided by an established and acknowledged
            authority. The decision of impressionist respect of such claims
            shall be final and binding.
          </Typography>

          <Typography paragraph>
            This guarantee shall be subject to the following conditions: The
            claim is made by the buyer as registered with Impressionists (the
            benefit of the claim is not assignable to any subsequent owners or
            others who may acquire or have an interest in any of the items).
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default AuthenticityGuarantee;
