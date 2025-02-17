// src/routes/AppRoutes.jsx
import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import Forms from "../components/Forms";
import CreateProduct from "../components/CreateProduct";
import ProductList from "../components/ProductList";
import ProtectedRoute from "./ProtectedRoute";
import ProductsDashboard from "../components/ProductsDashboard";
import ContactDetials from "../components/ContactDetials";
import RootLayout from "./RootLayout";

const AppRouting = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route index element={<Forms />} />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <ProductsDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="add_products" replace />} />
        <Route path="add_products" element={<CreateProduct />} />
        <Route path="list_products" element={<ProductList />} />
        <Route path="contact_details" element={<ContactDetials />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  )
);

export default AppRouting;