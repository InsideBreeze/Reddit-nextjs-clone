'use client'
import { notFound } from 'next/navigation'
import About from './About'
import CreatePostLink from './CreatePostLink'
import Header from './Header'
import PageContent from './PageContent'
import Posts from './Posts'
import { useCurrentCommunity } from '@/hooks/useCurrentCommunity'
import { useCommunityPosts } from '@/hooks/useCommunityPosts'

const CommunityPage = ({ params }: { params: { communityName: string } }) => {
  const { currentCommunity, communityNotExists } = useCurrentCommunity(
    params.communityName
  )

  const { loading, posts } = useCommunityPosts(params.communityName)

  if (communityNotExists) notFound()

  if (!currentCommunity)
    return (
      <div className="flex justify-center items-center">
        <p>loading</p>
      </div>
    )
  return (
    <>
      <Header community={currentCommunity} />
      <PageContent>
        <>
          {/* Create Post Link*/}
          <CreatePostLink communityName={params.communityName} />
          {/* Posts */}
          {
            posts &&
            <Posts posts={posts} loading={loading} />
          }
        </>
        <>
          {/* About */}
          <About community={currentCommunity} />
        </>
      </PageContent>
    </>
  )
}

export default CommunityPage
