import GratitudeList from "../components/GratitudeList";
import RedirectIfNotAuthenticated from "../components/RedirectIfNotAuthenticated";

export default function OnlyMe() {
  return (
    <RedirectIfNotAuthenticated>
      <GratitudeList mode={"only_me"} />
    </RedirectIfNotAuthenticated>
  )
}