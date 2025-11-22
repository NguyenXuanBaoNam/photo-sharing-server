// File demo app để minh họa cách sử dụng các components
const React = require("react");
const UserList = require("./components/UserList/index.jsx");
const UserDetail = require("./components/UserDetail/index.jsx");
const UserPhotos = require("./components/UserPhotos/index.jsx");
const UserComments = require("./components/UserComments/index.jsx");

function App() {
  const [selectedUserId, setSelectedUserId] = React.useState(null);
  const [view, setView] = React.useState("detail"); // 'detail', 'photos', 'comments'

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
    setView("detail");
  };

  const handleCommentCountClick = (userId) => {
    setSelectedUserId(userId);
    setView("comments");
  };

  const handlePhotoSelect = (photoId) => {
    // Navigate to photo detail view
    console.log("Navigate to photo:", photoId);
    // Có thể implement photo detail view ở đây
  };

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      <div style={{ width: "250px" }}>
        <UserList onUserSelect={handleUserSelect} onCommentCountClick={handleCommentCountClick} />
      </div>
      <div style={{ flex: 1 }}>
        {view === "detail" && <UserDetail userId={selectedUserId} />}
        {view === "photos" && <UserPhotos userId={selectedUserId} onPhotoSelect={handlePhotoSelect} />}
        {view === "comments" && <UserComments userId={selectedUserId} onPhotoSelect={handlePhotoSelect} />}
        {selectedUserId && view === "detail" && (
          <button onClick={() => setView("photos")} style={{ marginTop: "20px" }}>
            Xem Photos
          </button>
        )}
      </div>
    </div>
  );
}

module.exports = App;


