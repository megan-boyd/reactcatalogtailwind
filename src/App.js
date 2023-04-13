import "./App.css";
import logo from "./logo.png";
import React, {useState, useEffect} from "react";
import {Products} from "./Products"
import {Categories} from "./Categories";
//import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.css";

import { findRenderedDOMComponentWithTag } from "react-dom/test-utils";


export const App = () => {

const [cart, setCart]  = useState([]);
const[cartTotal, setCartTotal] = useState([0]);
const [ProductsCategory, setProductsCategory] = useState(Products);
const [pageView, changePageView]= useState("browse");
const [query, setQuery] = useState('');
const [paymentInfo, setPaymentInfo] = useState({
  username:'',
  email:'',
  card:'',
  address:'',
  city:'',
  state:'',
  zip:'',
});


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
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div className="container-fluid">
          <a className="navbar-brand" href="./index.html">P&P</a>


          <button type='button' className='btn btn-danger m-4' onClick={e => changePageView("cart")}>Checkout</button>

          <div className="py-10">
            <input type="search" value={query} onChange={handleChange} />
          </div>
          <button type = 'button' className ='btn btn-danger m-4' onClick={()=> handleClick('Plants')}>Plants</button>
          <button type = 'button' className ='btn btn-danger m-4' onClick={()=> handleClick('Pots')}>Pots</button>
      

          <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                
                  
                 
              </ul>
          </div>
      </div>


  </nav>
  )}
  const render_nav_cart = () => {
    return(
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div className="container-fluid">
          <a className="navbar-brand" href="./index.html">P&P</a>


          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          <button type='button' className='btn btn-danger m-4' onClick={e => changePageView("browse")}>Close</button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                
                 
                  
                
               
                 
              </ul>
          </div>
      </div>


  </nav>
  )}
  const render_browse = (ProductsCategory) => { 
    


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

    function displayCart(listItems){
      return listItems.filter((cartItem, index) => listItems.indexOf(cartItem) === index);

    }

    
  const render_cart = () => {
    return (
       
       
      <div className = "cartHold">
          <br></br>
          <br></br>
          <br></br>
          <br></br> 
          <div  >
          
              <div >
                  <div >
                      <div className = "title">
                          <div className = "row">
                              <div className = "col">
                                  <h4>
                                     
                                      <button type='button' className='btn btn-danger m-4' onClick={e => changePageView("browse")}>Close</button>
                                  </h4>
                              </div>
                              <div className = "col align-self-center text-right text-muted">
                                  Products selected {cart.length}

                              </div>
                          </div>
                      </div> 

          
          {(displayCart(cart)).map((product, index) => (
            <div className = "row border-top border-bottom" key = {index}>

              <div className = "row main align-items-center">
                    <div className = "col-2">
                      <img className = "img-fluid" src = {require(`${product.image}`)} />

                     </div>
                  <div className = "col">
                    <div className = "row text-muted">{product.title}</div>
                     <div className = "row">{product.category}</div>

                 </div>
                 <div className = "col">
                <button type = "button" variant = "light" onClick={() => removeFromCart(product)}> - </button>{" "}
                 <button type = "button" variant = "light" onClick={() => addToCart(product)}> + </button>

                </div>
                  <div className = "col">
                     ${product.price}<span className = "close">&#10005;</span>{howManyofThis(product.id)}
    
                    </div>
                </div>
            </div>))
            }
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
  </div>
    
  );

  }
//                         

function isNumeric(n){
  return !isNaN(parseFloat(n)) && isFinite(n)

}
const cardNumberFunctionality = (e) => {
  const inputCard = document.getElementById('inputCard');
  if (!inputCard || !inputCard.value) {
    return e.preventDefault() 
  } else {
    inputCard.value = inputCard.value.replace(/-/g, '')
    let newVal = ''
    for (var i = 0, nums = 0; i < inputCard.value.length; i++) {
      if (nums !== 0 && nums % 4 === 0) {
        newVal += '-'
      }
      newVal += inputCard.value[i]
      if (isNumeric(inputCard.value[i])) {
        nums++
      }
    }
    inputCard.value = newVal
  }
}
let validate = () => {
  let value = true;
  let payInfo = {
    name: '',
    email: '',
    card: '',
    address: '',
    city: '',
    state: '',
    zip: 0
  };
  let username = document.getElementById('inputName');
  let email = document.getElementById('inputEmail');
  let card = document.getElementById('inputCard');
  let address1 = document.getElementById('inputAddress');
  let address2 = document.getElementById('inputAddress2');
  let city = document.getElementById('inputCity');
  let state = document.getElementById('inputState');
  let zip = document.getElementById('inputZip');


if (username.value.length === 0) {
    username.setAttribute("className", "form-control is-invalid")
    value = false
  }
  else {
    username.setAttribute("className", "form-control is-valid");
    payInfo.username = username.value
  }



  if (!email.value.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )) {
    email.setAttribute("className", "form-control is-invalid");
    value = false;
  }
  else {
    email.setAttribute("className", "form-control is-valid");
    payInfo.email = email.value
  }

  

 if (!(zip.value.length === 5) || !isNumeric(zip.value)) {
    zip.setAttribute("className", "form-control is-invalid")
    value = false
  }
  else {
    zip.setAttribute("className", "form-control is-valid");
    payInfo.zip = zip.value
  }


  if (!card.value.match(/^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/)) {
    card.setAttribute("className", "form-control is-invalid")
    value = false
  }
  else {
    card.setAttribute("className", "form-control is-valid");
    payInfo.card = card.value
  }

 
  if (address1.value.length === 0) {
    address1.setAttribute("className", "form-control is-invalid")
    value = false
  }
  else {
    address1.setAttribute("className", "form-control is-valid");
    payInfo.address = address1.value + address2.value;
  }



  if (state.value.length === 0) {
    state.setAttribute("className", "form-control is-invalid")
    value = false
  }
  else {
    state.setAttribute("className", "form-control is-valid");
    payInfo.state = state.value;
  }


  if (city.value.length === 0) {
    city.setAttribute("className", "form-control is-invalid")
    value = false
  }
  else {
    city.setAttribute("className", "form-control is-valid");
    payInfo.city = city.value;
  }


  console.log(payInfo);
  setPaymentInfo(payInfo);
  return value;
}

  
  
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
            <label htmlFor = "inputName" className="form-label">Full Name</label>
            <input type="text" className="form-control" id="inputName"/>
            <div className="valid-feedback">
              Looks good!
            </div>
            <div className="invalid-feedback">
              Must be like, "John Doe"
            </div>
          </div>

      
          <div className="col-md-6">
            <label htmlFor="inputEmail" className="form-label">Email</label>
            <input type="email" className="form-control" id="inputEmail"/>
            <div className="valid-feedback">
              Looks good!
            </div>
            <div className="invalid-feedback">
              Must be like, "abc@xyz.efg"
            </div>
          </div>

          
          <div className="col-12">
            <label htmlFor="inputCard" className="form-label">Card</label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><i className="bi-credit-card-fill"></i></span>
              <input type="text" id="inputCard" className="form-control" placeholder="XXXX-XXXX-XXXX-XXXX"
                aria-label="Username" aria-describedby="basic-addon1" onInput={e => cardNumberFunctionality(e)}/>
              <div className="valid-feedback">
                Looks good!
              </div>
              <div className="invalid-feedback">
                Must be like, "7777-7777-7777-7777"
              </div>
            </div>
          </div>

          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">Address</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"/>
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress2" className="form-label">Address 2</label>
            <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
          </div>
          <div className="col-md-6">
            <label htmlFor="inputCity" className="form-label">City</label>
            <input type="text" className="form-control" id="inputCity"/>
          </div>
          <div className="col-md-4">
            <label htmlFor="inputState" className="form-label">State</label>
            <input type="text" className="form-control" id="inputState"/>

          </div>
          <div className="col-md-2">
            <label htmlFor="inputZip" className="form-label">Zip</label>
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
            <button type="submit" className="btn btn-success" onClick = {e => {validate() ? changePageView("confirm") : alert("uh oh... double check payment method")}}> Order</button>
          </div>
        </form>


        <div className="card collapse">
          <div className="card-body">
            <h5 className="card-title">Order summary</h5>
            <p className="card-text">Here is a summary of your order.</p>
          </div>
          <ul className="list-group list-group-flush">

          </ul>
          <a href="" onClick="location.reload()" className="btn btn-secondary"> <i className="bi-arrow-left-circle"></i>
            Return</a>
        </div>


        <footer className="bd-footer py-4 py-md-5 mt-5 bg-light">
          <div className="container py-4 py-md-5 px-4 px-md-3">
            <div className="row">
              <div className="col-lg-12 mb-3">
                <b>SE/Com-S 319</b> Javascript form validation.
              </div>

            </div>
          </div>
        </footer>

      </div>

      <div className="col-2"></div>


    </div>

  </div>

  
  </div>
  );
  

  }


  let cartItemsConfirm = () => {
    return (
      
      <div className = "cartHold">
        <br></br>   
        <br></br>
      
      <div  >
          <div >
              <div >
                  <div className = "title">
                      <div className = "row">
                          <div className = "col">
                              <h4>
                                  <b>CONFIRMATION</b>
                                  <button type='button' className='btn btn-danger m-4' onClick={e => changePageView("browse")}>Close</button>
                              </h4>
                          </div>
                          <div className = "col align-self-center text-right text-muted">
                              Products selected{cart.length}

                          </div>
                      </div>
                  </div>

                  <div> {(displayCart(cart)).map((product, index) => (
            <div className = "row border-top border-bottom" key = {index}>

              <div className = "row main align-items-center">
                    <div className = "col-2">
                      <img className = "img-fluid" src = {require(`${product.image}`)} />

                     </div>
                  <div className = "col">
                    <div className = "row text-muted">{product.title}</div>
                     <div className = "row">{product.category}</div>

                 </div>
                 <div className = "col">
                <button type = "button" variant = "light" onClick={() => removeFromCart(product)}> - </button>{" "}
                 <button type = "button" variant = "light" onClick={() => addToCart(product)}> + </button>

                </div>
                  <div className = "col">
                     ${product.price}<span className = "close">&#10005;</span>{howManyofThis(product.id)}
    
                    </div>
                </div>
            </div>))
            }</div>
              </div>
              <div className ="float-end">
                  <p className = "mb-0 me-5 d-flex align-items-center">
                      <span className ="small text-muted me-2">Order total:</span>
                      <span className = "lead fw-normal">${cartTotal}</span>
                  </p>
              </div>
          </div>
      </div>
  </div>
    );
  }

  const render_confirm = () => {
    return (
      <div>
        <div>
          <h1>
            Confirmation
          </h1>
          <div>
            <h2>Cart:</h2>
            {cartItemsConfirm()}
          </div>
          <div className="row">
            <div className="square">
              <h2>Payment Info:</h2>
              <h5 className='boldText'>Name:</h5>
              <p className='indent'> {paymentInfo.name}</p>
              <h5 className='boldText'>Email:</h5>
              <p className='indent'> {paymentInfo.email}</p>
              <h5 className='boldText'>Card:</h5>
              <p className='indent'> {paymentInfo.card}</p>
              <h5 className='boldText'>Address:</h5>
              <p className='indent'> {paymentInfo.address}</p>
              <h5 className='boldText'>City:</h5>
              <p className='indent'> {paymentInfo.city}</p>
              <h5 className='boldText'>State:</h5>
              <p className='indent'> {paymentInfo.state}</p>
              <h5 className='boldText'>Zip:</h5>
              <p className='indent'> {paymentInfo.zip}</p>
            </div>
          </div>
        </div>
        <div className='text-center'>
          <button type='button' className='btn btn-danger m-2' onClick={e => { setCart([]); changePageView("Browse"); }}>Cancel</button>
          <button type='button' className='btn btn-danger m-2' onClick={e => { alert("Thank you for your order!"); setCart([]); changePageView("browse"); }}>Confirm</button>
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

    if(pageView === "confirm"){
      return(
<div>
        {render_nav_cart()};
        {render_confirm()};
</div>
      )

    }

  

  
} 

//end App
