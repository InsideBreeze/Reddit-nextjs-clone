import { User } from 'firebase/auth'
import { atomWithStorage } from 'jotai/utils'

export const userLocalAtom = atomWithStorage<null | User>('user', null)
