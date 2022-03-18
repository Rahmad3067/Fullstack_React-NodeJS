import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import "./CreateUser.css"

export default function CreateUser() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [EmailNewUser, setEmailNewUser] = useState();
    const [PasswordNewUser, setPasswordNewUser] = useState();
    const [NameNewUser, setNameNewUser] = useState();
    const [LastNameNewUser, setLastNameNewUser] = useState();
    const [BufferPassword, setBufferPassword] = useState();
    const onSubmit = () => {
        fetch("http://localhost:3001/api/user/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                email: EmailNewUser,
                password: PasswordNewUser,
                name: NameNewUser,
                lastName: LastNameNewUser,
                isAdmin: true
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res.message);
            });
    };
    return (
        <div className="container">
            <h1 className="font text-3xl mt-8 ml-8">Add an admin</h1>
            <form className="flex flex-col ml-8" onSubmit={handleSubmit(onSubmit)}>
                <label className="font my-2 ml-6 m">Nom</label>
                <input className="w-1/5 rounded-full py-3 px-6 bg-green-200" type="text" {...register("lastName", { required: true, onChange: (e) => setLastNameNewUser(e.target.value) })}></input>
                <label className="font my-2 ml-6 m">Prenom</label>
                <input className="w-1/5 rounded-full py-3 px-6 bg-green-200" type="text" {...register("name", { required: true, onChange: (e) => setNameNewUser(e.target.value) })}></input>
                <label className="font my-2 ml-6 m">Mot de passe</label>
                <input className="w-1/5 rounded-full py-3 px-6 bg-green-200" type="password" {...register("password", { required: true, onChange: (e) => setBufferPassword(e.target.value) })}></input>
                <label className="font my-2 ml-6 m">Confirmez Mot de passe</label>
                <input className="w-1/5 rounded-full py-3 px-6 bg-green-200" type="password" {...register("confirmPassword", { required: true, onChange: (e) => e.target.value === BufferPassword ? setPasswordNewUser(e.target.value) : null })}></input>
                {errors.confirmPassword && <span>Votre mot de passe ne correspond pas</span>}
                <label className="font my-2 ml-6 m">Email</label>
                <input className="w-1/5 rounded-full py-3 px-6 bg-green-200" type="email" {...register("email", { required: true, onChange: (e) => setEmailNewUser(e.target.value), pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })}></input>
                {errors.email && <span>Votre email n'est pas valide</span>}
                <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-28 rounded-full py-3 px-6" type="submit" value="Create"></input>
            </form>
        </div>
    );
}