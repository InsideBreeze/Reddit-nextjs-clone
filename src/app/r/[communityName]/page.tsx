'use client'
import { db } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { notFound } from 'next/navigation'
import { Community } from '../../../../types'
import About from './About'
import CreatePostLink from './CreatePostLink'
import Header from './Header'
import PageContent from './PageContent'
import Posts from './Posts'
import { use, useEffect, useState } from 'react'
import { useAtom, useSetAtom } from 'jotai'
import { communityStateAtom } from '@/atoms/communityDataState'
import useCommunityData from '@/hooks/useCommunityData'

const fetchCurrentCommunity = async (communityName: string) => {
  const communityDoc = await getDoc(doc(db, 'communities', communityName))
  if (!communityDoc.exists) return undefined
  const communityData = communityDoc.data()
  return JSON.parse(
    JSON.stringify({
      communityName,
      ...communityData,
      createdAt: communityData?.createdAt.toJSON(),
    })
  ) as Community
}

const CommunityPage = ({ params }: { params: { communityName: string } }) => {
  //  current community, store it to the state? but i will make
  // const communityDoc = await getDoc(
  //   doc(db, 'communities', params.communityName)
  // )

  // const communityData = communityDoc.data()
  // if (!communityDoc.exists()) {
  //   notFound()
  // }

  // const community = JSON.parse(
  //   JSON.stringify({
  //     communityName: params.communityName,
  //     ...communityData,
  //     createdAt: communityData?.createdAt.toJSON(),
  //   })
  // ) as Community
  const { communityState, loading } = useCommunityData(params.communityName)

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
