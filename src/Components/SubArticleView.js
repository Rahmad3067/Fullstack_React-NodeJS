import React, { useState, useContext, useEffect } from 'react';
import { LoginContext } from '../App';

export default function SubArticleView() {
    const LoginStatus = useContext(LoginContext);
    const [isLoading, setIsLoading] = useState(true);
    const [subArticles, setSubArticles] = useState();
    const ReadMore = ({ children }) => {
        const text = children.props.dangerouslySetInnerHTML.__html;
        const [isReadMore, setIsReadMore] = useState(true);
        const toggleReadMore = () => {
            setIsReadMore(!isReadMore);
        };

        return (
            <div>
                <p className="text">
                    {isReadMore ? (
                        <div dangerouslySetInnerHTML={{ __html: text.slice(0, 250) }} />
                    ) : (
                        <div dangerouslySetInnerHTML={{ __html: text }} />
                    )}
                    <span onClick={toggleReadMore} className="read-or-hide">
                        {isReadMore ? "...read more" : " show less"}
                    </span>
                </p>
            </div>
        );
    };

    useEffect(() => {

        fetch(`http://localhost:3001/sub/subArticle/${LoginStatus.articleTitle}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setSubArticles(res.data);
                setIsLoading(false);
            });
    }, []);
    console.log(subArticles)
    if (isLoading === true) { return null; }
    return (
        <div>
            {
                subArticles.map(subArticle => {
                    return (
                        <div>
                            <h2 dangerouslySetInnerHTML={{ __html: subArticle.title }}></h2>
                            <p dangerouslySetInnerHTML={{ __html: subArticle.text }}></p>
                        </div>
                    );
                })
            }
        </div>
    );

}
