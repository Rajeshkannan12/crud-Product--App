import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';


function ProductCrud() {
    const [id, setId] = useState("");
    const [productName, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [Product, setUsers] = useState([]);

    useEffect(() => {
        (async () => await Load())();
    }, []);

    async function Load() {
        const result = await axios.get("https://localhost:7101/api/Product/GetProducts");
        setUsers(result.data);
        console.log(result.data);
    }

    async function saveProduct(event) {
        event.preventDefault();
        try {
            await axios.post("https://localhost:7101/api/Product/AddProduct", {
                productName: productName,
                Description: Description,
                amount: amount
            });
            toast.success("Product Successfully Registered");
            setId("");
            setName("");
            setDescription("");
            setAmount("")
            Load();
        } catch (err) {
            alert(err);
        }
    }

    async function editProduct(Product) {
        setName(Product.productName);
        setDescription(Product.description);
        setAmount(Product.amount);
        setId(Product.id);
    }


    async function DeleteProduct(id) {
        await axios.delete("https://localhost:7101/api/Product/DeleteProduct/" + id);
        toast.success("product deleted Successfully");
        setId("");
        setName("");
        setDescription("");
        setAmount("");
        Load();
    }


    async function updateProduct(event) {
        event.preventDefault();
        try {
            await axios.patch("https://localhost:7101/api/Product/UpdateProduct/" + Product.find((u) => u.id === id).id || id,
                {
                    id: id,
                    productName: productName,
                    Description: Description,
                    amount: amount
                }
            );
            toast.success("Product Updated");
            setId("");
            setName("");
            setDescription("");
            setAmount("")
            Load();
        } catch (err) {
            var error = err;
            toast.error("error", error);
            alert(err);
        }
    }

    return (
        <div className="mainStudentContainer">
            <h3 className="heading">Products Details</h3>
            <div className=''>
                <div className="container mt-4 MainContainer" id="MainContainer">
                    <form>
                        <div className="form__group field">
                            <input
                                type="text" required
                                className="form__field"
                                id="productName"
                                value={productName}
                                onChange={(event) => {
                                    setName(event.target.value);
                                }}
                            />
                            <label className="form__label">Product</label>
                        </div>
                        <div className="form__group field">
                            <input
                                type="text"
                                className="form__field"
                                id="Description"
                                value={Description}
                                onChange={(event) => {
                                    setDescription(event.target.value);
                                }}
                            />
                            <label className="form__label">Discription</label>
                        </div>
                        <div className="form__group field">
                            <input
                                type="number"
                                className="form__field"
                                id="amount"
                                value={amount}
                                onChange={(event) => {
                                    setAmount(event.target.value);
                                }}
                            />
                            <label className="form__label">Price</label>
                        </div>

                        <div>
                            <button className="btn btn-primary mt-4" id="saveProduct" onClick={saveProduct}>
                                Add
                            </button>
                            <button className="btn btn-warning mt-4" id="updateProduct" onClick={updateProduct}>
                                Update
                            </button>
                        </div>
                    </form>
                </div>
                <br></br>
                <table className="table table-dark" id="MainTable" align="center">
                    <thead>
                        <tr>
                            <th className='studentId' scope="col">S.no</th>
                            <th scope="col">Product</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Product.map(function fn(product) {
                            return (
                                <tr key={product.id}>
                                    <th className='' scope="row">{product.id}</th>
                                    <td>{product.productName}</td>
                                    <td>{product.description}</td>
                                    <td>{product.amount}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-warning editProduct"
                                            onClick={() => editProduct(product)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger DeleteProduct"
                                            onClick={() => DeleteProduct(product.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default ProductCrud;