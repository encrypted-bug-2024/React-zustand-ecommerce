import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Typography } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useCartStore } from "../stores/useCartStore";
import useFromStore from "../hooks/useFromStore";
import Cart from "../cart/Cart";
import { ToggleButton } from "../components/ToggleButton";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

type Anchor = "top" | "left" | "bottom" | "right";

export default function Header() {
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const anchor = "right";
  const context = React.useContext(AuthContext);

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    context.setState({ isAuthenticated: false });
    setAnchorEl(null);
  };

  const navItems = [
    {
      name: (
        <Button
          component={Link}
          to={"/store"}
          size="large"
          sx={{ color: "inherit" }}
        >
          Store
        </Button>
      ),
      link: `/store`,
    },
    {
      name: context.isAuthenticated ? (
        <>
          <Tooltip title={"logged in as demo"}>
            <IconButton size="large" onClick={handleMenu} color="inherit">
              <AccountCircle />
            </IconButton>
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Orders</MenuItem>
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
          </Menu>
        </>
      ) : (
        <Button
          component={Link}
          to={"/login"}
          size="large"
          sx={{ color: "inherit" }}
        >
          Login
        </Button>
      ),
      //link: `/login`
      link: context.isAuthenticated ? handleMenu : `/login`,
    },
  ];

  return (
    <Box component={"div"} sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          boxShadow: "none",
          direction: "row",
          flexDirection: "column",
        }}
      >
        <Toolbar>
          <Box
            component={Link}
            to={"/"}
            sx={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src="mystore.png"
              alt="Logo"
              height="100"
              style={{ marginRight: "10px", height: "40px" }}
            />
            <Typography
              variant="h4"
              noWrap
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              MySTORE
            </Typography>
          </Box>

          {/* <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
            <Typography
              variant="h4"
              noWrap
              sx={{
                flexGrow: 1,
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              MySTORE
            </Typography>
          </Link> */}

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { md: "flex" } }}>
            <Box sx={{ display: { md: "flex" }, mt: 1 }}>
              {navItems.map((item, index) => (
                // <Link
                //   key={index}
                //   to={item.link}
                //   style={{ textDecoration: "none", color: "inherit" }}
                // >
                <>{item.name}</>

                // </Link>
              ))}
              <Tooltip title={"Shopping cart"}>
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={toggleDrawer(anchor, true)}
                >
                  <Badge badgeContent={cart && cart.length} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <ToggleButton />
            </Box>

            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              <Cart onClick={toggleDrawer(anchor, false)} />
            </SwipeableDrawer>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
