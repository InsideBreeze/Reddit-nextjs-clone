import { atom } from 'jotai'

interface AuthModalState {
  view: 'login' | 'signUp' | 'resetPassword'
  open: boolean
}
export const authModalAtom = atom<AuthModalState>({
  view: 'login',
  open: false,
})
