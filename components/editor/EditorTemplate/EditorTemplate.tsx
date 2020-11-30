import React, { Component, useState } from 'react';
import styles from './EditorTemplate.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type EditorTemplatePropsType = {
  header: JSX.Element;
  editor: JSX.Element;
  preview: JSX.Element;
}
type ListenerType = (this: HTMLElement, ev: MouseEvent) => any;
type MouseDownListenerType = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
function EditorTemplateF(props: Readonly<EditorTemplatePropsType>) {
  const [leftPercentage, setLeftPercentage] = useState(0.5);

  // separator 클릭 후 마우스를 움직이면 그에 따라 leftPercentage 업데이트
  const handleMouseMove: ListenerType = (e) => {
    setLeftPercentage(e.clientX / window.innerWidth);
  }

  // 마우스를 뗐을 때 등록한 이벤트 제거
  const handleMouseUp: EventListener = (e) => {
    document.body.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }

  // separator 클릭할 때
  const handleSeparatorMouseDown: MouseDownListenerType = (e) => {
    document.body.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }

  // 각 영역에 flex값 적용
  const leftStyle = {
    flex: leftPercentage
  };
  const rightStyle = {
    flex: 1 - leftPercentage
  };

  // separator 위치 설정
  const separatorStyle = {
    left: `${leftPercentage * 100}%`
  };

  return (
    <div className={cx('editor-template')}>
      {props.header}
      <div className={cx('panes')}>
        <div className={cx('pane', 'editor')} style={leftStyle}>
          {props.editor}
        </div>
        <div className={cx('pane', 'preview')} style={rightStyle}>
          {props.preview}
        </div>
        <div
          className={cx('separator')}
          style={separatorStyle}
          onMouseDown={handleSeparatorMouseDown}
        />
      </div>
    </div>
  );
}

class EditorTemplate extends Component<EditorTemplatePropsType> {
  state: { leftPercentage: number };
  constructor(props: EditorTemplatePropsType) {
    super(props);
    this.state = {
      leftPercentage: 0.5
    }
  }

  // separator 클릭 후 마우스를 움직이면 그에 따라 leftPercentage 업데이트
  handleMouseMove: ListenerType = (e) => {
    this.setState({
      leftPercentage: e.clientX / window.innerWidth
    });
  }

  // 마우스를 뗐을 때 등록한 이벤트 제거
  handleMouseUp: EventListener = (e) => {
    document.body.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  // separator 클릭할 때
  handleSeparatorMouseDown: MouseDownListenerType = (e) => {
    document.body.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }


  render() {
    const { header, editor, preview } = this.props;
    const { leftPercentage } = this.state;
    const { handleSeparatorMouseDown } = this;

    // 각 영역에 flex값 적용
    const leftStyle = {
      flex: leftPercentage
    };
    const rightStyle = {
      flex: 1 - leftPercentage
    };

    // separator 위치 설정
    const separatorStyle = {
      left: `${leftPercentage * 100}%`
    };

    return (
      <div className={cx('editor-template')}>
        {header}
        <div className={cx('panes')}>
          <div className={cx('pane', 'editor')} style={leftStyle}>
            {editor}
          </div>
          <div className={cx('pane', 'preview')} style={rightStyle}>
            {preview}
          </div>
          <div
            className={cx('separator')}
            style={separatorStyle}
            onMouseDown={handleSeparatorMouseDown}
          />
        </div>
      </div>
    );
  }
}

export default EditorTemplateF;