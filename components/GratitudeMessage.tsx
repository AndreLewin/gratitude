import { ActionIcon, Modal, Text, Tooltip } from '@mantine/core'
import { useModals } from '@mantine/modals'
import format from 'date-fns/format'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FRIENDS_VISIBILITY, ONLY_ME_VISIBILITY, PUBLIC_VISIBILITY } from '../data'
import { supabase } from '../utils/supabaseClient'
import { isNullish } from '../utils/typeChecks'
import GratitudeForm from './GratitudeForm'
import { Gratitude } from './GratitudeList'

export default function GratidudeMessage({ gratitude, removeGratitude, editGratitude }: { gratitude: Gratitude, removeGratitude: Function, editGratitude: Function }) {
  const user = supabase.auth.user()

  const [formattedDate, setFormattedDate] = useState<string | null>("")
  useEffect(() => {
    setFormattedDate(format(new Date(gratitude.created_at), "PP"))
  }, [])

  const [isUpdateGratitudeModalOpened, setIsUpdateGratitudeModalOpened] = useState<boolean>(false)

  const modals = useModals()
  const openDeleteModal = () => {
    modals.openConfirmModal({
      title: "Are you sure you want to delete this message?",
      centered: true,
      children: (
        <div style={{ opacity: 0.7 }}>
          I am grateful for: {gratitude.fore} because {gratitude.because}
        </div>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => { },
      onConfirm: () => deleteGratitudeMessage()
    });
  }

  const deleteGratitudeMessage = useCallback<any>(async () => {
    const { data, error } = await supabase
      .from("gratitudes")
      .delete()
      .eq('id', gratitude.id)
    if (error) return console.error(error)
    removeGratitude()
  }, [])

  const backgroundColor = useMemo<string>(() => {
    if (isNullish(gratitude.profile.color)) return `#ffffff`

    const r = parseInt(gratitude.profile.color.slice(1, 3), 16)
    const g = parseInt(gratitude.profile.color.slice(3, 5), 16)
    const b = parseInt(gratitude.profile.color.slice(5, 7), 16)
    return `rgba(${r},${g},${b}, 0.2)`
  }, [gratitude.profile.color])


  return (
    <div style={{
      background: backgroundColor,
      padding: "12px 12px 12px 12px",
      display: "flex"
    }}>
      <div style={{ flexGrow: 1 }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", marginTop: "-6px" }}>
            <Link
              href={gratitude.profile.username ? `/u/${gratitude.profile.username}` : `/uid/${gratitude.profile.id}`}
            >
              <div style={{
                fontWeight: 600,
                cursor: `pointer`,
                color: `#1c7ed6`
              }}>
                {gratitude.profile.username ?? "(Anonymous)"}
              </div>
            </Link>
            <div style={{
              fontSize: "15px",
              opacity: 0.7,
              marginLeft: "6px",
              marginTop: "1px"
            }}>
              {formattedDate}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginTop: "3px", opacity: 0.3 }}>
              {gratitude.visibility_id === ONLY_ME_VISIBILITY &&
                <Tooltip label="Visible to me only">
                  <svg width="16px" height="16px" viewBox="0 0 256 256"><path fill="currentColor" d="M53.9 34.6a8 8 0 0 0-11.8 10.8l19.2 21.1C25 88.8 9.4 123.2 8.7 124.8a8.2 8.2 0 0 0 0 6.5c.3.7 8.8 19.5 27.6 38.4c25.1 25 56.8 38.3 91.7 38.3a128.6 128.6 0 0 0 52.1-10.8l22 24.2a8 8 0 0 0 5.9 2.6a8.2 8.2 0 0 0 5.4-2.1a7.9 7.9 0 0 0 .5-11.3Zm47.3 75.9l41.7 45.8A31.6 31.6 0 0 1 128 160a32 32 0 0 1-26.8-49.5ZM128 192c-30.8 0-57.7-11.2-79.9-33.3A128.3 128.3 0 0 1 25 128c4.7-8.8 19.8-33.5 47.3-49.4l18 19.8a48 48 0 0 0 63.6 70l14.7 16.2A112.1 112.1 0 0 1 128 192Zm119.3-60.7c-.4.9-10.5 23.3-33.4 43.8a8.1 8.1 0 0 1-5.3 2a7.6 7.6 0 0 1-5.9-2.7a8 8 0 0 1 .6-11.3A131 131 0 0 0 231 128a130.3 130.3 0 0 0-23.1-30.8C185.7 75.2 158.8 64 128 64a112.9 112.9 0 0 0-19.4 1.6a8.1 8.1 0 0 1-9.2-6.6a8 8 0 0 1 6.6-9.2a132.4 132.4 0 0 1 22-1.8c34.9 0 66.6 13.3 91.7 38.3c18.8 18.9 27.3 37.7 27.6 38.5a8.2 8.2 0 0 1 0 6.5ZM134 96.6a8 8 0 0 1 3-15.8a48.3 48.3 0 0 1 38.8 42.7a8 8 0 0 1-7.2 8.7h-.8a7.9 7.9 0 0 1-7.9-7.2A32.2 32.2 0 0 0 134 96.6Z"></path></svg>
                </Tooltip>
              }
              {gratitude.visibility_id === FRIENDS_VISIBILITY &&
                <Tooltip label="Visible to their friends">
                  <svg width="16px" height="16px" viewBox="0 0 256 256"><path fill="currentColor" d="M83.2 174.4A7.7 7.7 0 0 0 88 176a8 8 0 0 0 6.4-3.2a52 52 0 0 1 83.2 0a8.1 8.1 0 0 0 11.2 1.6a8 8 0 0 0 1.6-11.2a67.8 67.8 0 0 0-27.4-21.7a40 40 0 1 0-54 0a67.8 67.8 0 0 0-27.4 21.7a8 8 0 0 0 1.6 11.2ZM112 112a24 24 0 1 1 24 24a24.1 24.1 0 0 1-24-24Zm96-88H64a16 16 0 0 0-16 16v20H32a8 8 0 0 0 0 16h16v24H32a8 8 0 0 0 0 16h16v24H32a8 8 0 0 0 0 16h16v24H32a8 8 0 0 0 0 16h16v20a16 16 0 0 0 16 16h144a16 16 0 0 0 16-16V40a16 16 0 0 0-16-16Zm0 192H64V40h144Z"></path></svg>
                </Tooltip>
              }
              {gratitude.visibility_id === PUBLIC_VISIBILITY &&
                <Tooltip label="Visible to all (public)">
                  <svg width="16px" height="16px" viewBox="0 0 256 256"><path fill="currentColor" d="M232 128A104.1 104.1 0 0 0 128 24a104 104 0 0 0 0 208a104.1 104.1 0 0 0 104-104Zm-16.4-8h-39.8c-1.6-29.6-12-57-29.5-78.1a88.2 88.2 0 0 1 69.3 78.1ZM96.3 136h63.4c-1.8 28.8-13.3 55.7-31.7 74.4c-18.4-18.7-29.9-45.6-31.7-74.4Zm0-16c1.8-28.8 13.3-55.7 31.7-74.4c18.4 18.7 29.9 45.6 31.7 74.4Zm13.4-78.1C92.2 63 81.8 90.4 80.2 120H40.4a88.2 88.2 0 0 1 69.3-78.1ZM40.4 136h39.8c1.6 29.6 12 57 29.5 78.1A88.2 88.2 0 0 1 40.4 136Zm105.9 78.1c17.5-21.1 27.9-48.5 29.5-78.1h39.8a88.2 88.2 0 0 1-69.3 78.1Z"></path></svg>
                </Tooltip>
              }
            </div>

            {gratitude.profile.id === user?.id &&

              <div style={{ marginLeft: "10px", display: "flex" }}>
                <Tooltip label="Edit">
                  <ActionIcon variant="outline" radius={16} onClick={() => setIsUpdateGratitudeModalOpened(true)}>
                    <svg width="16px" height="16px" viewBox="0 0 256 256"><path fill="currentColor" d="m232.5 55.5l-32-32a12 12 0 0 0-17 0l-96 96A11.9 11.9 0 0 0 84 128v32a12 12 0 0 0 12 12h32a12.3 12.3 0 0 0 8.5-3.5l96-96a12 12 0 0 0 0-17ZM192 49l15 15l-11 11l-15-15Zm-69 99h-15v-15l56-56l15 15Zm105-19.4V208a20.1 20.1 0 0 1-20 20H48a20.1 20.1 0 0 1-20-20V48a20.1 20.1 0 0 1 20-20h79.4a12 12 0 0 1 0 24H52v152h152v-75.4a12 12 0 0 1 24 0Z"></path></svg>
                  </ActionIcon>
                </Tooltip>
                <div style={{ marginLeft: "6px" }} />
                <Tooltip label="Delete">
                  <ActionIcon variant="outline" radius={16} onClick={() => openDeleteModal()}>
                    <svg width="16px" height="16px" viewBox="0 0 256 256"><path fill="currentColor" d="M216 48h-36V36a28.1 28.1 0 0 0-28-28h-48a28.1 28.1 0 0 0-28 28v12H40a12 12 0 0 0 0 24h4v136a20.1 20.1 0 0 0 20 20h128a20.1 20.1 0 0 0 20-20V72h4a12 12 0 0 0 0-24ZM100 36a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4v12h-56Zm88 168H68V72h120Zm-72-100v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0Zm48 0v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0Z"></path></svg>
                  </ActionIcon>
                </Tooltip>
              </div>
            }
          </div>

        </div>

        <div className="second-line"><span className='for-because-words'>I am grateful for</span> {gratitude.fore}</div>
        {(gratitude.because ?? ``).length > 0 &&
          <div className="third-line"><span className='for-because-words'>because</span> {gratitude.because}</div>
        }

      </div>

      <Modal
        opened={isUpdateGratitudeModalOpened}
        onClose={() => setIsUpdateGratitudeModalOpened(false)}
        title="Update the message of gratitude"
      >
        <GratitudeForm closeModal={() => setIsUpdateGratitudeModalOpened(false)} gratitude={gratitude} editGratitude={editGratitude} />
      </Modal>

      <style jsx>
        {`
          .for-because-words {
            opacity: 0.5;
          }
        `}
      </style>
    </div>
  )
}