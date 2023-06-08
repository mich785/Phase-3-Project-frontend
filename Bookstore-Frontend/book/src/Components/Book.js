import React, { useState, useEffect } from 'react';
import BookDisplay from './BookDisplay';
import Header from './Header';
import BookSearch from './BookSearch';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

export default function Book() {
  const [book, setBook] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:9292/')
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
      });
  }, []);

  function handleReviews(id) {
    console.log(id)
    setSelectedBookId(id);
    navigate('/reviews');
  }


  function handleCart(id) {
    console.log(id);
    navigate('/cart');
  }

  return (
    <div className='container p-4'> 
            <Header/> 
            <BookSearch />
         <div className='row'>
            <h4>Books on Cart</h4>
            {cart.map((b) => {
                    return <Cart id={b.id} amazon={b.amazon_product_url} image={b.book_image} description={b.description} author={b.author} publisher={b.publisher} title={b.title}/>  
            })}  
        </div>

        <div className='row'> 
            {book.map((b) => { 
                return <BookDisplay handleReviews={handleReviews} handleCart={handleCart} id={b.id} image={b.book_image} author={b.author} title={b.title} />  
            })}
         </div>
        </div>
  )
}
