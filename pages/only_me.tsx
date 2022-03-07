import GratitudeList from "../components/GratitudeList";
import Navigation from "../components/Navigation";
import RedirectIfNotAuthenticated from "../components/RedirectIfNotAuthenticated";

export default function OnlyMe() {
  return (
    <RedirectIfNotAuthenticated>
      <Navigation>
        <GratitudeList mode={"only_me"} />
      </Navigation>
    </RedirectIfNotAuthenticated>
  )
}