import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import palette from '../../lib/styles/palette';
const PagerBlock = styled.div`
  width: 300px;
  height: 50px;
  margin-left: auto;
  margin-right: auto;
  background: ${palette.gray[1]};
  border-radius: 30px;
  text-align: center;
  padding-top: 15px;
  color: ${palette.gray[5]};
  box-shadow: 0px 0px 0px 8px ${palette.gray[5]};
`;
const H4 = styled.h4`
  margin-top: auto;
  margin-bottom: auto;
`;
const PostPager = ({ lastPage, page }) => {
  if (!page) {
    page = 1;
  }
  return (
    <PagerBlock>
      <H4>
        <Link to={`?page=${page - 1}`}>◀</Link>
        {[...Array(lastPage)].map((n, index) => {
          return (
            <Link to={`?page=${index + 1}`} key={index}>
              {' '}
              {index + 1 < 10 ? '0' + (index + 1) : index + 1}
            </Link>
          );
        })}{' '}
        <Link to={`?page=${Number(page) + 1}`}>▶</Link>
      </H4>
    </PagerBlock>
  );
};

export default PostPager;
