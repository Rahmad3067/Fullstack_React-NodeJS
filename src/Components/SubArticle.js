import React, { useEffect, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginContext } from '../App';
import { Editor, convertToRaw } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import Sidebar from './AdminPage/Sidebar';

export default function SubArticle() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [subArticleTitle, setSubArticleTitle] = useState();
    const [subArticleContent, setSubArticleContent] = useState();
    const [categories, setCategories] = useState();
    const [articleCategory, setArticleCategory] = useState();
    const [subArticleToArticle, setSubArticleToArticle] = useState();
    const [allArticles, setallArticles] = useState();
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const LoginStatus = useContext(LoginContext);
    const [isLoading, setIsLoading] = useState(true);

    /* EDITOR FROM "react-draft-wysiwyg" */
    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    };

    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setSubArticleContent({ ...subArticleContent, description: currentContentAsHTML });
    };
    /* END EDITOR */

    useEffect(() => {
        fetch("http://localhost:3001/cat/category/all")
            .then(res => res.json())
            .then(res => {
                setCategories(res.data);
                setIsLoading(false);
            });

    }, []);

    const handleSelect = (e) => {
        setIsLoading(true);
        setArticleCategory(e.target.value);
        fetch(`http://localhost:3001/art/article/categoryArticle/${e.target.value}`)
            .then(res => res.json())
            .then(res => {
                console.log(res.data);
                setallArticles(res.data);
                setIsLoading(false);
            });
    };


    const onSubmit = () => {
        fetch("http://localhost:3001/sub/subArticle", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                articleID: subArticleToArticle,
                text: subArticleContent.description,
                title: subArticleTitle,
                // UserID: LoginStatus.userID,// userID context,
            }),
        });
    };
    console.log(subArticleTitle);
    console.log(subArticleContent);
    console.log(subArticleToArticle);
    if (isLoading === true) { return null; }
    return (
        <>
        <Sidebar />
        <div className="container">
            <h3 className="text-6xl bg-green-500 text-center py-8">Ajouter des subarticles à vos articles</h3>
            <div className="left-margin my-4">

            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="font text-2xl mt-2 ml-8 mb-4">Titre du sub article</label>
                <input className="w-1/5 rounded-full py-3 px-6 bg-green-200 ml-2" type="text" {...register("title", {
                    required: true, onChange: (e) => {
                        setSubArticleTitle(e.target.value);
                    }
                })}></input>
                {/* Select Pour la catégorie */}
                <select className="w-1/5 rounded-full py-3 px-6 bg-green-200 ml-2" value={articleCategory} onChange={(e) => handleSelect(e)
                }>
                    {
                        categories.map(category => {
                            return <option className="font text-2xl mt-2 ml-6 mb-4" value={category._id}>{category.name}</option>;
                        })
                    }
                </select>
                {/* Select pour les titres d'articles selon la catégorie */}
                {articleCategory ? <select className="font text-2xl mt-2 ml-8 mb-4" className="w-1/5 rounded-full py-3 px-6 bg-green-200 ml-2" value={subArticleToArticle} onChange={(e) => setSubArticleToArticle(e.target.value)}>
                    {
                        allArticles.map(article =>{
                            return <option className="font text-2xl mt-2 ml-8 mb-4" className="w-1/5 rounded-full py-3 px-6 bg-green-200 ml-2" value={article._id}>{article.title}</option>;
                        })

                    }
                </select> : null}
                <label className="font text-2xl mt-2 ml-8 mb-6">Contenu de l'article</label>
                <Editor
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    EditorState={EditorState}
                    onEditorStateChange={handleEditorChange}
                />
                <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-28 rounded-full py-3 px-6 mt-16 ml-2" type="submit" value="Publier"></input>
            </form>
            </div>
        </div>
        </>
    );
}
