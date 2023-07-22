import * as React from "react";
import CartItem from "./CartItem";
import { useCartStore } from "../stores/useCartStore";
import useFromStore from "../hooks/useFromStore";
import { Divider, Typography } from "@mui/material";
import { Box, Grid, Button, Stack } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Cart({ onClick }: any) {
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const context = React.useContext(AuthContext);

  let total = 0;
  if (cart) {
    total = cart.reduce(
      (acc, product) => acc + product.price * (product.quantity as number),
      0
    );
  }

  return (
    <Box sx={{ width: 320, margin: 1 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Shopping Cart
      </Typography>
      <Divider />
      {cart && cart.length > 0 ? (
        cart?.map((product, index) => (
          <>
            <CartItem key={index} product={product} />
            <Divider />
          </>
        ))
      ) : (
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          mt={25}
        >
          <ShoppingCartIcon color="secondary" sx={{ fontSize: 100, mb: 2 }} />
          <SentimentVeryDissatisfiedIcon
            color="secondary"
            sx={{ fontSize: 50, mb: 2 }}
          />
          <Typography variant="h5">Cart is empty</Typography>
        </Stack>
      )}

      {cart && cart.length > 0 && (
        <>
          <Grid
            container
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ margin: 2, padding: "10px" }}
          >
            <Grid item xs={6}>
              <Typography variant="h5" align="left">
                Total
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" align="right" gutterBottom>
                ${total.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
          <Link
            to={context.isAuthenticated ? "/checkout" : "/login"}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Button
              onClick={onClick}
              variant="contained"
              fullWidth
              sx={{ mb: 2 }}
            >
              Checkout
            </Button>
          </Link>
          <Link
            to="/store"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Button onClick={onClick} variant="outlined" fullWidth>
              Back to Store
            </Button>
          </Link>
        </>
      )}
    </Box>
  );
}

export default Cart;
