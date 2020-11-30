import React from 'react';
import styles from './PostBody.module.scss';
import classNames from 'classnames/bind';
import MarkdownRender from 'components/common/MarkdownRender';

const cx = classNames.bind(styles);

type PostBodyPropsType = Readonly<{
  body: string;
}>
const PostBody = ({ body }: PostBodyPropsType) => (
  <div className={cx('post-body')}>
    <div className={cx('paper')}>
      <MarkdownRender markdown={body} />
    </div>
  </div>
);

export default PostBody;