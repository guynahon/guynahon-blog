import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import {HomePage} from "./Pages/HomePage";
import {ArticleSubjectPage} from "./Pages/ArticleSubjectPage";
import {SingleArticlePage} from "./Pages/SingleArticlePage";
import React from "react";
import {Admin} from "./Pages/AdminPage";
import {ProfilePage} from "./Pages/ProfilePage"

// routing system for easy navigation the /article/:id path is a dynamic path by id
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <HomePage/>
            },
            {
                path: "/subjects/:subject",
                element: <ArticleSubjectPage />,
            },
            {
                path: "/article/:id",
                element: <SingleArticlePage />,
            },
            {
                path: "/admin",
                element: <Admin />,
            },
            {
                path: "/profile/:id",
                element: <ProfilePage />
            }
        ]
    },

]);