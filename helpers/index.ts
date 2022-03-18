import { Profile } from "components/Settings"

export const getProfileLink = (profile: Profile) => {
  return profile.username ? `/u/${profile.username}` : `/uid/${profile.id}`
}