import React from 'react'
import ReactDOM from 'react-dom'
import './style.css';
import TodoApp from './app';
import { BrowserRouter, Route, Link } from 'react-router-dom'
// BrowserRouter最外層 Route 網址  link是要指定連結到哪裡
// 他是個API



// ReactDOM.render(<TodoApp />, document.getElementById("wrap"));

ReactDOM.render(<BrowserRouter><TodoApp /></BrowserRouter>, document.getElementById("wrap"));

// ReactDOM.render(<BrowserRouter basename={'./index.html'}><TodoApp /></BrowserRouter>, document.getElementById("wrap"));
