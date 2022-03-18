import React, { useState, useEffect, useContext } from 'react';
import { LoginContext } from '../App';
import { useParams } from 'react-router';
import "./css/Article.css";
import DisplayComments from './DisplayComments';
import WriteNewComment from './WriteNewComment';
import SubArticleView from './SubArticleView';


const Article = () => {
  const [data, setData] = useState();
  const LoginStatus = useContext(LoginContext);
  // const [comments, setComments] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [subArticles, setSubArticles] = useState();
  const { id } = useParams();

  // Method for an option to read more in the text
  // const ReadMore = ({ children }) => {
  //   const text = children.props.dangerouslySetInnerHTML.__html;
  //   const [isReadMore, setIsReadMore] = useState(true);
  //   const toggleReadMore = () => {
  //     setIsReadMore(!isReadMore);
  //   };
  //   return (
  //     <p classNameName="text">
  //       {isReadMore ? (
  //         <div dangerouslySetInnerHTML={{ __html: text.slice(0, 250) }} />
  //       ) : (
  //         <div dangerouslySetInnerHTML={{ __html: text }} />
  //       )}
  //       <span onClick={toggleReadMore} classNameName="read-or-hide">
  //         {isReadMore ? "...read more" : " show less"}
  //       </span>
  //     </p>
  //   );
  // };

  // Recuperation de l'article choisi dans la base de données
  useEffect(() => {
    fetch(
      `http://localhost:3001/art/article/id/${id}`)
      .then(res => res.json())
      .then(res => {
        setData(res);
        console.log(res.data);
        // LoginStatus.setArticleID(res.data._id);
        //LoginStatus.setArticleTitle(res.data.title);
      });

    fetch(`http://localhost:3001/sub/subarticles/articlesid/${id}`)
      .then(res => res.json())
      .then(res => {
        console.log(LoginStatus);
        console.log(res);
        setSubArticles(res.data);
        setIsLoading(false);
      });
  }, []);
  console.log(subArticles);
  const filterSubArticlesTitle = () => {
    const subArticleTitle = subArticles.filter(subArticle => subArticle.articleID === id);
    console.log(subArticleTitle);

    subArticleTitle.map(item => {
      return (
        <h2>{item.title}</h2>
      );
    });

  };
  if (isLoading === true) { return null; }
  return (
    <>

      {/* <div classNameName="container flex justify-center mt-10 ">
        <div classNameName="flex flex-col mt-10 w-1/2 ">
          <h1 classNameName="animate-pulse flex justify-center text-3xl">{data.data.title}</h1>
          <div classNameName="mt-8 flex justify-center px-10 mx-10 shadow-2xl py-8"><p classNameName="flex justify-center text-color">

            <div>
              {
                subArticles.filter(subArticle => subArticle.articleID === id).map(item => {
                  return (
                    <h2>{item.title}</h2>

                  );
                })
              }
            </div>
          </p></div>
        </div>
      </div> */}

      <div className="w-3/5 p-8 mx-auto">
        <section className="shadow row">
          <div className="tabs">

            {
              subArticles.filter(subArticle => subArticle.articleID === id).map(item => {
                return (
                  <div className="border-b tab">
                    <div className="border-l-2 border-transparent relative">
                      <input className="w-full absolute z-10 cursor-pointer opacity-0 h-5 top-6" type="checkbox" id="chck1" />
                      <header className="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none tab-label" for="chck1">
                        <span className="text-grey-darkest font-thin text-xl">
                          <h2>{item.title}</h2>
                        </span>
                        <div className="rounded-full border border-grey w-7 h-7 flex items-center justify-center test">
                          <svg aria-hidden="true" className="" data-reactid="266" fill="none" height="24" stroke="#606F7B" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <polyline points="6 9 12 15 18 9">
                            </polyline>
                          </svg>
                        </div>
                      </header>
                      <div className="tab-content">
                        <div dangerouslySetInnerHTML={{ __html: item.text }} className="pl-8 pr-8 pb-5 text-grey-darkest">

                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            }

          </div>
        </section>
      </div>
    </>
  );
};

export default Article;