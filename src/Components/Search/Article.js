import React from 'react'


// instead of class we can use functional components
const Article = ({ articles, isLoading }) => {
    // we can use our spinner image for while the page searching for the information
    if( isloading === true){ return null} 

        return (
            <div style={userStyle}>
                {articles.map(article =>(
                    <div key={article.id}>
                        <p>Title :{article.title}</p>
                    </div>
                ))}
            </div>
        );

    }




// Styles
const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

export default Article;