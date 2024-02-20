import "./App.css";
import { Auth } from "./components/auth";
import { db, auth, storage } from "./config/firebase-config";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscarWinner, setIsNewMovieOscarWinner] = useState(false);
  const [updateTitleState, setUpdateTitleState] = useState("");
  const [fileUploadState, setFileUploadState] = useState(null);

  const movieCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(movieCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovies(filteredData);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    try {
      deleteDoc(movieDoc);
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmitMovie = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        oscarWinner: isNewMovieOscarWinner,
        userID: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (e) {
      console.error(e);
    }
  };

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    try {
      await updateDoc(movieDoc, { title: updateTitleState });
    } catch (e) {
      console.error(e);
    }
  };

  const handleUploadFile = async () => {
    if (!fileUploadState) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUploadState.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUploadState);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getMovieList();
  }, [onSubmitMovie]);
  return (
    <div className="App">
      Firebase Course
      <Auth />
      <div>
        <input
          placeholder={"Movie Title..."}
          type="text"
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder={"Release Date..."}
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={isNewMovieOscarWinner}
          onChange={(e) => setIsNewMovieOscarWinner(e.target.checked)}
        />
        <label>Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movies.map((movie) => (
          <div>
            <h1 style={{ color: movie.oscarWinner ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input
              type="text"
              onChange={(e) => setUpdateTitleState(e.target.value)}
              placeholder={"New Title..."}
            />
            <button onClick={() => updateMovieTitle(movie.id)}>
              Update Title
            </button>
          </div>
        ))}
      </div>
      <div>
        <input
          onChange={(e) => setFileUploadState(e.target.files[0])}
          type="file"
        />
        <button onClick={handleUploadFile}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
