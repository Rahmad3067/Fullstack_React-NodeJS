import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { LoginContext } from '../../App';
import { Editor, convertToRaw } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import Sidebar from "./Sidebar"
import "./AddArticle.css"
import SubArticle from '../SubArticle';


export default function PostNewArticle() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [articleTitle, setArticleTitle] = useState();
    const [articleContent, setArticleContent] = useState();
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [categories, setCategories] = useState();
    const [articleCategory, setArticleCategory] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const LoginStatus = useContext(LoginContext);


    /* EDITOR FROM "react-draft-wysiwyg" */
    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    };

    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setArticleContent({ ...articleContent, description: currentContentAsHTML });
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

    const onSubmit = () => {
        fetch("http://localhost:3001/art/article", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                text: articleContent.description,
                title: articleTitle,
                UserID: LoginStatus.userID,// userID context,
                categoryID: articleCategory
            }),
        });
    };
    console.log(articleCategory);
    if (isLoading === true) { return null; }
    return (
        <>
        <Sidebar />
        <div className="container">
            <div className="container">
            <h3 className="text-6xl bg-green-500 text-center py-8">Poster un nouvel article</h3>
            </div>
            <div className="left-margin">

            <form onSubmit={handleSubmit(onSubmit)}>
                <label  className="font text-2xl mt-2 ml-8 mb-4">Titre de l'article</label>
                <input className="w-1/5 rounded-full py-3 px-6 bg-green-200 ml-2" type="text" {...register("title", { required: true, onChange: (e) => setArticleTitle(e.target.value) })}></input>
                <label className="font text-2xl mt-2 ml-8 mb-4">Nom de catégorie</label>
                <select className="w-1/5 rounded-full py-3 px-6 bg-green-200 ml-2 my-4" value={articleCategory} onChange={(e) => setArticleCategory(e.target.value)}>
                    {
                        categories.map(category => {
                            return <option value={category._id}>{category.name}</option>;
                        })
                    }
                </select>

                <Editor className="mt-4"
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    EditorState={EditorState}
                    onEditorStateChange={handleEditorChange}
                />
                <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-28 rounded-full py-3 px-6 mt-16 ml-2" type="submit" value="Publier"></input>
            </form>

           

            {/* <SubArticle/> */}

        </div>
        </div>
        </>
    );
}
