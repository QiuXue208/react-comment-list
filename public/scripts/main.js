class CommentBox extends React.Component{
    render(){
        return(
            <div className="commentBox">
              <h1>Welcome to add comments!</h1>
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
                <Comment />
            </div>
        )
    }
}
class Comment extends React.Component{
    render(){
        return(
            <div className="comment">
                <h3>名字</h3>
                <h6>文本</h6>
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
                    <input type="text" placeholder="Your interests" />
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