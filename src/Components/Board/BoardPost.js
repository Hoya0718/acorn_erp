import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import './BoardPost.css';

const BoardPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 가져오기

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 현재 날짜를 포맷팅하여 postDate 변수에 저장
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().slice(0, 10); // YYYY-MM-DD 형식으로 포맷

      const formData = {
        title: title,
        postDate: formattedDate, // 포맷팅된 현재 날짜
        content: content
      };

      const response = await axios.post('/board/posts', formData);

      console.log('게시물이 성공적으로 추가되었습니다:', response.data);
      
      // 게시물 추가 후 필요한 작업 (예: 홈페이지로 이동)
      navigate('/layout/board'); // navigate 함수를 이용하여 페이지 이동

    } catch (error) {
      console.error('게시물 추가 중 에러 발생:', error);
    }
  };

  return (
    <div className="board-container">
      <div className="board-header">
        <h2>게시물 작성</h2>
      </div>
      <hr className="board-divider" />

      <div className="board-write-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>제목</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>내용</label>
            <textarea
              rows="10"
              className="form-control"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group button-group">
            <Link to="/layout/board" className="btn btn-secondary">
              취소
            </Link>
            <button type="submit" className="btn btn-primary">
              작성하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BoardPost;
