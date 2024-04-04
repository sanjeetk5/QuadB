import React from "react";
import { Route, Routes } from "react-router-dom";

import Landing from "../pages/Landing";
import Register from "../pages/Register";
import Login from "../pages/Login";
import GetUser from "../pages/GetUser";

import PrivateRoutes from "./PrivateRoutes";
import TaskInput from "../pages/TaskInput";
import TaskList from "../pages/TaskList";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} scrollToTop />
      <Route path="/signin" element={<Login />} scrollToTop />
      <Route path="/signup" element={<Register />} scrollToTop />
      <Route path="user-details" element={<GetUser />} />
      <Route
        path="/task"
        element={
          <PrivateRoutes>
            <TaskInput />
          </PrivateRoutes>
        }
      />
      <Route
        path="/usertask"
        element={
          <PrivateRoutes>
            <TaskList />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
};

export default MainRoutes;
