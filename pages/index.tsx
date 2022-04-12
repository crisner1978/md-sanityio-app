import Banner from 'components/Banner'
import Header from 'components/Header'
import Head from 'next/head'
import { sanityClient, urlFor } from 'lib/sanity'
import { postQuery } from 'lib/queries'
import { Post } from 'typings'
import Link from 'next/link'
import BlogPost from 'components/BlogPost'

interface Props {
  posts: [Post]
}

const Home = ({ posts }: Props) => {

  console.log("posts", posts)
  return (
    <div className="mx-auto max-w-6xl">
      <Head>
        <title>sMedium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />
      <BlogPost posts={posts} />
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const posts = await sanityClient.fetch(postQuery)
  return {
    props: {
      posts,
    },
  }
}
