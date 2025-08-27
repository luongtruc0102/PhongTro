import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header, Navigation } from './Index';
import { Intro, Contact } from '../../components/Index'

const Home = () => {
    

    return (
        <div className='w-full flex flex-col items-center h-full'>
            <Header />
            <Navigation />
            <div className='w-3/4 flex flex-col items-center justify-start mt-3'>
                <Outlet />
            </div>
            <Intro />
            <Contact />
            <Footer />

        </div>
    )
}
 
export default Home