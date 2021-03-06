import React, { Component, useEffect } from 'react';
import styles from './EditorPane.module.scss';
import classNames from 'classnames/bind';
import usePrevious from '@lib/usePrevious';

import CodeMirror from 'codemirror';

import 'codemirror/mode/markdown/markdown'; // 마크다운 문법 색상
// 마크다운 내부에 들어가는 코드 색상
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/css/css';
import 'codemirror/mode/shell/shell';

// CodeMirror를 위한 CSS 스타일
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

const cx = classNames.bind(styles);

type EditorPanePropsType = {
  markdown: string;
  title: string;
  tags: string;
  onChangeInput: (param: { name: string; value: string }) => void;
}
type handleChangeMarkdownType = (instance: CodeMirror.Editor, changeObj: CodeMirror.EditorChangeLinkedList) => void;
function EditorPaneF(props: EditorPanePropsType) {
  let editor: HTMLElement | null = null; // 에디터 ref
  let codeMirror: CodeMirror.Editor | null = null; // codeMirror 인스턴스
  let cursor: number | CodeMirror.Position | null = null; // 에디터의 텍스트 cursor 위치

  useEffect(() => {
    // DidMount
    initializeEditor();
  }, []);

  const prevMarkdown = usePrevious(props.markdown);
  useEffect(() => {
    if (prevMarkdown !== undefined && prevMarkdown !== props.markdown) {
      if (!codeMirror) return; // 인스턴스를 아직 만들지 않았을 때
      codeMirror.setValue(props.markdown);
      if (!cursor) return; // 커서가 없을 때
      codeMirror.setCursor(cursor);
    }
  }, [props.markdown]);

  const initializeEditor = () => {
    codeMirror = CodeMirror(editor as HTMLElement, {
      mode: 'markdown',
      theme: 'monokai',
      lineNumbers: true, // 왼쪽에 라인 넘버 띄우기
      lineWrapping: true // 내용이 너무 길면 다음 줄에 작성
    });
    codeMirror.on('change', handleChangeMarkdown);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChangeInput } = props;
    const { value, name } = e.target;
    onChangeInput({ name, value });
  }

  const handleChangeMarkdown: handleChangeMarkdownType = (doc) => {
    const { onChangeInput } = props;
    cursor = doc.getCursor(); // 텍스트 cursor 위치 저장
    onChangeInput({
      name: 'markdown',
      value: doc.getValue()
    })
  }


  return (
    <div className={cx('editor-pane')}>
      <input
        className={cx('title')}
        placeholder="제목을 입력하세요"
        name="title"
        value={props.title}
        onChange={handleChange}
      />
      <div className={cx('code-editor')} ref={ref => editor = ref}></div>
      <div className={cx('tags')}>
        <div className={cx('description')}>태그</div>
        <input
          name="tags"
          placeholder="태그를 입력하세요 (쉼표로 구분)"
          value={props.tags}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

class EditorPane extends Component<EditorPanePropsType> {

  editor: HTMLElement | null = null; // 에디터 ref
  codeMirror: CodeMirror.Editor | null = null; // codeMirror 인스턴스
  cursor: number | CodeMirror.Position | null = null; // 에디터의 텍스트 cursor 위치

  initializeEditor = () => {
    this.codeMirror = CodeMirror(this.editor as HTMLElement, {
      mode: 'markdown',
      theme: 'monokai',
      lineNumbers: true, // 왼쪽에 라인 넘버 띄우기
      lineWrapping: true // 내용이 너무 길면 다음 줄에 작성
    });
    this.codeMirror.on('change', this.handleChangeMarkdown);
  }

  componentDidMount() {
    this.initializeEditor();
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChangeInput } = this.props;
    const { value, name } = e.target;
    onChangeInput({ name, value });
  }

  handleChangeMarkdown: handleChangeMarkdownType = (doc) => {
    const { onChangeInput } = this.props;
    this.cursor = doc.getCursor(); // 텍스트 cursor 위치 저장
    onChangeInput({
      name: 'markdown',
      value: doc.getValue()
    })
  }

  componentDidUpdate(prevProps: Readonly<EditorPanePropsType>, prevState: Readonly<{}>) {
    /* 
      markdown이 변경되면 에디터 값도 변경한다.
      이 과정에서 텍스트 커서의 위치가 초기화되기 때문에,
      저장한 커서의 위치가 있으면 해당 위치로 설정한다.
    */
    if (prevProps.markdown !== this.props.markdown) {
      const { codeMirror, cursor } = this;
      if (!codeMirror) return; // 인스턴스를 아직 만들지 않았을 때
      codeMirror.setValue(this.props.markdown);
      if (!cursor) return; // 커서가 없을 때
      codeMirror.setCursor(cursor);
    }
  }

  render() {
    const { handleChange } = this;
    const { tags, title } = this.props;

    return (
      <div className={cx('editor-pane')}>
        <input
          className={cx('title')}
          placeholder="제목을 입력하세요"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <div className={cx('code-editor')} ref={ref => this.editor = ref}></div>
        <div className={cx('tags')}>
          <div className={cx('description')}>태그</div>
          <input
            name="tags"
            placeholder="태그를 입력하세요 (쉼표로 구분)"
            value={tags}
            onChange={handleChange}
          />
        </div>
      </div>
    );
  }
}

export default EditorPaneF;