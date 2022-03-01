import Navigation from "../components/Navigation"
import Settings from "../components/Settings"
import RedirectIfNotAuthenticated from "../components/RedirectIfNotAuthenticated"

export default function SettingsPage() {
  return (
    <RedirectIfNotAuthenticated>
      <Navigation>
        <Settings />
      </Navigation>
    </RedirectIfNotAuthenticated>
  )
}