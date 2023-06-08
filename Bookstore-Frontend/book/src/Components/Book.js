import React, { useState, useEffect } from 'react'
import BookDisplay from './BookDisplay'
import Header from './Header'
import Cart from './Cart'
import BookSearch from './BookSearch'
//import { useNavigate} from 'react-router-dom'

export default function Book() {
    const [book,setBook] = useState([]) 
    const [cart,setCart] = useState([]) 
   // const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9292/")
        .then(response => response.json())
        .then(data => {
            setBook(data) 
            // console.log(data) 
        })  
    },[] )
    //console.log(book.results) 

    function handleCart(id){
        fetch(`http://localhost:9292/books/${id}`)  
        .then(response => response.json())
        .then(data => {
            addCart(data) 
           // console.log(data) 
        }) 
    }

    function addCart(newItem){
        setCart([...cart,newItem]) 

    }

    function handleReviews(id){
        console.log(id)  
       // navigate("/reviews")
    }

  return (
    <div className='container p-4'> 
            <Header/> 
            <div className='row m-2'> 
            <h3>Books on Cart</h3>  
            {cart.map((b) => {
                return <Cart id={b.id} publisher={b.publisher} amazon={b.amazon_product_url} image={b.book_image} description={b.description} author={b.author} title={b.title}/>
            })} 
            </div>
            <BookSearch />
        <div className='row'> 
            {book.map((b) => { 
                return <BookDisplay handleReviews={handleReviews} handleCart={handleCart} id={b.id} image={b.book_image} author={b.author} title={b.title} />  
            })}
         </div>

         <Cart />
    </div>
  )
}
