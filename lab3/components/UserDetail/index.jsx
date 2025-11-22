const React = require("react");
const { fetchModel } = require("../../lib/fetchModelData");

function UserDetail({ userId }) {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!userId) return;
    fetchModel(`/user/${userId}`)
      .then(setUser)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userId]);

  if (!userId) return <div>Chọn một user để xem chi tiết</div>;
  if (loading) return <div>Đang tải...</div>;
  if (!user) return <div>Không tìm thấy user</div>;

  return (
    <div>
      <h2>{user.first_name} {user.last_name}</h2>
      <p><strong>Vị trí:</strong> {user.location}</p>
      <p><strong>Nghề nghiệp:</strong> {user.occupation}</p>
      <p><strong>Mô tả:</strong> {user.description}</p>
    </div>
  );
}

module.exports = UserDetail;


