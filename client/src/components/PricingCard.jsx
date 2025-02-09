import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Bolt } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";

const PricingCard = ({ title, price, bolts, features, isPopular, mode, currency }) => {


  useEffect(() => {
    console.log(parseFloat(price))
  }, [price])

  const handlePayment = async () => {
    try {
      // const token = Cookies.get("token");
      // const parsedPrice = parseFloat(price.replace(/[^0-9.]/g, "")); 
      // const response = await axios.post(
      //   `${import.meta.env.VITE_API_URL}/payment/create-session`,
      //   {
      //     items: [
      //       {
      //         name: title,
      //         price: parsedPrice, 
      //         quantity: 1, 
      //         bolts: bolts, // Optional if needed in the backend
      //       }
      //     ]
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      // console.log(response);

      // if (response.data.success === true && response.data.url) {
      //   window.location.href = response.data.url; // Redirect to Stripe checkout
      // }

      // else
      // alert(response.data.message)

      //alert(price)
      const orderResponse = await fetch(`${import.meta.env.VITE_API_URL}/payment/razorpay-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: price,//string format 
          currency: currency,
        }),
      });

      const orderData = await orderResponse.json();
      //alert(currency)
      // Initialize Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'RepoDocs',
        description: title,
        order_id: orderData.id,
        handler: async (response) => {
          //console.log(response)
          try {
            // Verify payment
            const verifyResponse = await fetch(`${import.meta.env.VITE_API_URL}/payment/razorpay-verify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();
            //console.log(verifyData)

            if (verifyData.success === true) {
              alert('Payment successful!');
              //api to update bolts
              const token = Cookies.get('token');

              const UpdateResponse = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/bolt-pack`,
                { boltPack: parseInt(bolts.match(/\d+/)[0], 10) },  // Request body
                {
                  headers: {  // Headers go here
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  }
                }
              );

              console.log(UpdateResponse)
              alert(UpdateResponse.message)

            } else {
              alert('Payment verification failed!');
            }
          } catch (error) {
            console.error('Error:', error);
            alert('Payment verification failed!');
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();


    } catch (error) {
      console.error("Payment error:", error.response?.data || error.message);
    }
  };

  const currencySymbols = {
    INR: "₹",
    USD: "$",
    EUR: "€"
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "all 0.3s ease-in-out",
        border: isPopular ? 2 : 0,
        borderColor: "primary.main",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow:
            mode === "light"
              ? "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)"
              : "0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.2)",
        },
      }}
    >
      {isPopular && (
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            backgroundColor: "primary.main",
            color: "white",
            borderRadius: "9999px",
            px: 2,
            py: 0.5,
            fontSize: "0.875rem",
            fontWeight: 600,
          }}
        >
          Best Value
        </Box>
      )}
      <CardContent sx={{ flexGrow: 1, p: 4 }}>
        <Box sx={{ textAlign: "left", mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Bolt sx={{ color: "primary.main", fontSize: 40, mr: 1 }} />
            <Typography variant="h4" component="span" sx={{ fontWeight: 800 }}>
              {bolts}
            </Typography>
          </Box>
          <Typography variant="h3" component="span" sx={{ fontWeight: 800, color: isPopular ? "primary.main" : "inherit" }}>
            {currencySymbols[currency] || currency} {price}
          </Typography>
        </Box>
        <Box sx={{ mb: 4, textAlign: "left" }}>
          {features.map((feature, idx) => (
            <Box key={idx} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Bolt sx={{ mr: 1.5, color: isPopular ? "primary.main" : "success.main", fontSize: 20 }} />
              <Typography>{feature}</Typography>
            </Box>
          ))}
        </Box>
        <Button
          onClick={handlePayment}
          variant={isPopular ? "contained" : "outlined"}
          color="primary"
          fullWidth
          size="large"
          sx={{ py: 1.5, mt: "auto" }}
        >
          Buy Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default PricingCard;
