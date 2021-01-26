import React from 'react';
import Responsive from '../components/common/Responsive';
import HeaderContainer from '../containers/common/HeaderContainer';
import EditorContainer from '../containers/write/EditorContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import WriteActionButtonsContainer from '../containers/common/WriteActionButtonsContainer';
import ImageDailogContainer from '../containers/write/ImageDialogContainer';

const WritePage = () => {
  return (
    <>
      <HeaderContainer />
      <Responsive>
        <EditorContainer />
        <TagBoxContainer />
        <ImageDailogContainer />
        <WriteActionButtonsContainer />
      </Responsive>
    </>
  );
};

export default WritePage;
