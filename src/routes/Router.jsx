import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Auth/Register/Register";

export const router = createBrowserRouter([
  {
    path:'/',
    Component: RootLayout,
    children:[
      {
        index: true,
        Component: Home
      },
      {
        path:'/login',
        Component: Register
      }
    ]
  }
])
