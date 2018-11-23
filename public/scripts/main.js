class CommentBox extends React.Component{
    render(){
        return(
            <div className="commentBox">
              <h1>Welcome To Add Comments!</h1>
              <CommentList />
              <CommentForm />
            </div>
        )
    }
}
class CommentList extends React.Component{
    render(){
        return(
            <div className="commentList">
                <Comment author="Snowy">This is one comment</Comment>
                <Comment author="Windy" >This is *another* comment</Comment>
            </div>
        )
    }
}
class Comment extends React.Component{
    markUp(){
        var md = new Remarkable()
        var markup = md.render(this.props.children)
        return {__html:markup}
    }
    render(){
        return(
            <div className="comment">
                <h3>{this.props.author}</h3>
                <h6 dangerouslySetInnerHTML = {this.markUp()}></h6>
            </div>
        )
    }
} 
class CommentForm extends React.Component{
    render(){
        return (
            <div className="commentForm">
                <form>
                    <input className="name" type="text" placeholder="Your name" />
                    <input type="text" placeholder="Your comments" />
                    <input type="submit" value="submit" />
                </form>
            </div>
        )
    }
}

ReactDOM.render(
    <CommentBox />,
    document.querySelector('#content')
)