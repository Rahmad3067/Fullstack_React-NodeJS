import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function DeleteUser() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [emailOfUserToDelete, setEmailOfUSerToDelete] = useState();

    const onSubmit = () => {
        fetch("http://localhost:3001/api/user/delete", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                email: emailOfUserToDelete
            })
        });
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Email of user to delete</label>
                <input type="email" {...register("email", { required: true, onChange: (e) => setEmailOfUSerToDelete(e.target.value) })}></input>
                <input type="submit" value="Supprimer"></input>
                {errors.email && <span>Votre adresse email n'est pas valide</span>}
            </form>
        </div>
    );
}