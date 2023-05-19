'use client'
import useCommunityData from '@/hooks/useCommunityData'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Community } from '../../../../types'
import About from './About'
import CreatePostLink from './CreatePostLink'
import Header from './Header'
import PageContent from './PageContent'
import Posts from './Posts'
import { useRedditStore } from '@/app/store'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useCurrentCommunity } from '@/hooks/useCurrentCommunity'

const CommunityPage = ({ params }: { params: { communityName: string } }) => {

  const { currentCommunity, communityNotExists } = useCurrentCommunity(params.communityName)


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
          <Posts />
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
