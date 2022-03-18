import React from 'react';
import Article from './Article';
import ArticleSearch from './ArticleSearch';
import axios from 'axios'

const Search = ()=> {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


  searchArticle = async text => {
    setIsLoading(true)
    const res = await axios.get(`http://localhost:3001/art/article/oneArticle/${text}`);
    setArticles(res.data);
    setIsLoading(false)
  }


  clearUsers = () => {
    setArticles( {articles :[] , loading: false});
  }

  // set Alert 
//   setAlert = (msg, type) => {
//     this.setState( { alert: { msg, type } });
//     setTimeout(() => {
//       this.setState({alert: null})
//     }, 5000);
//   };

    return (
      <div className="App">
        <div className='container'>
            <ArticleSearch searchArticle={this.searchArticle} clearUsers={this.clearUsers} showClear={ articles.length > 0 ? true : false }
            />

            <Article loading= {this.loading} articles={this.articles}/>
        </div>
      </div>
    );
    

}

export default Search;