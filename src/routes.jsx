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
import AuthorPage from "./pages/AuthorPage";
import Fallback from "./utility/components/Fallback";
import WishlistPage from "./pages/WishlistPage";
import PurchasedBookPage from "./pages/PurchasedBookPage";
import RatePage from "./pages/RatePage";

const Signin = lazy(() => import('./pages/SigninPage'))
const Signup = lazy(() => import('./pages/SignupPage'))
const PurchasePage = lazy(() => import('./pages/PurchasePage'))

// Configure nested routes with JSX
const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/login" element={<Suspense fallback={<Fallback loader={'watch'} />}><Signin /></Suspense>} />
      <Route path="/register" element={<Suspense fallback={<Fallback loader={'watch'} />}><Signup /></Suspense>} />
      <Route path='/errorPage' element={<ErrorPage />} />
      <Route path="/addBook" element={<AddBookPage />} />
      
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<App />} />  
        <Route path="bookDetails" element={<DetailInfo />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path='author/:id' element={<AuthorPage />} />
        <Route path='rate' element={<RatePage />} />
        <Route path="myBooks" element={<ProtectedRoute >
          <PurchasedBookPage />
        </ProtectedRoute> } />
        <Route path="myWish" element={<ProtectedRoute >
          <WishlistPage />
        </ProtectedRoute> } />
      </Route>
      
      {/*  ProtectedRoute */}
      <Route path="/purchase" element={
        <ProtectedRoute >
          <Suspense fallback={<Fallback loader={'watch'} />}>
            <PurchasePage />
          </Suspense>
        </ProtectedRoute>} />
      </>
    )
  );

export default function Routing(){
    return <RouterProvider router={router} />
}