import React from 'react'
import Header from './Header'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase'
import { Community } from '../../../../types'
import { notFound } from 'next/navigation'

const CommunityPage = async ({
  params,
}: {
  params: { communityName: string }
}) => {
  const communityDoc = await getDoc(
    doc(db, 'communities', params.communityName)
  )

  const communityData = communityDoc.data()
  if (!communityData) {
    notFound()
  }
  const community = {
    communityName: params.communityName,
    ...communityData,
  } as Community
  return (
    <>
      <Header community={community} />
    </>
  )
}

export default CommunityPage
