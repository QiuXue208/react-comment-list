/*var data = [
    {id:1,author:"Snowy",comment:"This is one comment"},
    {id:2,author:"Windy",comment:"This is *another* comment"}
]*/
class CommentBox extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data:[]
        }
        this.loadComments = this.loadComments.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    loadComments(){
        $.ajax({
            url:this.props.url,
            dataType:'json',
            cache:false,
            success:function(){
                this.setState({data:this.state.data})
            }.bind(this),
            error:function(xhr,status,err){
                console.error(this.props.url,status,err.toString())
            }.bind(this)
        })
    }
    onCommentSubmit(comment){
        let comments = this.state.data
        comment.id = Date().now()
        let newComments = comments.concat([comment])
        this.setSate({
            data:newComments
        })
        $.ajax({
            url:this.props.url,
            dataType:json,
            type:'POST',
            data:comment,
            success:function(data){
                this.setState({data:date})
            }.bind(this),
            error:function(xhr,status,err){
                console.error(this.props.url,status,err.toString())
            }.bind(this)
        })
    }
    componentDidMount(){
        this.loadComments()
        setInterval(this.loadComments,500)
    }
    render(){
        return(
            <div className="commentBox">
              <h1>Welcome To Add Comments!</h1>
              <CommentList data={this.state.data}/>
              <CommentForm onCommentSubmit={this.onCommentSubmit.bind(this)}/>
            </div>
        )
    }
}
class CommentList extends React.Component{
    render(){
        var commentNodes = this.props.data.map((comment)=>{
           return (
               <Comment author={comment.author} key={comment.id}>{comment.comment}</Comment>
           ) 
        })
        return(
            <div className="commentList">
                {commentNodes}
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
    constructor(props){
        super(props)
        this.state = {
            author:'',
            comment:''
        }
    }
    handleAuthorChange(e){
        this.setState({
            author:e.target.value
        })
    }
    handleCommentChange(e){
        this.setState({
            comment:e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault()
        let author = this.state.author.trim()
        let comment = this.state.comment.trim()
        if(!author || !comment){
            return
        }
        this.props.onCommentSubmit({author:this.state.author,comment:this.state.comment})
        this.setState({
            author:'',
            comment:''
        })
    }
    render(){
        return (
            <div className="commentForm">
                <form>
                    <input className="name" type="text" placeholder="Your name" value={this.state.author} onChange={this.handleAuthorChange.bind(this)}/>
                    <input type="text" placeholder="Your comments" value={this.state.comment} onChange={this.handleCommentChange.bind(this)} />
                    <input type="submit" value="post" onSubmit={this.handleSubmit.bind(this)} />
                </form>
            </div>
        )
    }
}

ReactDOM.render(
    <CommentBox url="/api/comments" />,
    document.querySelector('#content')
)