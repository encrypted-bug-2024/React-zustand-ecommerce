import * as React from "react";
import { Product } from "../types";
import { useCartStore } from "../stores/useCartStore";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Stack } from "@mui/material";
import Counter from "../components/Counter";

interface Props {
  product: Product;
}

export default function CartItem({ product }: Props) {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart
  );

  return (
    <Card sx={{ maxWidth: 300, margin: 1 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          src={product.images[0]}
          alt={product.title}
          width={100}
          height={100}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>

          <Grid container sx={{ justifyContent: "space-between" }}>
            <Grid item xs={6}>
              <Typography variant="h6" align="left">
                Price
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" align="right">
                ${product.price}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" align="left">
                Quantity
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Counter product={product} />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <IconButton
            size="large"
            color="inherit"
            onClick={() => removeProductFromCart(product)}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
