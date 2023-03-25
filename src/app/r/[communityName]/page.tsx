'use client'
import useCommunityData from '@/hooks/useCommunityData'
import { notFound } from 'next/navigation'
import About from './About'
import CreatePostLink from './CreatePostLink'
import Header from './Header'
import PageContent from './PageContent'
import Posts from './Posts'
import { useEffect } from 'react'

const CommunityPage = ({ params }: { params: { communityName: string } }) => {
  const {
    communityState,
    currentCommunityLoading,
    pageExists,
    setCommunityState,
  } = useCommunityData()

  useEffect(() => {
    setCommunityState(prev => ({
      ...prev,
      currentCommunity: {
        ...prev.currentCommunity,
        communityName: params.communityName,
      },
    }))
  }, [params.communityName])

  console.log(
    JSON.stringify(communityState.currentCommunity),
    'current community'
  )
  if (!pageExists) notFound()
  if (!communityState.currentCommunity?.creatorId) return <p>loading</p>
  return (
    <>
      {communityState.currentCommunity && (
        <>
          <Header community={communityState.currentCommunity} />
          <PageContent>
            <>
              {/* Create Post Link*/}
              <CreatePostLink communityName={params.communityName} />
              {/* Posts */}
              <Posts community={communityState.currentCommunity} />
            </>
            <>
              {/* About */}
              {/* <About community={communityState.currentCommunity} /> */}
            </>
          </PageContent>
        </>
      )}
    </>
  )
}

export default CommunityPage
