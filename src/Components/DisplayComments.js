import React, {useState, useContext, useEffect} from 'react'
import { LoginContext } from '../App';

export default function DisplayComments() {
    const LoginStatus = useContext(LoginContext)
    const [allComments, setAllComments] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [articleIDofComments, setArticleIDofComments] = useState()
    setArticleIDofComments(LoginStatus.articleID)
    useEffect(() => {
        fetch(`http://localhost:3001/com/comment/article/${articleIDofComments}`)
        .then(res => res.json())
        .then(res => {
            setAllComments(res)
            setIsLoading(false)
        })
    }, [])
    console.log(articleIDofComments)
    console.log(allComments)
    if (isLoading === true) { return null }
    return (
        <div>
           {/* {
               validComments.map(comment => (
                   <div>
                       <p>{comment.text}</p>
                        <h6>{comment.author}</h6>
                   </div>
               ))
           } */}
        </div>
    )
}
