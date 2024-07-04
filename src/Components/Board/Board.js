import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import './Board.css'; // Assuming Board-specific styles are in Board.css

const Board = () => {
  // 게시물 목록을 담을 상태 변수
  const [posts, setPosts] = useState([]);

  // 컴포넌트가 마운트될 때 게시물 데이터를 가져오는 useEffect
  useEffect(() => {
    fetchPosts();
  }, []);

  // 게시물 데이터를 서버에서 가져오는 함수
  const fetchPosts = async () => {
    try {
      const response = await axios.get('/board/list'); // 서버에서 게시물 목록을 가져오는 API 엔드포인트
      setPosts(response.data); // 가져온 데이터를 상태 변수에 저장
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div className="board-container">
      <div className="board-header">
        <h2>게시판</h2>
      </div>

      <hr className="board-divider" /><br/>

      <div className="board-toolbar">
        <div className="board-search-container">
          <div className="board-search">
            <input type="text" placeholder="검색어를 입력하세요" className="board-search-input" />
            <button className="board-search-button">검색</button>
          </div>
        </div>
        {/* 글쓰기 버튼을 Link 컴포넌트로 설정 */}
        <Link to="/layout/post" className="board-button board-write-button">글쓰기</Link>
      </div>

      <div className="board-table">
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>글쓴이</th>
              <th>작성일</th>
              <th>조회수</th>
              <th>댓글</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td>{post.id}</td>
                {/* 게시물 제목을 클릭하면 상세 페이지로 이동 */}
                <td><Link to={`/layout/detail/${post.id}`}>{post.title}</Link></td>
                <td>{post.author}</td>
                <td>{post.date}</td>
                <td>{post.views}</td>
                <td>{post.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
        )}
export default Board;
