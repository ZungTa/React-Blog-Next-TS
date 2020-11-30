import React from 'react';
import styles from './EditorHeader.module.scss';
import classNames from 'classnames/bind';
import Button from '@components/common/Button';

const cx = classNames.bind(styles);

type EditorHeaderPropsType = {
  onGoBack: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onSubmit: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  isEdit: boolean;
}
const EditorHeader = ({ onGoBack, onSubmit, isEdit }: EditorHeaderPropsType) => (
  <div className={cx('editor-header')}>
    <div className={cx('back')}>
      <Button onClick={onGoBack} theme='outline'>뒤로가기</Button>
    </div>
    <div className={cx('submit')}>
      <Button onClick={onSubmit} theme='outline'>{isEdit ? '수정' : '작성'}하기</Button>
    </div>
  </div>
);

export default EditorHeader;