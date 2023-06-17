import React, { useState, useEffect } from 'react';
import AdminPanel from './Panel';
import NavBAr from './Navbar'
const Menu = () => {
    return (
        <><div className='container'>
            <div className='row'>
                <div className='col-2 col-md-2'>
                    <NavBAr></NavBAr>
                </div>
                <div className='col-8 col-md-8'>
                    <AdminPanel></AdminPanel>
                </div>
            </div>
        </div></>
    );
};

export default Menu;
