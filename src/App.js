import "./App.css";
import logo from "./logo.png";
import React, {useState, useEffect} from "react";
import {Products} from "./Products"
import {Categories} from "./Categories";

import { findRenderedDOMComponentWithTag } from "react-dom/test-utils";
//import {cart,setCart,removeFromCart,addToCart,el} from "./Shop"


export const App = () => {

const [cart, setCart]  = useState([]);
const[cartTotal, setCartTotal] = useState([0]);
const [ProductsCategory, setProductsCategory] = useState(Products);
const [pageView, changePageView]= useState("browse");
const [query, setQuery] = useState('');
/*const [paymentInfo, setPaymentInfo] = useState([
  name:'';
  email:'';
  card:'';
  address:'';
  city:'';
  state:'';
  zip:'';
]);
*/

useEffect(() => {
  total();
}, [cart]);

const total = () => {
  let totalVal = 0;
  for (let i = 0; i < cart.length; i++){
      totalVal += cart[i].price;
  }
  setCartTotal(totalVal);
  
}


const addToCart = (el) => {
  setCart([...cart,el]);
};
const removeFromCart = (el) => {
      let itemFound = false;
      const updatedCart = cart.filter((cartItem) => {
        if (cartItem.id === el.id && !itemFound) {
        itemFound = true;
        return false;
        }
     return true;
      });
        if (itemFound) {
        setCart(updatedCart);
       }
  };

const cartItems = cart.map((el) =>(
  <div key = {el.id}>
      <img className = "img-fluid" src={require(`${el.image}`)} width ={30}/>
      {el.title}
      ${el.price}

  </div>
))

function howManyofThis(id){
  let hmot = cart.filter((cartItem)=> cartItem.id === id);
  return hmot.length;
}

const listItems = Products.map((el) => (
  
  <div className = "row border-top border-bottom" key = {el.id}>

      <div className = "row main align-items-center">
          <div className = "col-2">
              <img className = "img-fluid" src = {require(`${el.image}`)} />

          </div>
          <div className = "col">
              <div className = "row text-muted">{el.title}</div>
              <div className = "row">{el.category}</div>

          </div>
          <div className = "col">
              <button type = "button" variant = "light" onClick={() => removeFromCart(el)}> - </button>{" "}
              <button type = "button" variant = "light" onClick={() => addToCart(el)}> + </button>

          </div>
          <div className = "col">
              ${el.price}<span className = "close">&#10005;</span>{howManyofThis(el.id)}
          
          </div>
      </div>
  </div>
  
 ))




  const handleChange = (e) => {
   
    setQuery(e.target.value);
    console.log("Step 6 : in handleChange, Target Value :",e.target.value,"  Query Value :",query);
    const results = Products.filter(eachProduct => {
    if (e.target.value === "") return ProductsCategory;
      return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase())
    });
    setProductsCategory(results);
     
  }

  function handleClick(tag){
    let filtered = Products.filter(cat => cat.category === tag);
    setProductsCategory(filtered);
  };
  
  const render_nav_browse = (Categories) => {
    return(
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div class="container-fluid">
          <a class="navbar-brand" href="./index.html">P&P</a>


          <button type='button' className='btn btn-danger m-4' onClick={e => changePageView("cart")}>Checkout</button>

          <div className="py-10">
            <input type="search" value={query} onChange={handleChange} />
          </div>
          <button type = 'button' className ='btn btn-danger m-4' onClick={()=> handleClick('Plants')}>Plants</button>
          <button type = 'button' className ='btn btn-danger m-4' onClick={()=> handleClick('Pots')}>Pots</button>
      

          <div class="collapse navbar-collapse" id="navbarCollapse">
              <ul class="navbar-nav me-auto mb-2 mb-md-0">
                
                  
                 
              </ul>
          </div>
      </div>


  </nav>
  )}
  const render_nav_cart = () => {
    return(
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div class="container-fluid">
          <a class="navbar-brand" href="./index.html">P&P</a>


          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
          <button type='button' className='btn btn-danger m-4' onClick={e => changePageView("browse")}>Close</button>
          <div class="collapse navbar-collapse" id="navbarCollapse">
              <ul class="navbar-nav me-auto mb-2 mb-md-0">
                
                 
                  
                
               
                 
              </ul>
          </div>
      </div>


  </nav>
  )}
  const render_browse = (ProductsCategory) => { 
    //


        return <div>
        
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">Products ({ProductsCategory.length})</h2>
    
          <div className="container" style={{ maxHeight: '800px' }}>
          
            {ProductsCategory.map((product, index) => (
              
              
              <div key={index} className="col" >
                <div className="cardP">
                  <img
                    alt="Product Image"
                    src= {require(`${product.image}`)}
                    className="card-img-top"
                  />
                  <h3 className = "card-text">
                  <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        <span style={{ fontSize: '16px', fontWeight: '600' }}>{product.title}</span>
                      </a>
                     
                  </h3>
                  <p className ="card-text">Rating: {product.rating.rate}</p>
                  <p className="card-text">${product.price}</p>
                  <p className = "card-text">Quantity: {howManyofThis(product.id)}</p>
                  <button type = "button" variant = "light" onClick={() => addToCart(product)}>Add to Cart + </button>
                  <button type = "button" variant = "light" onClick={() => removeFromCart(product)}>Remove from Cart - </button>{" "}
                  
    
                 
                  
                </div>
                <div>
                  <div>
                    
                  </div>
                
                </div>
              </div>
              
            ))}
            </div>
      </div>
    }
  const render_cart = () => {
    return (
       
       
      <div className = "cartHold">
           
          <div  >
              <div >
                  <div >
                      <div className = "title">
                          <div className = "row">
                              <div className = "col">
                                  <h4>
                                      <b>319 Shopping Cart</b>
                                      <button type='button' className='btn btn-danger m-4' onClick={e => changePageView("browse")}>Close</button>
                                  </h4>
                              </div>
                              <div className = "col align-self-center text-right text-muted">
                                  Products selected {cart.length}

                              </div>
                          </div>
                      </div>

                      <div>{listItems}</div>
                  </div>
                  <div className ="float-end">
                      <p className = "mb-0 me-5 d-flex align-items-center">
                          <span className ="small text-muted me-2">Order total:</span>
                          <span className = "lead fw-normal">${cartTotal}</span>
                          <button type='button' className='btn btn-danger m-4' onClick={e => changePageView("formValid")}>Proceed to Checkout</button>
                      </p>
                  </div>
              </div>
          </div>
      </div>
  
    
  );

  }
//                         

  
  
  const render_formValid = () => {
    return(
      <div>
       <br></br>
       <br></br>
       <br></br>
       <br></br>
    <div className = "container">

    <div className="row">
      <div className="col-2"></div>


      <div className="col-8">

        <h1>Javascript Form Validation</h1>

        <div id="liveAlertPlaceholder"></div>

        <form className="row g-3" id="checkout-form">

          
          <div className="col-md-6">
            <label for="inputName" class="form-label">Full Name</label>
            <input type="text" class="form-control" id="inputName"/>
            <div className="valid-feedback">
              Looks good!
            </div>
            <div className="invalid-feedback">
              Must be like, "John Doe"
            </div>
          </div>

      
          <div className="col-md-6">
            <label for="inputEmail4" class="form-label">Email</label>
            <input type="email" class="form-control" id="inputEmail4"/>
            <div className="valid-feedback">
              Looks good!
            </div>
            <div className="invalid-feedback">
              Must be like, "abc@xyz.efg"
            </div>
          </div>

          
          <div className="col-12">
            <label for="inputCard" class="form-label">Card</label>
            <div className="input-group mb-3">
              <span class="input-group-text" id="basic-addon1"><i className="bi-credit-card-fill"></i></span>
              <input type="text" id="inputCard" className="form-control" placeholder="XXXX-XXXX-XXXX-XXXX"
                aria-label="Username" aria-describedby="basic-addon1"/>
              <div className="valid-feedback">
                Looks good!
              </div>
              <div className="invalid-feedback">
                Must be like, "7777-7777-7777-7777"
              </div>
            </div>
          </div>

          <div className="col-12">
            <label for="inputAddress" className="form-label">Address</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"/>
          </div>
          <div className="col-12">
            <label for="inputAddress2" className="form-label">Address 2</label>
            <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
          </div>
          <div className="col-md-6">
            <label for="inputCity" className="form-label">City</label>
            <input type="text" className="form-control" id="inputCity"/>
          </div>
          <div className="col-md-4">
            <label for="inputState" className="form-label">State</label>
            <select id="inputState" className="form-select">
              <option selected>Choose...</option>
            </select>
          </div>
          <div className="col-md-2">
            <label for="inputZip" className="form-label">Zip</label>
            <input type="text" className="form-control" id="inputZip"/>
          </div>
          <div className="col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="gridCheck"/>
              <label className="form-check-label" for="gridCheck">
                Check me out
              </label>
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-success"> <i className="bi-bag-check"></i> Order</button>
          </div>
        </form>


        <div className="card collapse">
          <div className="card-body">
            <h5 className="card-title">Order summary</h5>
            <p className="card-text">Here is a summary of your order.</p>
          </div>
          <ul className="list-group list-group-flush">

          </ul>
          <a href="" onclick="location.reload()" class="btn btn-secondary"> <i class="bi-arrow-left-circle"></i>
            Return</a>
        </div>


        <footer class="bd-footer py-4 py-md-5 mt-5 bg-light">
          <div class="container py-4 py-md-5 px-4 px-md-3">
            <div class="row">
              <div class="col-lg-12 mb-3">
                <b>SE/Com-S 319</b> Javascript form validation.
              </div>

            </div>
          </div>
        </footer>

      </div>

      <div class="col-2"></div>


    </div>

  </div>

  
  </div>
  );
  

  }
  

  if (pageView === "browse"){
    return (
      <div>
        {render_nav_browse(ProductsCategory)};
        {render_browse(ProductsCategory)};
        </div>
    );
  }
    if (pageView === "cart"){
      return(
        <div>
          {render_nav_cart()};
          {render_cart()}
          </div>
      );
    }
    
    if(pageView === "formValid"){
      return(
        <div>
        {render_nav_cart()};
        {render_formValid()};
        </div>
      );
    }

  
 
  
} //end App
