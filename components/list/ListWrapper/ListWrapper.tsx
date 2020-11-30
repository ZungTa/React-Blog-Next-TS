import React from 'react';
import styles from './ListWrapper.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type ListWrapperPropsType = {
  children: JSX.Element;
}
const ListWrapper = ({ children }: ListWrapperPropsType) => (
  <div className={cx('list-wrapper')}>
    {children}
  </div>
);

export default ListWrapper;