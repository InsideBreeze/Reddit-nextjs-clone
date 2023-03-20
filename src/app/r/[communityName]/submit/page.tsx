'use client'
import { auth } from '@/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import PageContent from '../PageContent'
import NewPostForm from './NewPostForm'

const SubmitPage = ({
  params,
}: {
  params: {
    communityName: string
  }
}) => {
  const [user] = useAuthState(auth)

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

      <></>
    </PageContent>
  )
}

export default SubmitPage
