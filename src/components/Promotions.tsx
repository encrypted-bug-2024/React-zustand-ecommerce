import { Slide, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Box, styled } from "@mui/system";
import { Colors } from "../theme";

const PromotionsContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    padding: "40px 0px 40px 0px"
  },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px 0px 20px 0px",
  overflow: "hidden",
  background: Colors.dim_grey
}));

const MessageText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Montez", "cursive"',
  [theme.breakpoints.up("md")]: {
    fontSize: "3rem"
  },
  color: Colors.white,
  fontSize: "1.5rem"
}));

const messages = [
  "30% off on your first order!",
  "Summer sale starts now, visit any store.",
  "Please like and subscribe :)"
];

export const Promotions = () => {
  const containerRef = useRef();
  const [show, setShow] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 3000);
    const intervalId = setInterval(() => {
      // get next message
      setMessageIndex((i) => (i + 1) % messages.length);

      // slide the message in
      setShow(true);

      setTimeout(() => {
        setShow(false);
      }, 3000);
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <PromotionsContainer ref={containerRef} overflow="hidden">
      <Slide
        direction={show ? "left" : "right"}
        in={show}
        container={containerRef.current}
        timeout={{
          enter: 500,
          exit: 100
        }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <MessageText>{messages[messageIndex]}</MessageText>
        </Box>
      </Slide>
    </PromotionsContainer>
  );
};
