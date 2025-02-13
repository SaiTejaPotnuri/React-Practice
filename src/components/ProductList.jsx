import DeleteModel from "../models/DeleteModel";
import FilterProduct from "./FilterProduct";
import { useEffect, useState, useContext,useMemo } from "react";
import "./Products.css";
import ProductsContext from "../context/ProductsContext";

function ProductList(props) {
  let [newProducts, updateProducts] = useState(props.products || []);
  let [products, updateProductList] = useState([]);
  let [filterState, updateFilterState] = useState("All");
  let [showDelModel, updateDelModel] = useState(false);
  let [delProduct, updateDelProduct] = useState({});
  let [searchProductkey, updateSearchProduct] = useState("");

  let page = useContext(ProductsContext);

  // If we make empty array useEffect will run only once when the component is mounted even if component rendered any number of times
  useEffect(() => {
    if (products.length !== props.products.length) {
      updateProductList([...props.products]);
    }
  }, [props.products]);

  useEffect(() => {
    updateProducts(filteredProducts);
  }, [products, filterState]);


  { /** useMemo it is used to memoize the function and it is used for complex or long running functions
    * If you see above search functionality it is taking time to load items so we can use useMemo to solve this problem */}

    const filteredProducts = useMemo(() => {
      if (filterState === "All") {
        return products;
      } else if (filterState === "Available") {
        return products.filter((product) => product.isAvailable === true);
      } else if (filterState === "UnAvailable") {
        return products.filter((product) => product.isAvailable === false);
      }
      return products;
    }, [products, filterState]);


/* This is the useEffect clean up function , this will run when the component unmounts 
  * Initially useEffect runs the setTime out function and after 600ms it will run the clean up function
  * Below is the example that when user trying to search functionality for each key make request 
     below we can achieve that clean up function will run every time user key pressed but setTimeOut will run only once after 600ms
  * After 600ms it will run the clean up function it cleans up the timeOutId & again run the setTimeOut function
*/
  // useEffect(() => {
  //  let timeOutId = setTimeout(() => {
  //     console.log("from setTime function");
  //     searchResults();
  //   }, 600);

  //   return () => {
  //     console.log("from clean up function ");
  //     clearTimeout(timeOutId);
  //   };
  // }, [searchProductkey]);


  const searchResults = useMemo(() => {
    console.log("from useMemo");
    if (searchProductkey?.length > 0) {
      return filteredProducts.filter((product) =>
        product.pName.toLowerCase().includes(searchProductkey.toLowerCase())
      );
    }
    return filteredProducts;
  }, [searchProductkey]);



  useEffect(() => {
    updateProducts(searchResults);
  }, [searchResults]);



  let onFilterSelected = (selected) => {
    updateFilterState(selected);
  };

  let OnDelete = (product) => {
    updateDelModel(true);
    updateDelProduct(product);
  };

  let hideModel = () => {
    updateDelModel(false);
  };

  let onDeleteProduct = () => {
    updateProducts((prev) =>
      prev.filter((product) => product.pId !== delProduct.pId)
    );
    updateProductList((prev) =>
      prev.filter((product) => product.pId !== delProduct.pId)
    );
    updateDelModel(false);
    updateDelProduct({});
    props.onDelItem(delProduct);
  };

  let searchProduct = (eve) => {
    updateSearchProduct(eve.target.value);
  };

  return page.existingPage == "Products" ? <>
    <div className="d-flex align-items-center justify-content-center mt-3">
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Product List</h1>

        <div className="d-flex align-items-center justify-content-center">
          <FilterProduct
            disable={products.length === 0}
            onFilterSelected={onFilterSelected}
          ></FilterProduct>
          <div className="container">
            <div className="row">
              <div className="col-md-12 mx-auto">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search..."
                  aria-label="Search"
                  disabled={products.length === 0}
                  onInput={searchProduct}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul className="list-group">
        <li className="list-group-item mb-1" key="header">
          <div className="row">
            <div className="col-3">
              <div className="fw-bold">Product Name</div>
            </div>
            <div className="col-3">
              <div className="fw-bold">Description</div>
            </div>
            <div className="col-2">
              <div className="fw-bold">Price</div>
            </div>
            <div className="col-2">
              <div className="fw-bold">Status</div>
            </div>
            <div className="col-1">
              <div className="fw-bold">Action</div>
            </div>
          </div>
        </li>

        {newProducts.length === 0 && (
          <li className="list-group-item">No products found</li>
        )}

        {newProducts.length > 0 &&
          newProducts.map((product) => (
            <li
              className="list-group-item"
              key={product.pId}
              style={{
                backgroundColor:
                  !product.isAvailable && filterState === "All"
                    ? "#dedede"
                    : "#FFF",
              }}
            >
              <div className="row">
                <div className="col-3">
                  <div className="fw-bold">{product.pName}</div>
                </div>
                <div className="col-3">
                  <div>{product.pDesc}</div>
                </div>
                <div className="col-2">${product.pPrice}</div>
                <div className="col-2">
                  <span
                    className={
                      product.isAvailable
                        ? "badge bg-success rounded-pill"
                        : " badge bg-danger rounded-pill"
                    }
                  >
                    {product.isAvailable ? "Available" : "Not Available"}
                  </span>
                </div>
                <div
                  className="col-1 d-flex justify-content-center align-items-center "
                  style={{ color: "#ee0c0cbd" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash"
                    viewBox="0 0 16 16"
                    style={{ cursor: "pointer" }}
                    onClick={() => OnDelete(product)}
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                  </svg>{" "}
                </div>
              </div>
            </li>
          ))}
      </ul>
      <DeleteModel
        show={showDelModel}
        product={delProduct}
        hideModel={hideModel}
        onDeleteProduct={onDeleteProduct}
      />
    </div>
    </div>
  </>
  : 
  <></>
}

export default ProductList;
