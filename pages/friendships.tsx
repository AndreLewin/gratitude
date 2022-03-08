import Navigation from "components/Navigation"
import Friendships from "components/Friendships"
import RedirectIfNotAuthenticated from "components/RedirectIfNotAuthenticated"

export default function FriendshipsPage() {
  return (
    <RedirectIfNotAuthenticated>
      <Navigation>
        <Friendships />
      </Navigation>
    </RedirectIfNotAuthenticated>
  )
}