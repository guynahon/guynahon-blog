import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import {HomePage} from "./Pages/HomePage";
import {ArticleSubjectPage} from "./Pages/ArticleSubjectPage";
import {SingleArticlePage} from "./Pages/SingleArticlePage";
import React from "react";
import {Admin} from "./Pages/AdminPage";

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
                path: "/subject", // => /:subject when we learn it (for the navigation)
                element: <ArticleSubjectPage />,
            },
            {
                path: "/subject/:id", // => /:subject/:id when we learn it (for the navigation)
                element: <SingleArticlePage />,
            },
            {
                path: "/admin",
                element: <Admin />,
            },
        ]
    },

]);