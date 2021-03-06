import React, { Component, useEffect } from 'react';
import PostInfo from 'components/post/PostInfo';
import PostBody from 'components/post/PostBody';
import * as postActions from 'store/modules/post';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import removeMd from 'remove-markdown';
import { Helmet } from 'react-helmet';

function PostF(props) {
    useEffect(() => {
        initialize();
    }, [])

    const initialize = async () => {
        const { PostActions, id } = props;
        try {
            await PostActions.getPost(id);
        } catch (e) {
            console.log(e);
        }
    }

    const { loading, post } = props;

    if (loading) return null; // 로딩 중에는 아무것도 보여주지 않음.

    const { title, body, publishedDate, tags } = post.toJS();

    return (
        <div>
            {/* body 값이 있을 때만 Helmet 설정 */}
            {body && (
                <Helmet>
                    <title>{title}</title>
                    {/* description이 너무 길면 안되니까 200자 제한 */}
                    <meta name="description" content={removeMd(body).slice(0, 200)} />
                </Helmet>
            )}
            <PostInfo title={title} publishedDate={publishedDate} tags={tags} />
            <PostBody body={body} />
        </div>
    );
}

class Post extends Component {
    initialize = async () => {
        const { PostActions, id } = this.props;
        try {
            await PostActions.getPost(id);
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.initialize();
    }

    render() {
        const { loading, post } = this.props;

        if (loading) return null; // 로딩 중에는 아무것도 보여주지 않음.

        const { title, body, publishedDate, tags } = post.toJS();

        return (
            <div>
                {/* body 값이 있을 때만 Helmet 설정 */}
                {body && (
                    <Helmet>
                        <title>{title}</title>
                        {/* description이 너무 길면 안되니까 200자 제한 */}
                        <meta name="description" content={removeMd(body).slice(0, 200)} />
                    </Helmet>
                )}
                <PostInfo title={title} publishedDate={publishedDate} tags={tags} />
                <PostBody body={body} />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        post: state.post.get('post'),
        loading: state.pender.pending['post/GET_POST'] // 로딩 상태 (boolean)
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch)
    })
)(PostF);