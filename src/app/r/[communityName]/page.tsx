import { db } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { notFound } from 'next/navigation'
import { Community } from '../../../../types'
import About from './About'
import CreatePostLink from './CreatePostLink'
import Header from './Header'
import PageContent from './PageContent'
import Posts from './Posts'

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

const CommunityPage = async ({
  params,
}: {
  params: { communityName: string }
}) => {
  //  const setCommunityState = useSetAtom(communityStateAtom)
  //  current community, store it to the state? but i will make
  const communityDoc = await getDoc(
    doc(db, 'communities', params.communityName)
  )

  const communityData = communityDoc.data()
  if (!communityDoc.exists()) {
    notFound()
  }

  const community = JSON.parse(
    JSON.stringify({
      communityName: params.communityName,
      ...communityData,
      createdAt: communityData?.createdAt.toJSON(),
    })
  ) as Community

  return (
    <>
      <Header community={community} />
      <PageContent>
        <>
          {/* Create Post Link*/}
          <CreatePostLink communityName={params.communityName} />
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
