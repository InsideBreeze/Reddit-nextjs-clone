'use client'
import { auth } from '@/firebase'
import useCommunityData from '@/hooks/useCommunityData'
import { useAuthState } from 'react-firebase-hooks/auth'
import About from '../About'
import PageContent from '../PageContent'
import NewPostForm from './NewPostForm'
import { useEffect } from 'react'
import { Community } from '../../../../../types'

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
    setCommunityState,
  } = useCommunityData(params.communityName)

  useEffect(() => {
    if (!currentCommunity) {
      // to fetch current community
      setCommunityState(prev => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          communityName: params.communityName,
        } as Community,
      }))
    }
  }, [currentCommunity, params.communityName, setCommunityState])
  if (!user) {
    // TODO: skeleton
    return <p>loading</p>
  }
  return (
    <PageContent>
      <>
        <div className="py-4">
          <p className="text-lg font-medium py-[14px] border-b border-white">
            Create a post
          </p>
        </div>
        {currentCommunity && (
          <NewPostForm
            communityName={params.communityName}
            user={user}
            communityImage={currentCommunity.communityImage}
          />
        )}
      </>

      <>
        {currentCommunity?.createdAt && <About community={currentCommunity} />}
      </>
    </PageContent>
  )
}

export default SubmitPage
