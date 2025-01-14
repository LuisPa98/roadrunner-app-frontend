import { useState, useEffect } from "react";
import { getAllUsers } from "../../Services/users.js";
import SearchUser from "../../Components/SearchUser/searchUser.jsx";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import "./search.css";

function Search() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  //Get 4 random users assosicated with the app
  const getUsers = async () => {
    const response = await getAllUsers();

    // Shuffle array and slice up to the first 5 elements or the total length of the array
    const randomUsers = response
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.min(4, response.length));
    // setUsers(randomUsers);
    setUsers(randomUsers);
  };

  //Searches for users that contain the query input
  const onSearchForUser = async (event) => {
    event.preventDefault();
    const query = event.target.elements.querySearch.value;
    console.log(query);

    // Checks if the query is not just whitespace.
    if (query.trim()) {
      const response = await getAllUsers(query);
      console.log(response);
      setUsers(response);
    } else {
      setUsers(users);
    }
  };

  return (
    <div className="searchContainer">
      <h1 className="searchForUserHeading">Search For A User</h1>

      <div className="searchWrapper">
        <form className="searchFormContainer" onSubmit={onSearchForUser}>
          <input
            name="querySearch"
            className="searchInput"
            type="search"
            placeholder="Search"
          />
          <button type="submit" class="searchBtn">
            <FiSearch color="#F1600D" size={55} />
          </button>
        </form>
      </div>

      {/* Conditionally render search results or all users. Display search results if available, otherwise display all users. */}
      <div>
        {users.length > 0 ? (
          users.map((userProfile) => (
            <Link
              className="searchLinkToUserProfile"
              key={userProfile.user.id}
              to={`/profile/${userProfile.user}/`}
            >
              <div className="searchUserProfileContainer">
                <SearchUser
                  picture={userProfile.picture}
                  username={userProfile.username}
                />
              </div>
            </Link>
          ))
        ) : (
          <p>No user found</p>
        )}
      </div>
    </div>
  );
}

export default Search;
