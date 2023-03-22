'use client'
import { auth, db } from '@/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import PageContent from '../PageContent'
import NewPostForm from './NewPostForm'
import About from '../About'
import { getDoc, doc } from 'firebase/firestore'
import { Community } from '../../../../../types'
import { use } from 'react'
import { useAtomValue } from 'jotai'
import { communityStateAtom } from '@/atoms/communityDataState'
import useCommunityData from '@/hooks/useCommunityData'

const SubmitPage = ({
  params,
}: {
  params: {
    communityName: string
  }
}) => {
  const [user] = useAuthState(auth)

  const {
    communityState: { currentCommunity },
  } = useCommunityData(params.communityName)

  if (!user) {
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

      <>{currentCommunity && <About community={currentCommunity} />}</>
    </PageContent>
  )
}

export default SubmitPage
