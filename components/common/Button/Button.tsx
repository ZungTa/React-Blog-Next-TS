import React, { ReactNode } from 'react';
import Link from 'next/link';
// import { Link } from 'react-router-dom';
import styles from './Button.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

// 전달받은 className, onClick 등 값들이 rest 안에 들어있다.
// JSX에서 ...을 사용하면 내부에 있는 값들을 props로 넣어 준다.
interface DivProps {
  children: ReactNode;
  className: string;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}
// type DivType = (param: DivProps) => JSX.Element;
// const Div = ({ children, className, onClick, ...rest }: DivProps): JSX.Element => <div {...rest}>{children}</div>

interface ButtonProps {
  children: ReactNode;
  to?: string;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  disabled?: boolean;
  theme?: string;
}
// TODO: 개선 필요
const Button = ({
  children, to, onClick, disabled, theme = 'default'
}: ButtonProps) => {
  // 비활성화 하면 onClick은 실행되지 않는다.
  // disabled 값이 true가 되면 className에 disabled를 추가한다.
  if (to && !disabled) {
    return (
      <Link
        href={to}
      >
        <a
          className={cx('button', theme, { disabled })}
          onClick={disabled ? () => null : onClick}
        >
          {children}
        </a>
      </Link>
    )
  } else {
    return (
      <div
        className={cx('button', theme, { disabled })}
        onClick={disabled ? () => null : onClick}
      >
        {children}
      </div>
    )
  }

  // to 값이 존재하면 Link를 사용하고, 그렇지않으면 div를 사용한다.
  // 비활성화되어 있는 버튼일 때도 div를 사용한다.
  // const Element = (to && !disabled) ? Link : Div;
  // return (
  //   <Element
  //     to={to}
  //     className={cx('button', theme, { disabled })}
  //     onClick={disabled ? () => null : onClick}
  //   >
  //   </Element>
  // )
};

export default Button;