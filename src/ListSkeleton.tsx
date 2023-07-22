import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function ListSkeleton() {
  return (
    <Box sx={{ flexGrow: 1, height: "100%" }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Array.from(new Array(6)).map((item, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
              <Skeleton variant="rectangular" width={400} height={318} />
              <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
