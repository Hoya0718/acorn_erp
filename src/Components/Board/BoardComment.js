
import React, { useState } from 'react';
import axios from '../../api/axios';
import './BoardComment.css';

const BoardComment = ({ postId, onAddComment }) => {
  const [newComment, setNewComment] = useState({ author: '', content: '' });
  const [prevComments, setPrevComments] = useState([]); // 댓글 목록을 배열로 관리

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/board/posts/${postId}/comments`, {
        commentContent: newComment.content,
      });
      const newCommentData = response.data; // 새로운 댓글 데이터
      setPrevComments((prev) => [...prev, newCommentData]); // 새로운 댓글을 추가
      setNewComment({ author: '', content: '' }); // 입력 필드 초기화
      if (typeof onAddComment === 'function') {
        onAddComment(newCommentData); // 부모 컴포넌트로 새 댓글 데이터 전달
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="comment-form">
      <form onSubmit={handleSubmitComment}>
        <textarea
          placeholder="댓글을 입력하세요."
          name="content"
          value={newComment.content}
          onChange={handleCommentChange}
        />
        <button type="submit">댓글 등록</button>
      </form>
      <div className="comment-list">
        {/* 예시: 댓글 목록 표시 */}
        {prevComments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.author}: {comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardComment;
