import React, { useState } from 'react';
import { useContext } from 'react';
import { LoginContext } from '../App';
import { useForm } from 'react-hook-form';

const UserInfo = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [Display, setDisplay] = useState(false);
    const UserEdit = useContext(LoginContext);
    const myStyle = {
        test: {
            display: "none"
        },
        test2: {
            display: "block"
        }
    };
    const EditDisplay = () => {
        if (Display === true) {
            setDisplay(false);
        } else {
            setDisplay(true);
        }
    };

    return (
        <div>
            <ul>
                <form className={Display === true ? myStyle.test2 : myStyle.test}>
                    <label>Email</label>
                    {/* <input type="text" value={UserEdit.EmailUser}></input> */}
                    {/* <input type="password" value={"password"}></input> */}
                </form>
            </ul>
        </div >
    );
};

export default UserInfo;