const SERVER_BASE_URL = 'http://localhost:3001';

export async function getPostsData() {
   const posts = await fetch(`${SERVER_BASE_URL}/homepage-posts`)
      .then(res => res.json());
   posts.forEach((post, index) => {
      const expirationDate = new Date(post.expirationDate);
      const now = new Date();
      posts[index].secondsRemaining = Math.floor((expirationDate.getTime() - now.getTime()) / 1000);
   });
   return posts;
};

export async function createPost(content) {
   await fetch(`${SERVER_BASE_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
   });
};

export async function likePost(uuid) {
   await fetch(`${SERVER_BASE_URL}/like-post/${uuid}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
   });
};
