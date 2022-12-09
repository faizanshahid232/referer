import React from "react";
import "./index.css";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import ls from "local-storage";

import "./App.css";
import Header from "./components/Header";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { StrictMode } from "react";
import Web3 from "web3";
import SuccessFailure from "./components/SuccessFail";
import Fail from "./components/Fail";
import ErrorPage from "../src/components/ErrorPage";

require("dotenv").config();

//To disable log on production
if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    errorElement: <ErrorPage />,
  },
  {
    path: "success",
    element: <SuccessFailure />,
    errorElement: <ErrorPage />,
  },
  {
    path: "fail",
    element: <Fail />,
    errorElement: <ErrorPage />,
  },
]);

const getLibrary = (provider) => {
  return new Web3(provider);
};
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <RouterProvider router={router} />
    </Web3ReactProvider>
  </StrictMode>
);
