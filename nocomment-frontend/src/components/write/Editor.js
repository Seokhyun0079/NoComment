import React, { useCallback, useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import styled from 'styled-components';
import { imageFileUpload } from '../../lib/api/imageFileUpload';

const EditorBlock = styled(Responsive)`
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 2rem;
  width: 100%;
`;

const QuillWrapper = styled.div`
  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  .ql-editor.ql-blank::before {
    left: 0px;
  }
`;

const Ediotr = ({ title, body, onChangeField }) => {
  const quillElement = useRef(null);
  const quillInstance = useRef(null);
  const imageRef = useRef();
  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'bubble',
      placeholder: '내용을 작성하세요....',
      modules: {
        toolbar: [
          [{ header: '1' }, { header: '2' }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'code-block', 'link', 'image'],
        ],
      },
    });
    const quill = quillInstance.current;
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('image', onClickImageBtn);

    if (body != '') quill.setContents(quill.clipboard.convert(body)); // 수정 페이지 / 기존 텍스트 세팅 / 2021.05.02(sohot8653)
    quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        onChangeField({ key: 'body', value: quill.root.innerHTML });
      }
    });
  }, [onChangeField]);

  const onChangeTitle = (e) => {
    onChangeField({ key: 'title', value: e.target.value });
  };
  const onClickImageBtn = useCallback(() => {
    imageRef.current.click();
  }, [imageRef.current]);
  const onChangeImageInput = (e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('file', f);
    });
    imageFileUpload({ url: 'postImage', formData: imageFormData }).then(
      (result) => {
        const response = result.data;
        let uploadedFileName =
          'https://nocommentbuket.s3-ap-northeast-1.amazonaws.com/postImage/' +
          response;
        quillInstance.current.root.innerHTML =
          quillInstance.current.root.innerHTML +
          `<img style="max-width: 100%;" src="${uploadedFileName}"/>`;
      },
    );
  };

  return (
    <>
      <EditorBlock>
        <TitleInput
          placeholder="제목을 입력하세요"
          onChange={onChangeTitle}
          value={title}
        />
        <QuillWrapper>
          <div ref={quillElement} />
        </QuillWrapper>
      </EditorBlock>
      {/* <ImageDailogContainer /> 開発保留 */}
      <input hidden type="file" onChange={onChangeImageInput} ref={imageRef} />
    </>
  );
};

export default Ediotr;
