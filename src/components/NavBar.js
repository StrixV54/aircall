import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AppsIcon from "@mui/icons-material/Apps";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

export default function Navbar() {
  const [value] = React.useState(0);

  return (
    <Box
      sx={{
        width: "100%",
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: 100,
        border: "1px solid #e1e1e1",
        boxShadow: "0px -0px 10px #e1e1e1",
      }}
    >
      <BottomNavigation fixed value={value}>
        <BottomNavigationAction
          label="Call"
          icon={<LocalPhoneOutlinedIcon />}
        />
        <BottomNavigationAction
          label="Profile"
          icon={<Person2OutlinedIcon />}
        />
        <BottomNavigationAction
          label="Numpad"
          disableRipple
          sx={{ paddingTop: "0px" }}
          icon={
            <Box
              sx={{
                height: "60px",
                width: "60px",
                backgroundColor: "green",
                position: "absolute",
                top: -20,
                borderRadius: "50%",
                border: "8px solid white",
                boxShadow: "0px 0px 5px #d3d3d3",
              }}
            >
              <AppsIcon
                sx={{ color: "white", marginTop: "15px", fontSize: "1.8rem" }}
              />
            </Box>
          }
        />
        <BottomNavigationAction
          label="Settings"
          icon={<SettingsOutlinedIcon />}
        />
        <BottomNavigationAction
          label="Status"
          icon={<RadioButtonCheckedIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
