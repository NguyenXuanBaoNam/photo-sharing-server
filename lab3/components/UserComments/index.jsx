const React = require("react");
const { fetchModel } = require("../../lib/fetchModelData");

function UserComments({ userId, onPhotoSelect }) {
  const [comments, setComments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!userId) return;
    fetchModel(`/user/${userId}/comments`)
      .then(setComments)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userId]);

  if (!userId) return <div>Chọn một user để xem comments</div>;
  if (loading) return <div>Đang tải...</div>;
  if (comments.length === 0) return <div>User này chưa có comments nào</div>;

  return (
    <div>
      <h2>Comments của user</h2>
      {comments.map((comment) => (
        <div
          key={comment._id}
          style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", cursor: "pointer", display: "flex", gap: "10px" }}
          onClick={() => onPhotoSelect && onPhotoSelect(comment.photo._id)}
        >
          <img src={`/images/${comment.photo.file_name}`} alt={comment.photo.file_name} style={{ width: "100px", height: "100px" }} />
          <div>
            <p><strong>Comment:</strong> {comment.comment}</p>
            <p><strong>Ngày:</strong> {new Date(comment.date_time).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

module.exports = UserComments;


