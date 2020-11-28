import React from 'react';
import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
// import { Link } from 'react-router-dom';
import Link from 'next/link'

const cx = classNames.bind(styles);

interface FooterProps {
    onLoginClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    logged: boolean;
}
const Footer = ({ onLoginClick, logged }: FooterProps) => (
    <footer className={cx('footer')}>
        <Link href="/" >
            <a className={cx('brand')}>
                reactblog
            </a>
        </Link>
        <div className={cx('admin-login')} onClick={onLoginClick}>
            {logged ? '로그아웃' : '관리자 로그인'}
        </div>
    </footer>
);

export default Footer;
