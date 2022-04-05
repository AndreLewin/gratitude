import store from "store";
import GratitudeList from "../components/GratitudeList";

export default function Mods() {
  const roles = store(state => state.roles)

  return (
    <>
      {(roles?.is_admin || roles?.is_moderator) &&
        <GratitudeList mode={"reported"} />
      }
    </>
  )
}