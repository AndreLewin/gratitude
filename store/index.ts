import { Session } from '@supabase/supabase-js'
import create, { GetState, SetState } from 'zustand'

type Store = {
  session: Session | null,
  set: <Property extends keyof Store>({
    property,
    value
  }: {
    property: Property,
    value: Store[Property]
  }) => void
}

const store = create<Store>((set: SetState<Store>, get: GetState<Store>) => ({
  session: null,
  set: <Property extends keyof Store>({
    property,
    value
  }: {
    property: Property,
    value: Store[Property]
  }) => {
    // @ts-ignore
    set(state => ({ [property]: value }))
  }
}))

export default store;

