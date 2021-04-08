const Comments = ({ store }) => {
  return (
    <div className="comments">
      <h4>Comments</h4>
      {store.comments.length === 0
        ? "No comments"
        : store.comments.map((comment) => (
            <pre key={comment.id}>
              Posted by: {comment.user} - {comment.commentContent}
            </pre>
          ))}
    </div>
  );
};

export default Comments;
