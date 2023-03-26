'use client'
import { userLocalAtom } from '@/atoms/userLocalState'
import useCommunityData from '@/hooks/useCommunityData'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { Community } from '../../../../../types'
import About from '../About'
import PageContent from '../PageContent'
import NewPostForm from './NewPostForm'
import { useRouter } from 'next/navigation'

const SubmitPage = ({
  params,
}: {
  params: {
    communityName: string
  }
}) => {
  //const [user] = useAuthState(auth)
  const user = useAtomValue(userLocalAtom)
  const router = useRouter()

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
    router.push('/')
    return
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
