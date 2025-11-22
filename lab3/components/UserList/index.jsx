const React = require("react");
const { fetchModel } = require("../../lib/fetchModelData");

function UserList({ onUserSelect, onCommentCountClick }) {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchModel("/user/list")
      .then(setUsers)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Đang tải...</div>;

  return (
    <div>
      <h2>Danh sách người dùng</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map((user) => (
          <li key={user._id} style={{ marginBottom: "10px", display: "flex", gap: "10px", alignItems: "center" }}>
            <button onClick={() => onUserSelect(user._id)}>
              {user.first_name} {user.last_name}
            </button>
            <span style={{ background: "green", color: "white", borderRadius: "50%", width: "25px", height: "25px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {user.photo_count || 0}
            </span>
            <span
              style={{ background: "red", color: "white", borderRadius: "50%", width: "25px", height: "25px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              onClick={() => onCommentCountClick && onCommentCountClick(user._id)}
            >
              {user.comment_count || 0}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

module.exports = UserList;

