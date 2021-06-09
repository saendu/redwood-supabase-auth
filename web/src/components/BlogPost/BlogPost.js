// web/src/components/BlogPost/BlogPost.js

import { Link, routes } from '@redwoodjs/router'
import CommentsCell from 'src/components/CommentsCell'
import CommentForm from 'src/components/CommentForm'

const truncate = (text, length) => {
  return text.substring(0, length) + '...'
}

const BlogPost = ({ post, summary = false, idx, isFull }) => {
  const conditionalWidth = isFull ? 'lg:w-2/3 mx-auto' : (idx === 0 ? 'lg:w-2/3' : 'lg:w-1/3')
  const conditionalHover = isFull ? '' : 'hover:bg-gray-100'

  return (
    <div className={`w-full ${conditionalWidth} px-4 mb-20 ${conditionalHover}`}>
        <Link className="" to={routes.blogPost({ id: post.id })}>
          <div className="relative flex h-96 mb-8 overflow-hidden">
            <img className="w-full h-full object-cover" src={post.imageUrl} alt="" />
            <span className="absolute bottom-0 right-0 pl-10 pr-8 py-3 -mr-1 text-xs font-semibold text-gray-500 bg-blue-50 clip-path-left-small">10 JUN 2021 | 19:40</span>
          </div>
          <h2 className="mb-4 text-2xl font-semibold font-heading text-blue-800">{post.title}</h2>
          <p className="mb-3 text-base text-gray-500 leading-loose">{summary ? truncate(post.body, 100) : post.body}</p>
        </Link>
        {!summary && (
        <div className="mt-16">
          <CommentForm postId={post.id} />
          <div className="mt-24">
            <CommentsCell postId={post.id} />
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogPost
