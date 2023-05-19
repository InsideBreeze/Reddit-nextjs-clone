'use client'
import { userLocalAtom } from '@/atoms/userLocalState'
import { useAtomValue, useSetAtom } from 'jotai'
import About from '../About'
import PageContent from '../PageContent'
import NewPostForm from './NewPostForm'
import { notFound, useRouter } from 'next/navigation'
import { useCurrentCommunity } from '@/hooks/useCurrentCommunity'

const SubmitPage = ({
  params,
}: {
  params: {
    communityName: string
  }
}) => {
  const user = useAtomValue(userLocalAtom)

  const { communityNotExists, currentCommunity } = useCurrentCommunity(params.communityName)
  if (communityNotExists) notFound()
  return (
    <PageContent>
      <>
        {
          user &&
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
        }
      </>
      <>
        {currentCommunity?.createdAt && <About community={currentCommunity} />}
      </>
    </PageContent>
  )
}

export default SubmitPage
