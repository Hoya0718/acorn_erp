import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../../api/axios';
import BoardComment from './BoardComment';
import { ImEye } from "react-icons/im";
import { BiComment } from "react-icons/bi";
import './BoardDetail.css';

const BoardDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState({}); // 댓글 객체로 초기화

  useEffect(() => {
    const fetchPostById = async (postId) => {
      try {
        const response = await axios.get(`/board/posts/${postId}`);
        setPost(response.data);
        // 해당 게시물의 댓글 목록을 댓글 객체에 추가
        setComments(prevComments => ({
          ...prevComments,
          [postId]: response.data.comments
        }));
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPostById(id);
  }, [id]);

  const handleAddComment = (newComment) => {
    // 새로운 댓글을 해당 게시물의 댓글 객체에 추가
    setComments(prevComments => ({
      ...prevComments,
      [id]: prevComments[id] ? [...prevComments[id], newComment] : [newComment]
    }));
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/comments/${commentId}`);
      // 해당 댓글을 댓글 객체에서 삭제
      setComments(prevComments => ({
        ...prevComments,
        [id]: prevComments[id].filter(comment => comment.id !== commentId)
      }));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="board-detail-container">
      <div className="board-header">
        <h2>상세 페이지</h2>
      </div>
      <hr className="board-divider" />

      <div className="board-detail-content">
        <h3>{post.title} </h3><span>작성자:</span>{post.author}
        <span className='icon'><ImEye size={18}/> {post.views}&nbsp;&nbsp;&nbsp;
        <BiComment size={18}/> {post.comments}</span>
        <br/><br/><br/><p>{post.content}</p><br/><br/><br/>
        <div className="meta-info">  
          <p><span>작성일:</span> {post.postDate}</p>
          <p><span>수정일:</span> {post.lastModifiedDate}</p>
        </div>
      </div>
      <hr />

      <div className="button-group">
        <Link to="/layout/board" className="btn btn-secondary">
          메인
        </Link>
      </div>

      <BoardComment postId={id} onAddComment={handleAddComment} />

      <div className="comment-section">
        <hr className="board-divider"/>
        {comments[id] && comments[id].length > 0 ? (
          <ul className="comment-list">
            {comments[id].map((comment) => (
              <li key={comment.id} className="comment-item">
                <p>작성자: {comment.author}</p>
                <p>{comment.content}</p>
                <p>작성일: {comment.date}</p>
                <button onClick={() => handleDeleteComment(comment.id)}>삭제</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>등록된 댓글이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default BoardDetail;
