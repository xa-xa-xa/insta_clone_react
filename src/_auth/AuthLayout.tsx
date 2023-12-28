import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const AuthLayout = () => {
    const isAuthentificated = false
    return (
        <>
            {
                isAuthentificated ?
                    (
                        <Navigate to="/" />
                    )
                    :
                    (
                        <>
                            <section className='flex flex-1 justify-center items-center flex-col'>
                                <Outlet />
                            </section>
                            <img src='/images/side-img.svg' alt='logo' // FIXME: replace cover image
                                className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat'></img>
                        </>
                    )
            }
        </>
    )
}

export default AuthLayout