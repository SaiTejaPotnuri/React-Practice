import ProductHeader from "./ProductHeader";
import ProductList from "./ProductList";
import CreateProduct from "./CreateProduct";
import { useContext, useState, useCallback } from "react";
import ContactDetials from "./ContactDetials";
import Authenticate from "../context/AuthContext";
import ProductsContext from "../context/ProductsContext";
import React from "react";
function ProductsDashboard(props) {
  let [products, updateProducts] = useState([]);
  let [page, updatePage] = useState("Add Product");
  let auth = useContext(Authenticate);

  {/**Here we make use of useCallback , it will not re-render when the component re-renders 
    * When the parent having any state changes as react it re-renders all the child components
    * But when we use useCallback it looks for if any change in value & method then only it weill re-render */}

  const newProduct = useCallback((productInfo) => {
    updateProducts((prev) => [
      ...prev,
      { ...productInfo, pId: prev.length + 1 }
    ]);
        updatePage("Products");

  }, []);

  const pageChange = useCallback((newPage) => {
    updatePage(newPage);
  }, []);

  const newProductList = useCallback((item) => {
    updateProducts((prev) => 
      prev.filter((product) => product.pId !== item.pId)
    );
  }, []);


  return !auth.isLoggedIn ? (
    <></>
  ) : (
    <>
      <div className="container">
        <div className="products-header">
          <ProductHeader
            onPageChange={pageChange}
            existingPage={page}
          ></ProductHeader>
        </div>

        <ProductsContext.Provider value={{ existingPage: page , onPageChange:pageChange }}>
          <CreateProduct newProduct={newProduct} />
          <ProductList products={products} onDelItem={newProductList} />
          <ContactDetials />
        </ProductsContext.Provider>
      </div>
    </>
  );
}

export default ProductsDashboard;
