import React from 'react';

const BoardDetail = ({ match }) => {
  // 상세 페이지 컴포넌트
  const postId = match.params.id; // URL 파라미터에서 게시물 ID 가져오기

  // 실제로는 postId를 사용하여 해당 게시물의 데이터를 불러오는 로직이 들어갈 수 있습니다.
  const post = {
    id: postId,
    title: `테스트 글 제목 ${postId}`,
    author: '작성자A',
    date: '2024-07-18',
    content: '게시물 내용입니다.',
  };

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
    </div>
  )}

export default BoardDetail;
