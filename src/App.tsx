import * as React from "react";
import { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import ListSkeleton from "./ListSkeleton";
import { useProductsStore } from "./stores/useProductsStore";
import ProductList from "./products/ProductList";
import ProductDetail from "./products/ProductDetail";
import Header from "./components/Header";
import { ColorContext } from "./ColorContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from "./checkout/Checkout";
import Login from "./auth/Login";
import { Banner } from "./components/Banner";
import Footer from "./components/Footer";
import { Promotions } from "./components/Promotions";
import { AuthContextProvider } from "./context/AuthContextProvider";

export default function App() {
  const { products, isLoading, error, fetchData } = useProductsStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        console.log(mode);
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      }
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode
        }
      }),
    [mode]
  );

  return (
    <ColorContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthContextProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Banner />
                    <Promotions />
                    {isLoading ? (
                      <ListSkeleton />
                    ) : (
                      <ProductList products={products} />
                    )}
                  </>
                }
              />
              <Route
                path="/store"
                element={
                  isLoading ? (
                    <ListSkeleton />
                  ) : (
                    <ProductList products={products} />
                  )
                }
              />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </AuthContextProvider>
      </ThemeProvider>
    </ColorContext.Provider>
  );
}
