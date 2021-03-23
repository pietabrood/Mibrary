import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Book from '../Books/Books';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/Feature.css';

export default function BookSearch({books, setBooks, setLogin, login, setViewState}) {
    const [value, setValue] = useState("");

    async function eff(params) {
        async function getBooks() {
        let books1;
        await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${params}`)
          .then(res => {
            books1 = res.data.items.slice(0, 25);
          })
        return books1;
      };
  
      let booksArr = await getBooks();
      setBooks({b: booksArr});
    }
    
    function setVal(e){
        setValue(e.target.value);
    }

    function submit(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const body = {};

        formData.forEach((value, property) => body[property] = value);
        setBooks({b : 0});
        eff(body.search);
    }

    return (
        <Container fluid style={{minHeight: "110vh", position: "relative"}}>
            <Row style={{display : 'flex', justifyContent: 'center', padding: '20px', textAlign: 'center'}}>
                <div>
                <br/>
                <h2>Search Through 1000's of Books</h2>
                <br/>
                <form className="searchForm" onSubmit={submit}>
                    <input
                        className="search"
                        type="text" name="search"
                        autoComplete="off"
                        placeholder="search books"
                        value={value}
                        onChange={setVal}
                    />
                    <input type='submit' style={{borderRadius: '10px', color : 'white', background: 'none', border: '1px solid white', marginLeft: '5px'}}/>
                </form>
                </div>
            </Row>
            <Row className='phone-col' style={{width: '100vw', overflowX: 'scroll', height: '65vh'}}>
                <Col style={{width: '100vw', display: 'flex'}}>
                {typeof books.b === 'object' ? books.b.map((item) => (item.volumeInfo.industryIdentifiers !== undefined ? <Book setLogin={setLogin} login={login} bookId={item.volumeInfo.industryIdentifiers[0].identifier} setViewState={setViewState} search={true}></Book> : null)) : null}  
                </Col>
            </Row>
        </Container>
    )
}
