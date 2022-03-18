import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import './css/AllArticle.css';


import { useHistory } from 'react-router-dom';


export default function AllArticles() {
    const { categoryID } = useParams();
    const [articles, setArticles] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const history = useHistory();


    const handleClick = (articleID) => {
        history.push(`/article/${articleID}`);

    };

    const onClick = ()=>{
        history.push("/")
    }


    useEffect(() => {
        console.log("test");
        fetch(`http://localhost:3001/art/article/categoryArticle/${categoryID}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setArticles(res.data);
                setIsLoading(false);
            });
    }, []);

    if (isLoading === true) { return null; }
    return (
        <div>
            <div className="mt-8 ml-8 "> <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={onClick} >Back Home</button> </div>
        <div className="custom-margin grid grid-cols-2 gap-4 my-16 ">
            {
                articles.map(article => {
                    return (

                        <div className="container flex flex-col shadow-2xl py-8 px-16">
                            <div>

                                <h2 onClick={() => handleClick(article._id)} className="title-font hover:bg-green-200">{article.title}</h2>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: article.text }}></div>

                            {/* <h2 onClick={() => handleClick(article.title)}>{article.title}</h2> */}
                            {/* <p>{article.text}</p> */}
                            
                        </div>
                    );
                })
            }
        </div>
        </div>
    );
}
