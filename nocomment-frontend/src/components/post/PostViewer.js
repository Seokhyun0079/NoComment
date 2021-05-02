import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Helmet } from 'react-helmet-async';
import Avatar from '@material-ui/core/Avatar';

const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
  background: white;
  padding-top: 1rem;
  img {
    max-width: 100%;
  }
`;
const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
  border-bottom: 1px solid ${palette.gray[2]};
`;

const InfoArea = styled.div`
  display: flex;
`;

const TextInfoArea = styled.div`
  width: 90%;
`;

const ImageInfoArea = styled.div`
  margin-right: 2%;
  margin-top: 1%;
`;

// 기본 프로필 이미지 경로
const fallbackImage =
  'https://nocommentbuket.s3-ap-northeast-1.amazonaws.com/commonImage/defualt-profile-img.png';

const PostViewer = ({ post, error, loading, actionButtons, ownPost }) => {
  // 에러 발생 시
  if (error) {
    if (error.response && error.response.status === 404) {
      return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>;
    }
    return <PostViewerBlock>오류 발생!</PostViewerBlock>;
  }

  // 로딩중이거나, 아직 포스트 데이터가 없을 시
  if (loading || !post) {
    return null;
  }

  const { title, body, noCommenter, publishedDate, tags } = post;
  const profileImage = noCommenter.profileImg
    ? 'https://nocommentbuket.s3-ap-northeast-1.amazonaws.com/profileImage/' +
      noCommenter.profileImg
    : fallbackImage;

  return (
    <PostViewerBlock>
      <Helmet>
        <title>{title} NOCOMMENT</title>
      </Helmet>
      <PostHead>
        <InfoArea>
          <ImageInfoArea>
            <Avatar
              src={profileImage}
              style={{
                width: 95,
                height: 95,
              }}
            ></Avatar>
          </ImageInfoArea>
          <TextInfoArea>
            <h1>{title}</h1>
            <SubInfo
              name={noCommenter.name}
              stringId={noCommenter.stringId}
              publishedDate={publishedDate}
              hasMarginTop
            />
            <Tags tags={tags} />
          </TextInfoArea>
        </InfoArea>
      </PostHead>
      {actionButtons}
      <PostContent dangerouslySetInnerHTML={{ __html: body }} />
    </PostViewerBlock>
  );
};

export default PostViewer;
