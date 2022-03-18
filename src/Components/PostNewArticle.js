import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { LoginContext } from '../App';
import { Editor, convertToRaw } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import SubArticle from './SubArticle'

export default function PostNewArticle() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [articleTitle, setArticleTitle] = useState();
    const [articleContent, setArticleContent] = useState();
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [categories, setCategories] = useState();
    const [articleCategory, setArticleCategory] = useState();
    const [subArticle, setSubArticle] = useState()
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
        <div>
            <h3>Post New Article</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Titre de l'article</label>
                <input type="text" {...register("title", { required: true, onChange: (e) => setArticleTitle(e.target.value) })}></input>
                <label>Contenu de l'article</label>
                <select value={articleCategory} onChange={(e) => setArticleCategory(e.target.value)}>
                    {
                        categories.map(category => {
                            return <option value={category._id}>{category.name}</option>;
                        })
                    }
                </select>
                <Editor
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    EditorState={EditorState}
                    onEditorStateChange={handleEditorChange}
                />
                <input type="submit" value="Publier"></input>
            </form>
            <SubArticle/>
        </div>
    );
}
