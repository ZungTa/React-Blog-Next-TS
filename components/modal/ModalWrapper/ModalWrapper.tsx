import React, { Component, useEffect, useState } from 'react';

import styles from './ModalWrapper.module.scss';
import classNames from 'classnames/bind';
import usePrevious from '../../../lib/usePrevious';

const cx = classNames.bind(styles);

type ModalWrapperPropsType = Readonly<{
  visible: boolean;
  children: JSX.Element;
}>;
function ModalWrapperF(props: ModalWrapperPropsType) {
  const [animate, setAnimate] = useState(false);

  const startAnimation = () => {
    // animate 값을 true로 설정 후
    setAnimate(true);

    // 250ms 이후 다시 false로 설정
    setTimeout(() => {
      setAnimate(false);
    }, 250);
  }

  // const prevVisible = usePrevious(props.visible || false);
  console.log('props? ', props);
  const prevVisible = usePrevious(props.visible);
  console.log('prevVisible1', prevVisible, props.visible)
  useEffect(() => {
    if (prevVisible !== undefined && prevVisible !== props.visible) {
      console.log('prevVisible2', prevVisible, props.visible)
      console.log('useEffect start Animation');
      startAnimation();
    }
    return () => {
      // willUpdate

      // startAnimation();
    }
  }, [props.visible]);

  // visible과 animate 값이 둘 다 false일 때만 null을 리턴
  if (!props.visible && !animate) return null;

  // 상태에 따라 애니메이션 설정
  const animation = animate && (props.visible ? 'enter' : 'leave');
  console.log(animation);
  return (
    <div>
      <div className={cx('gray-background', animation)} />
      <div className={cx('modal-wrapper')}>
        <div className={cx('modal', animation)}>
          {props.children}
        </div>
      </div>
    </div>
  );
}

class ModalWrapper extends Component<ModalWrapperPropsType> {
  state: { animate: boolean };
  constructor(props: ModalWrapperPropsType) {
    super(props);
    this.state = {
      animate: false
    }
  }

  startAnimation = () => {
    // animate 값을 true로 설정 후
    this.setState({
      animate: true
    });

    // 250ms 이후 다시 false로 설정
    setTimeout(() => {
      this.setState({
        animate: false
      })
    }, 250);
  }

  componentDidUpdate(prevProps: ModalWrapperPropsType, prevState: {}) {
    if (prevProps.visible !== this.props.visible) {
      this.startAnimation();
    }
  }

  render() {
    console.log('render function ', this.state.animate);
    const { children, visible } = this.props;
    const { animate } = this.state;

    // visible과 animate 값이 둘 다 false일 때만 null을 리턴
    if (!visible && !animate) return null;

    // 상태에 따라 애니메이션 설정
    const animation = animate && (visible ? 'enter' : 'leave');

    return (
      <div>
        <div className={cx('gray-background', animation)} />
        <div className={cx('modal-wrapper')}>
          <div className={cx('modal', animation)}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}


export default ModalWrapperF;