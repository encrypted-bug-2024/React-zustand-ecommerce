import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";

import { Product } from "../types";
import { useCartStore } from "../stores/useCartStore";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardActionArea>
        <Link
          to={`/product/${product.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <CardMedia
            component="img"
            src={product.thumbnail}
            alt={product.title}
            width={100}
            height={200}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5">
              {product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {product.description}
            </Typography>
            <Typography variant="h4" align="left">
              ${product.price}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      <CardActions>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Button
            size="small"
            variant="contained"
            startIcon={<AddShoppingCartIcon />}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </Button>

          <Rating
            name="text-feedback"
            value={product.rating}
            readOnly
            precision={0.5}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
        </Stack>
      </CardActions>
    </Card>
  );
}
