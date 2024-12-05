import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements
} from "react-router-dom";

import DetailInfo from "./components/DetailInfo";
import App from "./App";
import TrendingSection from "./components/TrendingSection";
import PurchasePage from "./pages/PurchasePage";
import GalleryPage from "./pages/GalleryPage";
import Signin from "./pages/SigninPage";
import Signup from "./pages/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PurchasedBookPage from "./pages/PurchasedBookPage";
import Layout from "./pages/Layout";


// Configure nested routes with JSX
const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/login" element={<Signin />} />
      <Route path="/register" element={<Signup />} />

        {/* <Route
          path="dashboard"
          element={<Dashboard />}
          loader={({ request }) =>
            fetch("/api/dashboard.json", {
              signal: request.signal,
            })
          }
        /> */}
        {/* <Route element={<AuthLayout />}>
          <Route
            path="login"
            element={<Login />}
            loader={redirectIfUser}
          />
          <Route path="logout" action={logoutUser} />
        </Route> */}
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />  
        <Route path="bookDetails" element={<DetailInfo />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="myBooks" element={<ProtectedRoute >
          <PurchasedBookPage />
        </ProtectedRoute> } />
      </Route>
      
      {/*  ProtectedRoute */}
      <Route path="/purchase" element={<ProtectedRoute ><PurchasePage /></ProtectedRoute>} />
      </>
    )
  );

export default function Routing(){
    return <RouterProvider router={router} />
}