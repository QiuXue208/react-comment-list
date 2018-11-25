var data = [
    {id:1,author:"Snowy",comment:"This is one comment"},
    {id:2,author:"Windy",comment:"This is *another* comment"}
]
class CommentBox extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data:[]
        }
    }
    componentDidMount(){
        $.ajax({
            url:this.props.url,
            dataType:'json',
            cache:false,
            success:function(){
                this.setState({data:data})
            }.bind(this),
            error:function(xhr,status,err){
                console.error(this.props.url,status.err.toString())
            }.bind(this)
        })
    }
    render(){
        return(
            <div className="commentBox">
              <h1>Welcome To Add Comments!</h1>
              <CommentList data={this.state.data}/>
              <CommentForm />
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
    <CommentBox url="/api/comments" />,
    document.querySelector('#content')
)