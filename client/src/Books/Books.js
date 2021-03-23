import React, {useEffect, useState} from 'react';
import axios from 'axios';
import placeholder from '../images/placeholder.png'
import { Card, Button } from 'react-bootstrap';
import RemoveBook from './RemoveBook';
import AddBook from './AddBook';
import '../css/Books.css'
 
export default function Books({shelfIndex = 0, login, setLogin=0, isbn = 0, bookId = 0, search = false, at = 0, setViewState = 0}) {
    var colors = ['primary', 'success', 'info', 'warning', 'danger'];
    var random_color = colors[Math.floor(Math.random() * colors.length)];
    const [book, setBook] = useState(0);
    
    useEffect(async () => {
            async function getBook() {
                await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${bookId}`)
                .then(res => {
                    if(res.data !== undefined ){
                        if(res.data.totalItems > 0){
                            setBook(res.data.items[0].volumeInfo);
                        }
                    }
                })
            }

            await getBook();
    }, [login, shelfIndex])

    function setView(){
        setViewState({view : "book", bookId : bookId});
    }

    function checkBook(){
            let bool = false
            login.shelves.forEach(item => {
                item.books.forEach(b => {
                    if (b === bookId) {
                        bool = true;
                    }
                })
            })

            return bool;
    }

        if(book !== undefined && book !== 0){
            return (
                <div style={{margin: "20px"}}>
                    <Card className='phone-card' style={{background: 'none', color: 'white', boxShadow: '0 0 10px black'}}>
                    {!search 
                    ? <RemoveBook shelfIndex={shelfIndex} login={login} setLogin={setLogin} setViewState={setViewState} bookId={bookId} at={at}></RemoveBook>
                    : null}
                    {book.imageLinks !== undefined 
                    ? <Card.Img className='c-image' variant="top" src={book.imageLinks.thumbnail}/> 
                    : <Card.Img className='c-image' variant="top" src={placeholder}/> }
                    <div className='hidden-card-body'>
                            {!checkBook() 
                            ?   <div style={{display: 'flex', justifyContent : 'center'}}>
                                    <Button variant={random_color}><a onClick={setView} style={{textDecoration: 'none', color: 'white'}}>view</a></Button>
                                    <AddBook bookId={bookId} login={login} setLogin={setLogin} book={book} setBook={setBook} shelves={login.shelves}></AddBook>
                                </div> 
                            :   <Button variant={random_color}><a onClick={setView} style={{textDecoration: 'none', color: 'white'}}>view</a></Button>
                            }   
                            <Card.Text className='c-text'>
                                {book.title.length >= 25
                                ? book.title.substring(0,25) + '...'
                                : book.title}
                            </Card.Text>
                    </div>
                    {/* <Card.Body>
                        
                    </Card.Body> */}
                    </Card>
                </div>
            );
        }else{
            return null;
        }
}
