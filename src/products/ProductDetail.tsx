import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Counter from "../components/Counter";
import { useCartStore } from "../stores/useCartStore";
import Chip from "@mui/material/Chip";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import DetailsThumb from "./DetailsThumb";

export default function ProductDetail() {
  const { id } = useParams();
  const [index, setIndex] = useState(0);
  const addToCart = useCartStore((state) => state.addToCart);
  const [data, setData] = useState();

  const myRef = React.createRef();

  const handleTab = (index: any) => {
    setIndex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  useEffect(() => {
    const url = `https://dummyjson.com/products/${id}`;
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Chip
          variant="outlined"
          color="info"
          // icon={<FaceIcon />}
          label={data?.brand}
        />
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={6}>
          <Box sx={{ flexGrow: 1 }}>
            <img
              src={data?.images[index]}
              alt="thumbnail"
              height="500"
              width="500"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h2" gutterBottom>
              {data?.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2
              }}
            >
              <Rating
                value={data && data.rating}
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <Box sx={{ ml: 2 }}>Customer Rating</Box>
            </Box>

            <Typography variant="body2" gutterBottom>
              {data?.description}
            </Typography>
            <Stack direction="row" sx={{ mt: 2 }}>
              <Typography variant="h3" gutterBottom>
                ${data?.price}
              </Typography>
              <Chip
                label={`${Math.round(data?.discountPercentage)}% OFF`}
                color="error"
                variant="outlined"
              />
            </Stack>

            <DetailsThumb images={data?.images} tab={handleTab} myRef={myRef} />

            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              <Button
                variant="outlined"
                startIcon={<AddShoppingCartIcon />}
                onClick={() => addToCart(data)}
              >
                Add to Cart
              </Button>
              <Button
                variant="contained"
                startIcon={<ShoppingCartCheckoutIcon />}
                onClick={() => addToCart(data)}
              >
                Buy now
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4 }}>
        <Link
          to={`/store`}
          //style={{ textDecoration: "none", color: "inherit" }}
        >
          {"back to store"}
        </Link>
      </Box>
    </Container>
  );
}
