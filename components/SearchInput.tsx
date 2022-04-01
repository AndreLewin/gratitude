import { TextInput } from "@mantine/core";
import { useCallback } from "react";
import store from "store";
import { supabase } from "utils/supabaseClient";


export default function SearchInput() {
  const search = store(state => state.search)
  const set = store(state => state.set)
  const getGratitudes = store(state => state.getGratitudes)

  // TODO: use debounced value

  // onEffect on the debounced value: under

  const changeSearchValue = useCallback<any>((search: string) => {
    set({ search, gratitudes: [] })
    const user = supabase.auth.user()
    getGratitudes(user?.id ?? null)
  }, [])

  return (
    <div className="container">
      <TextInput
        value={search}
        placeholder="Search in messages..."
        icon={<svg width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="m232.5 215.5l-40.7-40.7A94.9 94.9 0 0 0 212 116a96 96 0 1 0-96 96a94.9 94.9 0 0 0 58.8-20.2l40.7 40.7a12.1 12.1 0 0 0 17 0a12 12 0 0 0 0-17ZM44 116a72 72 0 1 1 72 72a72.1 72.1 0 0 1-72-72Z"></path></svg>}
        onChange={(event) => changeSearchValue(event.currentTarget.value)}
      />

      <style jsx>
        {`
          .container {

          }
        `}
      </style>
    </div>
  )
}