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
  const user = supabase.auth.user()!

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
          I am grateful for: {gratitude.fore}. Because {gratitude.because}
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
    if (isNullish(gratitude.profile_color)) return `#ffffff`

    const r = parseInt(gratitude.profile_color.slice(1, 3), 16)
    const g = parseInt(gratitude.profile_color.slice(3, 5), 16)
    const b = parseInt(gratitude.profile_color.slice(5, 7), 16)
    return `rgba(${r},${g},${b}, 0.2)`
  }, [gratitude.profile_color])


  return (
    <div style={{
      maxWidth: "600px",
      border: "1px solid gray",
      borderRadius: "5px",
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
              href={gratitude.profile_username ? `/u/${gratitude.profile_username}` : `/uid/${gratitude.user_id}`}
            >
              <div style={{
                fontWeight: 600,
                cursor: `pointer`
              }}>
                {gratitude.profile_username ?? "(Anonymous)"}
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
                  <svg width="16px" height="16px" viewBox="0 0 256 256"><path fill="currentColor" d="M208 76h-32V52a48 48 0 0 0-96 0v24H48a20.1 20.1 0 0 0-20 20v112a20.1 20.1 0 0 0 20 20h160a20.1 20.1 0 0 0 20-20V96a20.1 20.1 0 0 0-20-20ZM104 52a24 24 0 0 1 48 0v24h-48Zm100 152H52V100h152Z"></path></svg>
                </Tooltip>
              }
              {gratitude.visibility_id === FRIENDS_VISIBILITY &&
                <Tooltip label="Visible to their friends">
                  <svg width="16px" height="16px" viewBox="0 0 256 256"><path fill="currentColor" d="M248.8 146.4a7.7 7.7 0 0 1-4.8 1.6a8 8 0 0 1-6.4-3.2A51.6 51.6 0 0 0 196 124a8 8 0 0 1 0-16a24 24 0 1 0-23.6-28.5a8 8 0 1 1-15.7-3a40 40 0 1 1 66.3 37a67.8 67.8 0 0 1 27.4 21.7a8 8 0 0 1-1.6 11.2Zm-56 66.1a8.1 8.1 0 0 1-3.7 10.7a9.3 9.3 0 0 1-3.5.8a8.1 8.1 0 0 1-7.2-4.5a56.1 56.1 0 0 0-100.8 0a8 8 0 0 1-10.7 3.7a8.1 8.1 0 0 1-3.7-10.7a72.1 72.1 0 0 1 35.6-34.4a48 48 0 1 1 58.4 0a72.1 72.1 0 0 1 35.6 34.4ZM128 172a32 32 0 1 0-32-32a32.1 32.1 0 0 0 32 32Zm-60-56a8 8 0 0 0-8-8a24 24 0 1 1 23.6-28.5a8 8 0 1 0 15.7-3a40 40 0 1 0-66.3 37a67.8 67.8 0 0 0-27.4 21.7a8 8 0 0 0 1.6 11.2A7.7 7.7 0 0 0 12 148a8 8 0 0 0 6.4-3.2A51.6 51.6 0 0 1 60 124a8 8 0 0 0 8-8Z"></path></svg>
                </Tooltip>
              }
              {gratitude.visibility_id === PUBLIC_VISIBILITY &&
                <Tooltip label="Visible to all (public)">
                  <svg width="16px" height="16px" viewBox="0 0 256 256"><path fill="currentColor" d="m225.9 163.2l.3-1a103.7 103.7 0 0 0 0-68.4l-.3-1A104.4 104.4 0 0 0 128 24a104.2 104.2 0 0 0-97.9 68.8l-.3 1a103.7 103.7 0 0 0 0 68.4l.3 1A104.2 104.2 0 0 0 128 232a104.2 104.2 0 0 0 97.9-68.8ZM102.5 168h51a108.6 108.6 0 0 1-25.5 42.4a108.6 108.6 0 0 1-25.5-42.4Zm-4.2-16a126.4 126.4 0 0 1 0-48h59.4a127.6 127.6 0 0 1 2.3 24a126.8 126.8 0 0 1-2.3 24ZM40 128a90.3 90.3 0 0 1 3.3-24H82a145 145 0 0 0 0 48H43.3a90.3 90.3 0 0 1-3.3-24Zm113.5-40h-51A108.6 108.6 0 0 1 128 45.6A108.6 108.6 0 0 1 153.5 88Zm20.5 16h38.7a88.9 88.9 0 0 1 0 48H174a145 145 0 0 0 0-48Zm32.4-16h-36a128.7 128.7 0 0 0-24.1-46.1A88.6 88.6 0 0 1 206.4 88Zm-96.7-46.1A128.7 128.7 0 0 0 85.6 88h-36a88.6 88.6 0 0 1 60.1-46.1ZM49.6 168h36a128.7 128.7 0 0 0 24.1 46.1A88.3 88.3 0 0 1 49.6 168Zm96.7 46.1a128.7 128.7 0 0 0 24.1-46.1h36a88.3 88.3 0 0 1-60.1 46.1Z"></path></svg>
                </Tooltip>
              }
            </div>

            {gratitude.user_id === user.id &&

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
        <div className="third-line"><span className='for-because-words'>Because</span> {gratitude.because}</div>

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