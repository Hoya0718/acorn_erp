import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios'; // axios를 직접 import
import BoardComment from './BoardComment'; // 댓글창 컴포넌트 import

const BoardDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPostById = async (id) => {
      try {
        const response = await axios.get(`/board/posts/${id}`);
        setPost(response.data);
        setComments(response.data.comments); // 게시글의 comments 필드를 받아와서 사용
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPostById(id);
  }, [id]);

  const handleAddComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]); // 새 댓글을 목록에 추가
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="board-container">
      <div className="board-header">
        <h2>상세 페이지</h2>
      </div>
      <hr className="board-divider" />

      <div className="board-detail">
        <h3>{post.title}</h3>
        <p>작성자: {post.author}</p>
        <p>작성일: {post.date}</p>
        <p>{post.content}</p>
      </div>

      <div className="comment-section">
        <h3>댓글</h3>
        <ul>
        {comments.length > 0 && (
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                <p>작성자: {comment.author}</p>
                <p>{comment.content}</p>
                <p>작성일: {comment.date}</p>
              </li>
            ))}
          </ul>
        )}
        </ul>
        <BoardComment postId={id} onAddComment={handleAddComment} />
      </div>
    </div>
  );
};

export default BoardDetail;
