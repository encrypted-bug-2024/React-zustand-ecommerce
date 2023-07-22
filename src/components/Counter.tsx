import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCartStore } from "../stores/useCartStore";

export default function Counter({ product }: any) {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Stack direction="row" justifyContent="flex-end">
      <Button
        disabled={product.quantity === 0}
        onClick={() => removeFromCart(product)}
      >
        <RemoveIcon />
      </Button>
      <Typography variant="h6" align="right">
        {product.quantity}
      </Typography>
      <Button onClick={() => addToCart(product)}>
        <AddIcon />
      </Button>
    </Stack>
  );
}
