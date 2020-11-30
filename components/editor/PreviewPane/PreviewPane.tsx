import React from 'react';
import styles from './PreviewPane.module.scss';
import classNames from 'classnames/bind';
import MarkdownRender from 'components/common/MarkdownRender';

const cx = classNames.bind(styles);

type PreviewPaneType = {
  markdown: string;
  title: string;
}
const PreviewPane = ({ markdown, title }: PreviewPaneType) => (
  <div className={cx('preview-pane')}>
    <h1 className={cx('title')}>
      {title}
    </h1>
    <div>
      <MarkdownRender markdown={markdown} />
    </div>
  </div>
);

export default PreviewPane;