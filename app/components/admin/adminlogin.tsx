"use client";
import { useState } from "react"
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLogin() {
    const [input, setinput] = useState()
    const [error, seterror] = useState(false)
    const navigate = useRouter()


    const handleChange = (e) => {
        setinput(e.target.value);
        seterror(false)
    };
    const handlesubmit = (e) => {
        e.preventDefault()

        if (input === (process.env.NEXT_PUBLIC_ADMIN_PASS || '')) {
            seterror(false)
            sessionStorage.setItem("isAdmin", "true")
            navigate.push('/admin')
        }
        else {
            seterror(true)
        }
    }

    return (
        <section className=" ring-2 bg-slate-100 w-full h-screen flex flex-col gap-3  justify-center items-center">
            <h2 className="capitalize text-6xl mb-10 animate-bounce shadow-cyan-400 shadow-2xs ">Admin login </h2>
            <div>
                <div className="ring-2 p-10 w-fit h-fit ">
                    <form action="" className="flex flex-col lg:flex-row gap-3 items-center " onSubmit={handlesubmit}>

                        <label htmlFor="" className=" capitalize text-red-600 text-lg">enter login id <b>:</b></label>
                        <br />
                        <input type="text" placeholder="enter login id" className="ring-2 px-2  capitalize" value={input} onChange={handleChange} />

                        {input === (process.env.NEXT_PUBLIC_ADMIN_PASS || '') ? <button className=" capitalize bg-amber-600 px-3 py-1 rounded text-white font-bold">submit</button> : <p></p>}
                    </form>
                </div>

                <p className="text-center mt-5">{error ? <p className=" capitalize text-red-500  font-bold">password  wrong!</p> : !error && input === (process.env.NEXT_PUBLIC_ADMIN_PASS || '') && (
                    <p className="text-center mt-5 text-green-600 font-bold capitalize">
                        password correct
                    </p>)} </p>




            </div>
        </section>
    )
}

