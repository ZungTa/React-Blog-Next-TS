import React from 'react';

import styles from './AskRemoveModal.module.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

type AskRemoveModalPropsType = {
  visible: boolean;
  onCancel: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onConfirm: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}
const AskRemoveModal = ({ visible, onCancel, onConfirm }: AskRemoveModalPropsType) => (
  <ModalWrapper visible={visible}>
    <div className={cx('question')}>
      <div className={cx('title')}>포스트 삭제</div>
      <div className={cx('description')}>이 포스트를 정말 삭제하시겠습니까?</div>
    </div>
    <div className={cx('options')}>
      <Button theme="gray" onClick={onCancel}>취소</Button>
      <Button onClick={onConfirm}>삭제</Button>
    </div>
  </ModalWrapper>
);


export default AskRemoveModal;