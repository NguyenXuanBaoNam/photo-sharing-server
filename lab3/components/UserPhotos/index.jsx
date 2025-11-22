const React = require("react");
const { fetchModel } = require("../../lib/fetchModelData");

function UserPhotos({ userId, onPhotoSelect }) {
  const [photos, setPhotos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!userId) return;
    fetchModel(`/photosOfUser/${userId}`)
      .then(setPhotos)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userId]);

  if (!userId) return <div>Chọn một user để xem photos</div>;
  if (loading) return <div>Đang tải...</div>;
  if (photos.length === 0) return <div>User này chưa có photos nào</div>;

  return (
    <div>
      <h2>Photos của user</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {photos.map((photo) => (
          <div key={photo._id}>
            <img
              src={`/images/${photo.file_name}`}
              alt={photo.file_name}
              onClick={() => onPhotoSelect && onPhotoSelect(photo._id)}
              style={{ cursor: "pointer", maxWidth: "200px" }}
            />
            <p>Ngày: {new Date(photo.date_time).toLocaleDateString()}</p>
            <p>Comments: {photo.comments.length}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

module.exports = UserPhotos;


