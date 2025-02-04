import { Box, Container, Grid, Typography } from "@mui/material";
import PricingCard from "./PricingCard";

const Pricing = ({ mode }) => {
  const pricing = [
    {
      title: "Starter Pack",
      price: "$2.99",
      bolts: "20 Bolts",
      features: ["20 Bolt Credits", "Instant Delivery", "No Expiry"],
      isPopular: false,
    },
    {
      title: "Pro Pack",
      price: "$6.99",
      bolts: "50 Bolts",
      features: ["50 Bolt Credits", "Best Value", "No Expiry"],
      isPopular: true,
    },
    {
      title: "Mega Pack",
      price: "$17.99",
      bolts: "150 Bolts",
      features: ["150 Bolt Credits", "Bulk Discount", "No Expiry"],
      isPopular: false,
    },
  ];

  return (
    <Box sx={{ py: 12, bgcolor: mode === "light" ? "grey.50" : "background.paper" }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom sx={{ mb: 8 }}>
          Buy More Bolts
        </Typography>
        <Typography 
          variant="h5" 
          align="center" 
          sx={{ 
            mb: 8,
            color: mode === 'dark' ? 'text.secondary' : 'text.secondary',
            fontStyle: 'italic'
          }}
        >
          Each README generation costs 2 bolts ⚡
        </Typography>
        <Grid container spacing={4}>
          {pricing.map((plan, index) => (
            <Grid item key={index} xs={12} md={4}>
              <PricingCard {...plan} mode={mode} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Pricing;
