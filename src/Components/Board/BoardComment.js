import React, { useState } from 'react';
import axios from '../../api/axios';

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
      const response = await axios.post(`/comments`, {
        postId,
        ...newComment,
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
        <input
          type="text"
          placeholder="작성자"
          name="author"
          value={newComment.author}
          onChange={handleCommentChange}
        />
        <textarea
          placeholder="댓글을 입력하세요."
          name="content"
          value={newComment.content}
          onChange={handleCommentChange}
        />
        <button type="submit">댓글 작성</button>
      </form>
    </div>
  );
};

export default BoardComment;
