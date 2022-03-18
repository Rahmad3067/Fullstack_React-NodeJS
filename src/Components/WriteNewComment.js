import React, {useState, useContext, useEffect} from 'react'
import { LoginContext } from '../App';
import { useForm } from 'react-hook-form'

export default function WriteNewComment() {
    const LoginStatus = useContext(LoginContext)
    const [articleIDToComment, setArticleIDToComment] = useState()
    const [commentContent, setCommentContent] = useState()
    const [emailCommenter, setEmailCommenter] = useState()
    const { register, handleSubmit, formState: { errors } } = useForm();
    useEffect(() => {
        setArticleIDToComment(LoginStatus.articleID)
    }, [])
    const onSubmit = () => {
        fetch("http://localhost:3001/com/comment", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                articleID: articleIDToComment,
                author: emailCommenter,
                text: commentContent
            })
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Votre commentaire</label>
                <input type="text" {...register("comment", {required: true, onChange: (e) => setCommentContent(e.target.value)})}></input>
                {errors.comment && <span>Commentaire vide ! Veuillez écrire quelque chose</span>}
                <label>Votre adresse mail</label>
                <input type="email" {...register("email", { required: true, onChange: (e) => setEmailCommenter(e.target.value), pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/})}></input>
                {errors.email && <span>Email invalide</span>}
                <input type="submit" value="Envoyer le commentaire"></input>
            </form>
        </div>
    )
}
