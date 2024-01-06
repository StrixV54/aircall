// CallDetail.jsx

import React from "react";
import { Drawer, IconButton, Box, Typography, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CallIcon from "@mui/icons-material/Call";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoIcon from "@mui/icons-material/Info";
import { formatDuration, formatTime, formatDate } from "../util/helper.js";

const CallDetail = ({ call, open, onClose }) => {
  if (!call) return null;

  const startTime = new Date(call.created_at);
  const endTime = new Date(startTime.getTime() + call.duration * 1000);

  return (
    <div
      style={{
        display: open ? `block` : `none`,
        position: "absolute",
        top: 0,
        left: 0,
        background: "white",
        height: "100%",
        width: "100%",
        zIndex: 1000,
      }}
    >
      <Box sx={{ padding: "40px 20px" }}>
        <IconButton
          onClick={onClose}
          size="large"
          sx={{ position: "absolute", right: 8, top: 30 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Call Detail
        </Typography>

        <Divider />

        <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
          <CallIcon color="primary" size="large" />
          <Typography variant="subtitle1" ml={1} fontSize={"1.5rem"}>
            {"+" + call.from}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center" mt={3}>
          <InfoIcon color="primary" size="large" />
          <Typography variant="subtitle1" ml={1}>
            {"tried to call on " + call.to}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
          <InfoIcon color="primary" size="large" />
          <Typography variant="subtitle1" ml={1}>
            {"Direction: " + call.direction + " ,Type: " + call.call_type}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center" mt={3}>
          <CalendarTodayIcon color="primary" />
          <Typography variant="subtitle1" ml={1}>
            Date: {formatDate(call.created_at)}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
          <AccessTimeIcon color="primary" />
          <Typography variant="subtitle1" ml={1}>
            Time: {formatTime(call.created_at)}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
          <AccessTimeIcon color="primary" />
          <Typography variant="subtitle1" ml={1}>
            Duration: {formatDuration(call.duration)}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
          <AccessTimeIcon color="primary" />
          <Typography variant="subtitle1" ml={1}>
            Started at: {formatTime(startTime)}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
          <AccessTimeIcon color="primary" />
          <Typography variant="subtitle1" ml={1}>
            Ended at: {formatTime(endTime)}
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default CallDetail;
