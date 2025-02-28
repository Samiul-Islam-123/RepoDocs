import { Box, Container, Grid, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useState, useEffect } from "react";
import PricingCard from "./PricingCard";
import axios from "axios";

const Pricing = ({ mode }) => {
  const [currency, setCurrency] = useState("USD");
  const [pricing, setPricing] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(1); // Default 1 (for USD)

  // Fetch pricing from server
  const fetchPricing = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/pricing`);
      console.log("Fetched pricing data:", response.data); // Debugging API response
      setPricing(Array.isArray(response.data.pricing) ? response.data.pricing : []);
    } catch (error) {
      console.error("Error fetching pricing:", error);
      setPricing([]); // Fallback to an empty array
    }
  };

  // Fetch exchange rate dynamically
  const fetchExchangeRate = async (toCurrency) => {
    if (toCurrency === "USD") {
      setExchangeRate(1); // No conversion needed
      return;
    }

    try {
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/USD`);
      console.log("Exchange rate data:", response.data.rates);
      setExchangeRate(response.data.rates[toCurrency] || 1); // Default to 1 if not found
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      setExchangeRate(1); // Fallback rate
    }
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  useEffect(() => {
    console.log(pricing)
  },[pricing])

  useEffect(() => {
    fetchExchangeRate(currency);
  }, [currency]);

  return (
    <Box sx={{ py: 12, bgcolor: mode === "light" ? "grey.50" : "background.paper" }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom sx={{ mb: 4 }}>
          Buy More Bolts
        </Typography>
        
        {/* Currency Selector */}
        <FormControl sx={{ minWidth: 120, mb: 4 }}>
          <InputLabel>Currency</InputLabel>
          <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <MenuItem value="USD">USD ($)</MenuItem>
            <MenuItem value="INR">INR (₹)</MenuItem>
            <MenuItem value="EUR">EUR (€)</MenuItem>
          </Select>
        </FormControl>

        {/* Pricing Cards */}
        <Grid container spacing={4}>
          {pricing.length > 0 ? (
            pricing.map((plan, index) => (
              <Grid item key={index} xs={12} md={4}>
                <PricingCard
                  {...plan}
                  price={(plan.price * exchangeRate).toFixed(2)}
                  currency={currency}
                  mode={mode}
                  pricingID={plan}
                />
              </Grid>
            ))
          ) : (
            <Typography variant="h6" align="center" sx={{ width: "100%" }}>
              No pricing available
            </Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Pricing;
