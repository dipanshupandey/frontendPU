import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import ReactDOM from "react-dom/client";
import {createBrowserRouter} from "react-router";
import { RouterProvider } from 'react-router/dom';
import Home from './pages/Home.jsx';
import Chat from "./pages/Chat.jsx";
import Auth from "./pages/Auth.jsx";
const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        path:"chat",
        element: <Chat/>
      },
      {
        path:"login",
        element: <Auth/>
      }
    ]
  }
]);
const root=document.getElementById('root');
ReactDOM.createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
