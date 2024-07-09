
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';

import './Board.css'; // Assuming Board-specific styles are in Board.css
import getUserInfo from '../../api/getUserInfo';


const Board = () => {
  const [posts, setPosts] = useState([]);

  const [sortBy, setSortBy] = useState('views'); // 기본 정렬 기준은 인기순(HOT🔥)
  const [sortOrder, setSortOrder] = useState('desc'); // 정렬 순서: desc (내림차순) or asc (오름차순)
  const [searchKeyword, setSearchKeyword] = useState('');

  const [userInfo, setUserInfo] = useState(null);


   useEffect(() => {
   fetchPosts();

   }, [sortBy, sortOrder]); // sortBy, sortOrder가 변경될 때마다 useEffect가 다시 실행됨


   useEffect(() => {
    // 컴포넌트가 마운트될 때 한 번만 실행되어야 하는 fetchUserInfo 함수 호출
    // fetchUserInfo();
  }, []);


  // // 사용자 정보를 가져오는 함수
  // const fetchUserInfo = async () => {
  //   try {
  //     const userInfo = await getUserInfo();
  //     console.log('User Info:커뮤니티 ', userInfo);
  //     console.log("아이디" + userInfo.id);
  //     setUserInfo(userInfo);
  //   } catch (error) {
  //     console.error('Error fetching user info: 커뮤니티', error);
  //   }
  // };
  
  // 게시물 데이터를 서버에서 가져오는 함수

  const fetchPosts = async () => {
    try {
      const encodedKeyword = encodeURIComponent(searchKeyword);
      const response = await axios.get(`/board/search?keyword=${encodedKeyword}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortBy(value); // 새로운 정렬 기준을 설정
    setSortOrder('desc'); // 정렬 순서 초기화 (최신순 기준으로)
  };

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchKeyword(value); // 검색어 입력 필드 변경 시 검색어 상태 업데이트
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchPosts(); // 검색 버튼 클릭 시 게시물을 다시 불러오도록 처리
  };

  return (
    <div className="board-container">
      <div className="board-header">
        <h2>게시판</h2>
      </div>

      <hr className="board-divider" /><br/>

      <div className="board-toolbar">
        <select className="board-sort-select" value={sortBy} onChange={handleSortChange}>
          <option value="views">HOT🔥</option>
          <option value="postDate">최신순</option>
          <option value="comments">댓글순</option>
        </select>
        <div className="board-search-container">
          <form onSubmit={handleSearchSubmit}>
            <div className="board-search">
              <input type="text" placeholder="검색어를 입력하세요" className="board-search-input" value={searchKeyword} onChange={handleSearchInputChange} />
              <button type="submit" className="board-search-button">검색</button>
            </div>
          </form>
        </div>
        <Link to="/layout/post" className="board-button board-write-button" style={{textDecoration: 'none'}}>글쓰기</Link>
      </div>

      <div>
        <table className="board-table">
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
          <tbody className='board-tbody'>
            {posts.map(post => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>
                  <Link to={`/layout/detail/${post.id}`}>{post.title}</Link>
                </td>
                <td>{post.author}</td>
                <td>{post.postDate}</td>
                <td>{post.views}</td>
                <td>{post.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Board;