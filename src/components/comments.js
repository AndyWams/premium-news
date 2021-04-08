import { observer } from "mobx-react-lite";
import store from "../stores/newsStore";
const Comments = () => {
  return (
    <div className="comments">
      <h4>Comments</h4>

      {store.comments && store.comments.length > 0
        ? store.comments.map((comment) => (
            <pre
              key={comment.id}
              className="d-flex justify-content-between align-items-center"
            >
              <span>
                Posted by: {comment.user} - {comment.commentContent}
              </span>
              <span onClick={() => store.deleteComment(comment.id)}>
                &times;
              </span>
            </pre>
          ))
        : "No comments"}
    </div>
  );
};

export default observer(Comments);
