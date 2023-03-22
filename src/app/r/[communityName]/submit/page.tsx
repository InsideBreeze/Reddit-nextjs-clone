import { auth, db } from '@/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import PageContent from '../PageContent'
import NewPostForm from './NewPostForm'
import About from '../About'
import { getDoc, doc } from 'firebase/firestore'
import { Community } from '../../../../../types'
import { use } from 'react'

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

const SubmitPage = async ({
  params,
}: {
  params: {
    communityName: string
  }
}) => {
  const [user] = useAuthState(auth)

  const community = use(fetchCurrentCommunity(params.communityName))

  if (!user || !community) {
    // TODO: skeleton
    return <p>loading</p>
  }
  return (
    <PageContent>
      <>
        <div className="py-">
          <p className="text-lg font-medium py-[14px] border-b border-white">
            Create a post
          </p>
        </div>
        <NewPostForm communityName={params.communityName} user={user} />
      </>

      <>{/* <About community={community} /> */}</>
    </PageContent>
  )
}

export default SubmitPage
