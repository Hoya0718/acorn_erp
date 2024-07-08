import React, { useState } from 'react';
import axios from '../../api/axios';
import './BoardComment.css';

const BoardComment = ({ postId, onAddComment }) => {
  const [newComment, setNewComment] = useState({ author: '', content: '' });

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
      onAddComment(response.data);
      setNewComment({ author: '', content: '' });
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
    </div>
  );
};

export default BoardComment;
