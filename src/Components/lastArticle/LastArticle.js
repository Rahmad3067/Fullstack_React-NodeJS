import React, { useState, useEffect } from 'react';

const Popular = ()=> {
    
    const [article, setArticle] = useState([]);
    const [isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        fetch(
            "http://localhost:3001/art/article/new/lastArticles")
            .then(res => res.json())
            .then(res => {
                setArticle(res.data);
                setIsLoading(false)
                console.log(res)
            });
    }, []);

    if (isLoading === true ) {
        return null
    } 
    console.log(article)
        return (

            <div>
                <h1>Last Article</h1>

                <div className="row">
                    {
                         article.map(elem => {
                            return (
                                <div className="row flex">
                                <h1>{elem.title}</h1>
                                <p>{elem.text}</p>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        );
}

export default Popular;