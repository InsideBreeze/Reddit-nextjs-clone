import React from 'react'
import Header from './Header'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase'
import { Community } from '../../../../types'
import { notFound } from 'next/navigation'
import PageContent from './PageContent'
import CreatePostLink from './CreatePostLink'
import Posts from './Posts'
import About from './About'
import { useSetAtom } from 'jotai'
import { communityStateAtom } from '@/atoms/communityDataState'

const CommunityPage = async ({
  params,
}: {
  params: { communityName: string }
}) => {
  // const setCommunityState = useSetAtom(communityStateAtom)
  // current community, store it to the state? but i will make
  const communityDoc = await getDoc(
    doc(db, 'communities', params.communityName)
  )

  const communityData = communityDoc.data()
  if (!communityDoc.exists()) {
    notFound()
  }
  // const community = {
  //   communityName: params.communityName,
  //   ...communityData,
  // } as Community
  const community = JSON.parse(
    JSON.stringify({
      communityName: params.communityName,
      ...communityData,
      createdAt: communityData?.createdAt.toJSON(),
    })
  ) as Community
  // setCommunityState(prev => ({
  //   ...prev,
  //   currentCommunity: community,
  // }))

  //

  return (
    <>
      <Header community={community} />
      <PageContent>
        <>
          {/* Create Post Link*/}
          <CreatePostLink communityName={community.communityName} />
          {/* Posts */}
          <Posts community={community} />
        </>
        <>
          {/* About */}
          <About community={community} />
        </>
      </PageContent>
    </>
  )
}

export default CommunityPage
