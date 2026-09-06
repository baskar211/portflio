"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useRouter();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);
        setError("");

        const response = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ loginId, password }),
        });

        if (response.ok) {
            navigate.push("/admin");
        } else {
            setError("Invalid login ID or password");
            setIsSubmitting(false);
        }
    }

    return (
        <section className=" ring-2 bg-slate-100 w-full h-screen flex flex-col gap-3  justify-center items-center">
            <h2 className="capitalize text-6xl mb-10 animate-bounce shadow-cyan-400 shadow-2xs">Admin login</h2>
            <div>
                <div className="ring-2 p-10 w-fit h-fit ">
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                        <label htmlFor="login-id" className="capitalize text-red-600 text-lg">enter login id</label>
                        <input id="login-id" type="text" autoComplete="username" required placeholder="enter login id" className="ring-2 px-2" value={loginId} onChange={(event) => setLoginId(event.target.value)} />
                        <label htmlFor="password" className="capitalize text-red-600 text-lg">enter password</label>
                        <input id="password" type="password" autoComplete="current-password" required placeholder="enter password" className="ring-2 px-2" value={password} onChange={(event) => setPassword(event.target.value)} />
                        <button type="submit" disabled={isSubmitting} className="capitalize bg-amber-600 px-3 py-1 rounded text-white font-bold disabled:opacity-50">{isSubmitting ? "Signing in..." : "Submit"}</button>
                    </form>
                </div>

                {error && <p className="text-center mt-5 text-red-500 font-bold">{error}</p>}




            </div>
        </section>
    )
}

