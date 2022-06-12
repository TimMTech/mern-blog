import styled from "styled-components"
import Post from "../../components/Blogs/Posts/Post"

const post = ({post}) => {
    return (
        <PostPageWrapper>
            <Post post={post}/>
        </PostPageWrapper>
    )
}

export default post

export const getStaticPaths = async() => {
    const res = await fetch("http://localhost:3000/api/post")
    const data = await res.json()

    const paths = data.map((post) => {
        return {
            params: {_id: post._id.toString()}
        }
    })
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async(context) => {
    const _id = context.params._id;

    const res = await fetch(`http://localhost:3000/api/post/${_id}`)
    const data = await res.json()

    return {
        props: {post: data}
    }
}

const PostPageWrapper = styled.main`
    min-height: 100vh;
`