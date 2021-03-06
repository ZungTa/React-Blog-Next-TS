import React, { Component, useEffect } from 'react';
import PostList from 'components/list/PostList';
import Pagination from 'components/list/Pagination';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listActions from 'store/modules/list';
// import list from '../../store/modules/list';
import usePrevious from '../../lib/usePrevious';

function ListContainerF(props) {
    useEffect(() => {
        getPostList();
    }, []);

    const prevPage = usePrevious(props.page);
    const prevTag = usePrevious(props.tag);
    useEffect(() => {
        // 페이지/태그가 바뀔 때 리스트를 다시 불러온다.
        if (prevPage !== undefined && prevTag !== undefined) {
            if (prevPage !== props.page || prevTag !== props.tag) {
                getPostList();
                // 스크롤바를 맨 위로 올린다.
                document.documentElement.scrollTop = 0;
            }
        }
    }, [props.page, props.tag]);

    const getPostList = () => {
        // 페이지와 태그 값을 부모에게서 받아 온다.
        const { tag, page, ListActions } = props;
        ListActions.getPostList({ page, tag });
    };

    if (props.loading) return null; // 로딩중이면 아무것도 보이지 않는다.

    return (
        <div>
            <PostList posts={props.posts} />
            <Pagination page={props.page} lastPage={props.lastPage} tag={props.tag} />
        </div>
    );
}

class ListContainer extends Component {
    getPostList = () => {
        // 페이지와 태그 값을 부모에게서 받아 온다.
        const { tag, page, ListActions } = this.props;
        ListActions.getPostList({ page, tag });
    };

    componentDidMount() {
        this.getPostList();
    }

    componentDidUpdate(prevProps, prevState) {
        // 페이지/태그가 바뀔 때 리스트를 다시 불러온다.
        if (
            prevProps.page !== this.props.page ||
            prevProps.tag !== this.props.tag
        ) {
            this.getPostList();
            // 스크롤바를 맨 위로 올린다.
            document.documentElement.scrollTop = 0;
        }
    }

    render() {
        const { loading, posts, page, lastPage, tag } = this.props;

        if (loading) return null; // 로딩중이면 아무것도 보이지 않는다.

        return (
            <div>
                <PostList posts={posts} />
                <Pagination page={page} lastPage={lastPage} tag={tag} />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        posts: state.list.get('posts'),
        lastPage: state.list.get('lastPage'),
        loading: state.pender.pending['list/GET_POST_LIST'],
    }),
    (dispatch) => ({
        ListActions: bindActionCreators(listActions, dispatch),
    })
)(ListContainerF);
