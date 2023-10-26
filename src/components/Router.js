import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Hospitales from './Hospitales';

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Hospitales />} />
                </Routes>
            </BrowserRouter>
        )
    }
}
