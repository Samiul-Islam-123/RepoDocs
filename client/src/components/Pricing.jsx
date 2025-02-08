import { Box, Container, Grid, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useState, useEffect } from "react";
import PricingCard from "./PricingCard";

const exchangeRates = {
  USD: 1,
  INR: 86.4, // Example exchange rate
  EUR: 0.92, // Example exchange rate
};

const Pricing = ({ mode }) => {
  const [currency, setCurrency] = useState("USD");
  const [pricing, setPricing] = useState([]);

  const basePricing = [
    { title: "Starter Pack", price: 2.99, bolts: "20 Bolts", features: ["20 Bolt Credits", "Instant Delivery", "No Expiry"], isPopular: false },
    { title: "Pro Pack", price: 6.99, bolts: "50 Bolts", features: ["50 Bolt Credits", "Best Value", "No Expiry"], isPopular: true },
    { title: "Mega Pack", price: 17.99, bolts: "150 Bolts", features: ["150 Bolt Credits", "Bulk Discount", "No Expiry"], isPopular: false },
  ];

  useEffect(() => {
    setPricing(
      basePricing.map((plan) => ({
        ...plan,
        price: (plan.price * exchangeRates[currency]).toFixed(2),
        numericPrice: (plan.price * exchangeRates[currency]).toFixed(2),
      }))
    );
  }, [currency]);

  return (
    <Box sx={{ py: 12, bgcolor: mode === "light" ? "grey.50" : "background.paper" }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom sx={{ mb: 4 }}>
          Buy More Bolts
        </Typography>
        <FormControl sx={{ minWidth: 120, mb: 4 }}>
          <InputLabel>Currency</InputLabel>
          <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <MenuItem value="USD">USD ($)</MenuItem>
            <MenuItem value="INR">INR (₹)</MenuItem>
            <MenuItem value="EUR">EUR (€)</MenuItem>
          </Select>
        </FormControl>
        <Grid container spacing={4}>
          {pricing.map((plan, index) => (
            <Grid item key={index} xs={12} md={4}>
              <PricingCard {...plan} mode={mode} currency={currency} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Pricing;
