import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  IconButton,
  Collapse,
  ListSubheader,
  Badge,
  ListItemAvatar,
  Avatar,
  Button,
  Box,
} from "@mui/material";

import ArchiveIcon from "@mui/icons-material/Archive";
import PhoneMissedIcon from "@mui/icons-material/PhoneMissed";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import VoicemailIcon from "@mui/icons-material/Voicemail";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InfoIcon from "@mui/icons-material/Info";

import {
  fetchCalls,
  archiveCall,
  archiveAllCalls,
} from "../util/apiHandler.js";
import {
  groupCallsByDate,
  formatTime,
  formatDuration,
} from "../util/helper.js";
import DateDivider from "../util/helperMui.js";
import CallDetail from "./CallInfo.js";

// Icons for different call types
const callTypeIcons = {
  missed: <PhoneMissedIcon style={{ color: "red" }} />,
  answered: <PhoneInTalkIcon style={{ color: "green" }} />,
  voicemail: <VoicemailIcon style={{ color: "orange" }} />,
};

const ActiveCallLogs = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [archivedIds, setArchivedIds] = useState(new Set());
  const [selectedCall, setSelectedCall] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchCalls()
      .then((data) => {
        const unarchivedCalls = data.filter((call) => !call.is_archived);
        setCalls(unarchivedCalls);
      })
      .catch((err) => {
        console.error("Error fetching calls:", err);
        setError(err.message || "An error occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleArchive = (callId) => {
    setArchivedIds(new Set(archivedIds).add(callId)); // Add to archived set for animation
    archiveCall(callId)
      .then(() => {
        // Filter out the archived call after animation
        setTimeout(() => {
          setCalls((prevCalls) =>
            prevCalls.filter((call) => call.id !== callId)
          );
          setArchivedIds((prevArchivedIds) => {
            const newArchivedIds = new Set(prevArchivedIds);
            newArchivedIds.delete(callId);
            return newArchivedIds;
          });
        }, 300); // Duration of the animation
      })
      .catch((err) => {
        console.error("Error archiving call:", err);
        setError(err.message || "An error occurred");
      });
  };

  const handleArchiveAll = () => {
    setLoading(true); // Show loading indicator during the operation
    archiveAllCalls(calls)
      .then(() => {
        setCalls([]); // Clear out all calls as they are all archived
        setLoading(false); // Hide loading indicator after operation
      })
      .catch((err) => {
        console.error("Error archiving all calls:", err);
        setError(err.message || "An error occurred");
        setLoading(false);
      });
  };

  const handleSelectCall = (call) => {
    setSelectedCall(call);
    setDrawerOpen(true); // Open the drawer when a call is selected
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false); // Close the drawer
  };

  const toggleOptions = (callId) => {
    setExpandedId(expandedId === callId ? null : callId);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  if (error) return <p>Error loading calls: {error}</p>;

  const groupedCalls = groupCallsByDate(calls);
  if (groupedCalls.length === 0)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <p style={{ textAlign: "center" }}>There are no Active calls Logs</p>
      </div>
    );
  else
    return (
      <div>
        <Button
          sx={{ marginTop: "1rem", textTransform: "none" }}
          size="large"
          fullWidth
          variant="outlined"
          endIcon={<ArchiveIcon />}
          onClick={() => handleArchiveAll()}
        >
          Archive All Calls
        </Button>
        <List>
          {groupedCalls.map((group) => (
            <li key={group.date}>
              <ul>
                <DateDivider date={group.date} />
                {group.calls.map((call) => (
                  <Collapse in={!archivedIds.has(call.id)} key={call.id}>
                    <ListItem
                      sx={{
                        border: "1px solid gray",
                        borderRadius: "5px",
                        "&:hover, &:focus": {
                          backgroundColor: "#f0f0f0",
                        },
                        margin: "0.3rem",
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "transparent" }}>
                          {callTypeIcons[call.call_type]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Badge
                            badgeContent={call.count > 1 ? call.count : null}
                            color="primary"
                          >
                            <span>{`+${call.from}`}</span>
                          </Badge>
                        }
                        secondary={`tried to call on ${call.to}`}
                      />

                      <Collapse
                        in={expandedId === call.id}
                        timeout="auto"
                        unmountOnExit
                      >
                        <IconButton
                          edge="end"
                          onClick={() => handleSelectCall(call)}
                        >
                          <InfoIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          onClick={() => handleArchive(call.id)}
                        >
                          <ArchiveIcon />
                        </IconButton>
                      </Collapse>

                      <IconButton onClick={() => toggleOptions(call.id)}>
                        <MoreVertIcon />
                      </IconButton>

                      <span
                        style={{ marginLeft: "auto", fontSize: "0.875rem" }}
                      >
                        {formatTime(call.created_at)}
                      </span>
                    </ListItem>
                  </Collapse>
                ))}
              </ul>
            </li>
          ))}
        </List>
        <CallDetail
          call={selectedCall}
          open={drawerOpen}
          onClose={handleCloseDrawer}
        />
      </div>
    );
};

export default ActiveCallLogs;
