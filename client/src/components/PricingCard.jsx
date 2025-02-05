import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Bolt } from "@mui/icons-material";

const PricingCard = ({ title, price, bolts, features, isPopular, mode }) => {
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
            {price}
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
        <Button variant={isPopular ? "contained" : "outlined"} color="primary" fullWidth size="large" sx={{ py: 1.5, mt: "auto" }}>
          Buy Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default PricingCard;
