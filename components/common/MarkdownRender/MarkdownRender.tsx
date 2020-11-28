import React, { Component, useState, useEffect } from 'react';
import styles from './MarkdownRender.module.scss';
import classNames from 'classnames/bind';
import usePrevious from '@lib/usePrevious';

import marked from 'marked';

// prism 관련 코드 불러오기
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
// 지원할 코드 형식들을 불러온다.
// http://prismjs.com/#languages-list 참조
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-jsx.min.js';
import 'prismjs/components/prism-css.min.js';

const cx = classNames.bind(styles);

interface MarkdownRenderProps {
  markdown: string;
}
function MarkdownRenderF(props: MarkdownRenderProps) {
  const [html, setHtml] = useState(props.markdown ? marked(props.markdown, { breaks: true, sanitize: true }) : '');

  useEffect(() => {
    // DidMount
    console.log('did mount');
    Prism.highlightAll();

    return function cleanup() {
      // WillUnMount
    }
  }, []);

  // const prevMarkdown = usePrevious(props.markdown);
  // useEffect(() => {
  //   console.log('useEffect props');
  //   // DidUpdate
  //   // markdown 값이 변경되면 renderMarkdown을 호출한다.
  //   if (prevMarkdown !== undefined && prevMarkdown !== props.markdown) {
  //     console.log('markdown update ', [props.markdown]);
  //     renderMarkdown();
  //   }
  // }, [props.markdown]);

  // const prevHtml = usePrevious(html);
  // useEffect(() => {
  //   console.log('useEffect state');
  //   // DidUpdate
  //   // state가 바뀌면 코드 하이라이팅
  //   if (prevHtml !== undefined && prevHtml !== html) {
  //     console.log('html update');
  //     Prism.highlightAll();
  //   }
  // }, [html]);

  useEffect(() => {
    console.log('markdown and html update');
    renderMarkdown();
    Prism.highlightAll();
  }, [props.markdown, html]);

  function renderMarkdown() {
    const { markdown } = props;
    console.log('renderMarkdown ', markdown);
    // 마크다운이 존재하지 않는다면 공백 처리한다.
    if (!markdown) {
      setHtml('')
      return;
    }

    setHtml(marked(markdown, {
      breaks: true, // 일반 엔터로 새 줄 입력
      sanitize: true // 마크다운 내부 html 무시
    }));
  }

  const markup = {
    __html: html,
  }

  return (<div className={cx('markdown-render')} dangerouslySetInnerHTML={markup} />);
}

interface MarkdownRenderState {
  html: string;
}
class MarkdownRender extends Component<MarkdownRenderProps> {
  state: MarkdownRenderState;

  constructor(props: MarkdownRenderProps) {
    super(props);

    const { markdown } = this.props;

    // 서버사이드 렌더링에서도 마크다운 처리가 되도록 constructor 쪽에서도 구현한다.
    this.state = {
      html: markdown ? marked(props.markdown, { breaks: true, sanitize: true }) : ''
    }
  }

  componentDidMount() {
    console.log('did mount');
    Prism.highlightAll();
  }

  componentDidUpdate(prevProps: MarkdownRenderProps, prevState: MarkdownRenderState) {
    // markdown 값이 변경되면 renderMarkdown을 호출한다.
    if (prevProps.markdown !== this.props.markdown) {
      console.log('markdown update');
      this.renderMarkdown();
    }
    // state가 바뀌면 코드 하이라이팅
    if (prevState.html !== this.state.html) {
      console.log('html update');
      Prism.highlightAll();
    }
  }

  renderMarkdown = () => {
    const { markdown } = this.props;
    console.log('renderMarkdown ', markdown);
    // 마크다운이 존재하지 않는다면 공백 처리한다.
    if (!markdown) {
      this.setState({ html: '' })
      return;
    }

    this.setState({
      html: marked(markdown, {
        breaks: true, // 일반 엔터로 새 줄 입력
        sanitize: true // 마크다운 내부 html 무시
      })
    })
  }


  render() {
    const { html } = this.state;

    /* 
      React에서 html을 렌더링하려면 객체를 만들어 내부에
      __html 값을 설정해야 한다.
    */
    const markup = {
      __html: html
    }

    // 그리고 dangerouslySetInnerHTML 값에 해당 객체를 넣어 주면 된다.
    return (
      <div className={cx('markdown-render')} dangerouslySetInnerHTML={markup} />
    );
  }
}

// TODO: Functional로 하니까 오히려 깜빡임이 생겼다.
export default MarkdownRenderF;