function Post ({ post, handleLike }) {
   const { content, likes, secondsRemaining, uuid } = post;
   return(
      <div style={styles.mainContainer}>
         <div style={styles.topContainer}>
            <span>{content}</span>
            <button onClick={() => {
               handleLike(uuid);
            }}>
               Like
            </button>
         </div>
         <span>Disappears in {secondsRemaining.toString()}</span>
         <span>{likes} likes</span>
      </div>
   );
}

const styles = {
   mainContainer: {
      width: '90%',
      height: '100px',
      backgroundColor: '#ffffff',
      marginBottom: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      border: '1px solid #cfd0d1',
      paddingTop: '5px',
      paddingBottom: '5px',
      borderRadius: '5px',
   },
   topContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'space-around',
   },
};

export default Post;
