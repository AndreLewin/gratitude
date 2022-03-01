import { ActionIcon, Modal, Text, Tooltip } from '@mantine/core'
import { useModals } from '@mantine/modals'
import format from 'date-fns/format'
import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import GratitudeForm from './GratitudeForm'
import { Gratitude } from './GratitudeList'

export default function GratidudeMessage({ gratitude, removeGratitude, editGratitude }: { gratitude: Gratitude, removeGratitude: Function, editGratitude: Function }) {
  const user = supabase.auth.user()!

  const [formattedDate, setFormattedDate] = useState<string | null>("")
  useEffect(() => {
    setFormattedDate(format(new Date(gratitude.created_at), 'yyyy-MM-dd'))
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

  return (
    <div style={{
      maxWidth: "600px",
      border: "1px solid gray",
      borderRadius: "5px",
      background: "#e4f1f6",
      padding: "12px 12px 12px 12px",
      display: "flex"
    }}>
      <div style={{ height: "100%" }}>
        <div style={{
          height: "48px",
          width: "48px",
          background: "blue",
          borderRadius: "50%"
        }}>


        </div>
      </div>


      <div style={{ flexGrow: 1 }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex" }}>
            <div>username</div>
            <div>{formattedDate}</div>
          </div>

          {gratitude.user_id === user.id &&
            <div style={{ display: "flex" }}>
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
            opacity: 0.7;
          }
        `}
      </style>
    </div>
  )
}