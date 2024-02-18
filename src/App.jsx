import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import Error from "./components/Error.jsx";
import Quiz from "./components/Quiz.jsx";
import Thematic from "./components/Thematic.jsx";
import UserResults from "./components/UserResults.jsx";
import UserRating from "./components/UserRating.jsx";
import About from "./components/About.jsx";

const route = createBrowserRouter(
    [{
        path: "/",
        element: <Layout />,
        errorElement: <Error />,
        children: [
            {path: "/quiz", element: <Quiz/>},
            {path: "/raiting", element: <UserRating/>},
            {path: "/thematic", element: <Thematic/>},
            {path: "/results", element: <UserResults/>},
            {path: "/about", element: <About/>}
        ]
    }]
);

function App() {

  return (
            <>
                <RouterProvider router={route} />
            </>
  )
}

export default App



