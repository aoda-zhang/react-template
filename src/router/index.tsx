import React from "react";
import { Navigate, RouteObject } from "react-router-dom";

import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import History from "@/pages/History";
import Home from "@/pages/Home";
import Setting from "@/pages/Setting";
import ErrorPage from "@/pages/Error";
import Map from "@/pages/Map";
import EditMap from "@/pages/Map/EditMap";
import ViewMap from "@/pages/Map/ViewMap";

const routerList: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "map",
    element: <Map />,
    children: [
      {
        path: "edit",
        element: <EditMap />,
      },
      {
        path: "view",
        element: <ViewMap />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "history",
    element: <History />,
  },
  {
    path: "error",
    element: <ErrorPage />,
  },
  {
    path: "setting",
    element: <Setting />,
    children: [
      {
        path: "setting/a",
        element: <div>内容A</div>,
      },
      {
        path: "setting/b",
        element: <div>内容B</div>,
      },
      {
        path: "setting/*",
        element: <Navigate to={"/setting/a"} replace />,
      },
    ],
  },
  {
    path: "*",
    element: <Home />,
  },
];
export default routerList;
