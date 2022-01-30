import Post from './components/Post';
import { useEffect, useState } from 'react';
import { getPostsData, createPost, likePost } from './services/posts-api';

function App() {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');

  useEffect(async () => {
    const postsData = await getPostsData();
    setPosts(postsData);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newPosts = [];
      for (const post of posts) {
        const newSecondsRemaining = post.secondsRemaining - 1;
        if (newSecondsRemaining > 0) {
          newPosts.push({
            ...post,
            secondsRemaining: newSecondsRemaining,
          });
        }
      }
      setPosts(newPosts);
    }, 1000);
    return () => { clearTimeout(timer); }
  }, [posts]);

  function handleNewPostContentChange(e) {
    setNewPostContent(e.target.value);
  }

  async function handlePostCreation() {
    await createPost(newPostContent);
    const newPosts = await getPostsData();
    setPosts(newPosts);
  }

  async function handleLike(uuid) {
    await likePost(uuid);
    const newPosts = await getPostsData();
    setPosts(newPosts);
  }

  return (
    <div style={styles.mainContainer}>
      <div style={styles.navbar}></div>
      <div style={styles.contentContainer}>
        <div style={styles.postsContainter}>
          {
            posts.map((post) => {
              return <Post
                  post={post}
                  handleLike={handleLike}
                />
            })
          }
        </div>
      </div>
      <div style={styles.newPostContainer}>
        <input onChange={handleNewPostContentChange} placeholder='Post content...'/>
        <button onClick={handlePostCreation}>Create post</button>
      </div>
    </div>
  );
}

const styles = {
  mainContainer: {
    backgroundColor: 'pink',
    height: '100vh',
    width: '100vw',
  },
  navbar: {
    height: '60px',
    width: '100vw',
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    backgroundColor: '#dae0e6',
    height: 'calc(100vh - 60px)',
    paddingLeft: '20vw',
  },
  postsContainter: {
    backgroundColor: '#dae0e6',
    padding: '20px 10px',
    width: '40vw',
    height: 'calc(100vh - 100px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  newPostContainer: {
    height: '100px',
    width: '20vw',
    position: 'fixed',
    right: '6vw',
    bottom: '40px',
    border: '1px solid #cfd0d1',
    backgroundColor: '#ffffff',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: '10px 20px',
  },
};

export default App;
