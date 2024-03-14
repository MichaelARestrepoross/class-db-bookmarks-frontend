import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_BASE_URL;

function BookmarkDetails() {
  const [bookmark, setBookmark] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/bookmarks/${id}`)
    .then((response) => response.json())
    .then((data) => setBookmark(data))
    .catch((error) => console.error(error));
  }, [id]);

  function deleteBookmark () {
    fetch(`${API}/bookmarks/${id}`, {
      method: 'DELETE',
    })
    .then(() => navigate(`/bookmarks`))
    .catch((error) => console.error(error))
  }
  
  
  return (
    <article>
      <h3>{bookmark.is_favorite ? <span>⭐️</span> : null} {bookmark.name}</h3>
      <h5>
        <span>
          <a href={bookmark.url}>{bookmark.name}</a>
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {bookmark.url}
      </h5>
      <h6>{bookmark.category}</h6>
      <p>{bookmark.description}</p>
      <div className="showNavigation">
        <div>
          <Link to={`/bookmarks`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          <Link to={`/bookmarks/${id}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
        <button onClick={deleteBookmark}>Delete</button>
        </div>
      </div>
    </article>
  )
}

export default BookmarkDetails;
