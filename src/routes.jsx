import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements
} from "react-router-dom";

import DetailInfo from "./components/DetailInfo";
import App from "./App";
import GalleryPage from "./pages/GalleryPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import AddBookPage from "./pages/AddBookPage";
import { lazy, Suspense } from "react";

const Signin = lazy(() => import('./pages/SigninPage'))
const Signup = lazy(() => import('./pages/SignupPage'))
const PurchasePage = lazy(() => import('./pages/PurchasePage'))
const PurchasedBookPage = lazy(() => import('./pages/PurchasedBookPage'))
const WishlistPage = lazy(() => import('./pages/WishlistPage'))

// Configure nested routes with JSX
const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/login" element={<Suspense><Signin /></Suspense>} />
      <Route path="/register" element={<Suspense><Signup /></Suspense>} />
      <Route path='/errorPage' element={<ErrorPage />} />
      <Route path="/addBook" element={<AddBookPage />} />
      
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />  
        <Route path="bookDetails" element={<DetailInfo />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="myBooks" element={<ProtectedRoute >
          <PurchasedBookPage />
        </ProtectedRoute> } />
        <Route path="myWish" element={<ProtectedRoute >
          <WishlistPage />
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