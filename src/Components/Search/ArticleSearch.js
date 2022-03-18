import React, { useEffect, useState } from 'react'


const ArticleSearch = ()=> {
    const [text, setText ] = useState("");

    
    onSubmit = (e) => {
        e.preventDefault();
            this.props.searchArticle(text);
            setText( '' );
    }



    onChange= (e) => {
    setText({ [ e.target.name ]: e.target.value})
}

        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input type='text' name="text" placeholder="Search Users..." value={this.Text} onChange={this.onChange}/>
                    <input type="submit" value="search" className="btn btn-dark btn-block"/>
                </form>
                { this.props.showClear && ( <button className="btn btn-primary-color btn-block" onClick={this.props.clearUsers}>Clear</button> )}
                
            </div>
        )
    
}

export default ArticleSearch