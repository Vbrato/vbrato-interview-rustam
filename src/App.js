import logo from "./logo.svg";
import "./App.css";
import Posts from "./Posts";

// In this exercise, the candidate has to create an infinite scrolling list of items. When the user scrolls down, more items should be fetched and displayed. The candidate should implement the following features:

// - Fetch data from an API (e.g., https://jsonplaceholder.typicode.com/posts?_start=0&_limit=5).
// - Display the fetched data as a list of items.
// - Implement infinite scrolling: when the user scrolls to the bottom of the list, fetch more data     and add it to the list.
// - Note. The API supports use of _start a

function App() {
  return (
    <div className="App">
      <Posts />
    </div>
  );
}

export default App;
