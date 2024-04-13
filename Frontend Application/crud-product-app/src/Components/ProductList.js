import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
//import './Css/Custom.css';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




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
      toast.success("Successfully Registered");
      setId("");
      setName("");
      setDescription("");
      Load();
    } catch (err) {
      alert(err);
    }
  }

  async function editProduct(Product) {
    setName(Product.productName);
    setDescription(Product.Description);
    setAmount(Product.amount);
    setId(Product.id);
  }


  async function DeleteProduct(id) {
    await axios.delete("https://localhost:7101/api/Product/DeleteProduct" + id);
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
      toast.success("Registration Updated");
      setId("");
      setName("");
      setDescription("");
      //setAmount("");

      Load();
    } catch (err) {
      var error= err;
      toast.error("error", error);
       alert(err);
    }
  }

  return (
    <div className="mainStudentContainer">
      <h3 class="heading">Basic Details</h3>
     <div class='d-flex'>
      <div class="container mt-4 MainContainer" id="MainContainer">
        <form>
          <div class="form-group">

            <input
              type="text" required hidden
              class="form-control"
              id="mainFieldId"
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />

            <label>Student Name</label>
            <input
              type="text" required
              class="form-control"
              id="stname"
              value={stname}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>Course</label>
            <input
              type="text"
              class="form-control"
              id="course"
              value={course}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>AmountDetails</label>
            <input
              type="number"
              class="form-control"
              id="amount"
              value={amount}
              onChange={(event) => {
                setAmount(event.target.value);
              }}
            />
          </div>
          <div>
            <button class="btn btn-primary mt-4" id="registerBtn" onClick={saveProduct}>
            <FontAwesomeIcon icon="fa-solid fa-plus" />
            </button>
            <button class="btn btn-warning mt-4" id="updateBtn" onClick={updateProduct}>
            <FontAwesomeIcon icon="edit" />
            </button>
          </div>
        </form>
      </div>
      <br></br>

      <table class="table table-dark" id="MainTable" align="center">
        <thead>
          <tr>
            <th scope="col">Profile</th>
            <th class='studentId' scope="col">Student Id</th>
            <th scope="col">Student Name</th>
            <th scope="col">Course</th>
            <th scope="col">AmountDetails</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        {Product.map(function fn(student) {
          return (
            <tbody>
              <tr>
                <th class='' scope="row"><img alt={`image`} src={ProfileDummyImage} width={"40px"} height={"40px"}></img></th>
                <th class='' scope="row">{Product.id} </th>
                <td>{Product.stname}</td>
                <td>{Product.course}</td>
                <td>{Product.amount}$</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => editStudent(Product)}
                  >
                    
                    <FontAwesomeIcon icon="edit" />
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => DeleteProduct(Product.id)}
                  >
                   <FontAwesomeIcon icon="trash" />
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>

    </div>
    </div> 
  );
}

export default ProductCrud;