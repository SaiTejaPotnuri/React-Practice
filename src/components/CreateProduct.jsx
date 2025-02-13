import { useContext, useState  } from "react";
import ProductsContext from "../context/ProductsContext";


function CreateProduct(props){

    let page = useContext(ProductsContext);
    let [product,setProduct] = useState({
        pName : "",
        pPrice : 0,
        pDesc : "",
        isAvailable : false
    })


   let  addNewProduct = (eve) =>{
    eve.preventDefault();
        let item = {
            pName : product?.pName,
            pPrice : Number(product?.pPrice),
            pDesc : product?.pDesc,
            isAvailable : Boolean(product?.isAvailable)
        }
        props.newProduct(item);
        setProduct({
            pName : "",
            pPrice : 0,
            pDesc : "",
            isAvailable : false
        })

    }

    let updateName = (eve) =>{
        setProduct((prevState) => {
            return {
                ...prevState,
                pName : eve.target.value
            }
        })
    }

    let updatePrice = (eve) => {
        setProduct((prevState) => {
            return {
                ...prevState,
                pPrice : eve.target.value
            }
        })
    }

    let updateDescription = (eve) => {
        setProduct((prevState) => {
            return {
                ...prevState,
                pDesc : eve.target.value
            }
        })
    }

    let updateAvilability = (eve) => {
        setProduct((prevState) => {
            return {
                ...prevState,
                isAvailable : eve.target.checked
            }
        })
    }

    return page.existingPage === "Add Product" ? <> 
        <div className="d-flex align-items-center justify-content-center mt-3">
         <div className="card mb-4" style={{width: "30rem"}}>
            <div className="card-header">
                <h4 className="mb-0">Add New Product</h4>
            </div>
            <div className="card-body">
                <form id="productForm" onSubmit={addNewProduct}>
                    <div className="mb-3">
                        <label htmlFor="productName" className="form-label">Product Name</label>
                        <input type="text" value={product.pName} onChange={updateName} className="form-control" id="productName" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productPrice" className="form-label">Product Price</label>
                        <input type="number" value={product.pPrice} onChange={updatePrice} className="form-control" id="productPrice" step="0.01" min="0" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productDescription" className="form-label">Description</label>
                        <textarea className="form-control" value={product.pDesc} onChange={updateDescription} id="productDescription" rows="3" required></textarea>
                    </div>
                    <div className="mb-3 form-check form-switch">
                        <input className="form-check-input" checked={product.isAvailable} onChange={updateAvilability} type="checkbox" id="isAvailable" />
                        <label className="form-check-label" htmlFor="isAvailable">Available</label>
                    </div>
                    <div className=" w-full d-flex align-items-center justify-content-end">
                    <button type="submit" className="btn btn-primary">Add Product</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    </>
    :
    <></>
}

export default CreateProduct;