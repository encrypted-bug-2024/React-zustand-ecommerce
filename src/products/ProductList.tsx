import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ProductCard from "./ProductCard";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { Product } from "../types";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  const [filterValue, setFilterValue] = React.useState("");

  const categories = products.map((item) => item.category);
  const uniqueCategories = [...new Set(categories)];

  const filteredProducts = products.filter((p) => p.category === filterValue);
  const productList = filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        sx={{ mb: 4 }}
      >
        {uniqueCategories.map((item, index) => {
          return (
            <Button
              key={index}
              variant={filterValue === item ? "contained" : "outlined"}
              onClick={(e) => setFilterValue(item)}
            >
              {item}
            </Button>
          );
        })}
        <Button variant="outlined" onClick={(e) => setFilterValue("")}>
          RESET FILTER
        </Button>
      </Stack>

      <Grid container spacing={4}>
        {productList.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
