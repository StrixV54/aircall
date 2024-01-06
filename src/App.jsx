import React from "react";
import ReactDOM from "react-dom";
import ActiveCallLogs from "./components/CallLog.js";
import ArchivedCalls from "./components/ArchivedLog.js";
import Header from "./Header.jsx";
import { useState } from "react";
import Navbar from "./components/NavBar.js";

const App = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <div className="container">
      <Header
        className="header"
        currentTab={currentTab}
        handleTabChange={handleTabChange}
      />
      <div className="section">
        {currentTab === 0 && <ActiveCallLogs />}
        {currentTab === 1 && <ArchivedCalls />}
      </div>
      <Navbar className="navbar" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
