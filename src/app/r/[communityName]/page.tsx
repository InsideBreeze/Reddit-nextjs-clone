'use client'
import useCommunityData from '@/hooks/useCommunityData'
import { notFound } from 'next/navigation'
import About from './About'
import CreatePostLink from './CreatePostLink'
import Header from './Header'
import PageContent from './PageContent'
import Posts from './Posts'

const CommunityPage = ({ params }: { params: { communityName: string } }) => {
  const { communityState, loading, pageExists } = useCommunityData(
    params.communityName
  )

  if (!pageExists) notFound()
  if (!communityState.currentCommunity) return <p>loading</p>

  return (
    <>
      {communityState.currentCommunity && (
        <Header community={communityState.currentCommunity} />
      )}
      <PageContent>
        <>
          {/* Create Post Link*/}
          <CreatePostLink communityName={params.communityName} />
          {/* Posts */}
          <Posts community={communityState.currentCommunity} />
        </>
        <>
          {/* About */}
          <About community={communityState.currentCommunity} />
        </>
      </PageContent>
    </>
  )
}

export default CommunityPage
