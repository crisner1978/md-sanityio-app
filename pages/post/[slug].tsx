import Header from 'components/Header'
import { pathQuery, postSlugQuery } from 'lib/queries'
import { sanityClient, urlFor } from 'lib/sanity'
import { GetStaticProps } from 'next'
import { Post } from 'typings'
import PortableText from 'react-portable-text'
import Form from 'components/Form'
import Comments from 'components/Comments'

interface Props {
  post: Post
}

const PostReadPage = ({ post }: Props) => {
  console.log('post', post)
  return (
    <main>
      <Header />
      <img
        className={`h-40 w-full object-cover`}
        src={urlFor(post.mainImage).url()!}
        alt={post.title}
      />
      <article className="mx-auto max-w-3xl p-5">
        <h1 className="mt-10 mb-3 text-3xl">{post.title}</h1>
        <h2 className="mb-2 text-xl font-light text-gray-500">
          {post.description}
        </h2>

        {/* Author Block */}
        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(post.author.image).url()!}
            alt=""
          />
          <p className="text-sm font-extralight">
            Blog post by{' '}
            <span className="font-semibold text-green-600">
              {post.author.name}
            </span>{' '}
            - Published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>

        <div className="mt-10">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            serializers={{
              h1: (props: any) => {
                ;<h1 className="my-5 text-2xl font-bold" {...props} />
              },
              h2: (props: any) => {
                ;<h2 className="my-5 text-xl font-bold" {...props} />
              },
              li: ({ children }: any) => {
                ;<li className="ml-4 list-disc">{children}</li>
              },
              link: ({ href, children }: any) => {
                ;<a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              },
            }}
          />
        </div>
      </article>
      <hr className="my-5 mx-auto max-w-lg border border-yellow-500" />
      
      <Comments comments={post.comments} />
      <Form post={post} />
    </main>
  )
}

export default PostReadPage

export const getStaticPaths = async () => {
  const posts = await sanityClient.fetch(pathQuery)

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await sanityClient.fetch(postSlugQuery, {
    slug: params?.slug,
  })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  }
}
