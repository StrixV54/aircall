import React from "react";
import { Divider } from "@mui/material";

const DateDivider = ({ date }) => {
  return (
    <Divider textAlign="center" sx={{ my: 1, textTransform: "capitalize" }}>
      {date}
    </Divider>
  );
};

export default DateDivider;
