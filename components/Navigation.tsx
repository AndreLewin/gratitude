import { ActionIcon, Button, Modal, Tooltip } from '@mantine/core'
import { useModals } from '@mantine/modals'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import { isNullish } from '../utils/typeChecks'
import GratitudeForm from './GratitudeForm'

export default function Navigation({ children }: { children: JSX.Element | JSX.Element[] }) {
  const user = supabase.auth.user()

  const router = useRouter()
  const pathname = router.pathname

  const [isGratitudeModalOpened, setIsGratitudeModalOpened] = useState<boolean>(false)

  const modals = useModals()

  const openLogOutModal = () => {
    modals.openConfirmModal({
      title: "Are you sure you want to log out?",
      centered: true,
      labels: { confirm: "Log Out", cancel: "Cancel" },
      confirmProps: { color: "blue" },
      onCancel: () => { },
      onConfirm: () => { router.push("/logout") }
    });
  }

  // TODO: change to button to be able to add text?
  // svg icons come from https://icones.js.org/collection/ph
  return (
    <div>
      <div className='navbar-container'>
        <div style={{ display: 'flex' }}>
          <Link href='/' passHref>
            <ActionIcon color="blue" component='a'>
              {pathname === "/" ? (
                <svg viewBox="0 0 256 256"><path fill="currentColor" d="M217 35.1a15.9 15.9 0 0 0-14.8-1.7C188.2 38.9 159.8 48 128 48s-60.2-9.1-74.2-14.6A16 16 0 0 0 32 48.3V104c0 35.8 9.7 69.5 27.2 95s42.6 41 68.8 41s50.7-14.5 68.8-41s27.2-59.2 27.2-95V48.3a15.9 15.9 0 0 0-7-13.2ZM80.1 133.3a8 8 0 0 1-11.3.7a8 8 0 0 1-.6-11.3a31.8 31.8 0 0 1 47.6 0a8 8 0 0 1-.6 11.3a8.1 8.1 0 0 1-5.3 2a8 8 0 0 1-6-2.7a16 16 0 0 0-23.8 0Zm78.9 49.4a56.3 56.3 0 0 1-62 0a8.1 8.1 0 0 1-2.2-11.1a8 8 0 0 1 11.1-2.3a39.8 39.8 0 0 0 44.2 0a8 8 0 0 1 11.1 2.3a8.1 8.1 0 0 1-2.2 11.1Zm28.2-48.7a8.1 8.1 0 0 1-5.3 2a8 8 0 0 1-6-2.7a16 16 0 0 0-23.8 0a8 8 0 0 1-11.3.7a8 8 0 0 1-.6-11.3a31.8 31.8 0 0 1 47.6 0a8 8 0 0 1-.6 11.3Z"></path></svg>
              ) : (
                <svg viewBox="0 0 256 256"><path fill="currentColor" d="M187.8 122.7a8 8 0 0 1-.6 11.3a8.1 8.1 0 0 1-5.3 2a8 8 0 0 1-6-2.7a16 16 0 0 0-23.8 0a8 8 0 0 1-11.3.7a8 8 0 0 1-.6-11.3a31.8 31.8 0 0 1 47.6 0Zm-83.9 10.6a8 8 0 0 0 6 2.7a8.1 8.1 0 0 0 5.3-2a8 8 0 0 0 .6-11.3a31.8 31.8 0 0 0-47.6 0a8 8 0 0 0 .6 11.3a8 8 0 0 0 11.3-.7a16 16 0 0 1 23.8 0Zm46.2 36a39.8 39.8 0 0 1-44.2 0a8 8 0 0 0-11.1 2.3a8.1 8.1 0 0 0 2.2 11.1a56.3 56.3 0 0 0 62 0a8.1 8.1 0 0 0 2.2-11.1a8 8 0 0 0-11.1-2.3Zm73.9-121V104c0 35.8-9.7 69.5-27.2 95s-42.6 41-68.8 41s-50.7-14.5-68.8-41S32 139.8 32 104V48.3a16 16 0 0 1 21.8-14.9C67.8 38.9 96.2 48 128 48s60.2-9.1 74.2-14.6A16 16 0 0 1 224 48.3Zm-16 0C192.9 54.2 162.4 64 128 64s-64.9-9.8-80-15.7V104c0 32.6 8.7 63.1 24.4 86s34.8 34 55.6 34s40.5-12.1 55.6-34s24.4-53.4 24.4-86Z"></path></svg>
              )}
            </ActionIcon>
          </Link>
        </div>
        <div style={{ display: 'flex' }}>
          <Tooltip label="Your messages">
            <Link href='/only_me' passHref>
              <ActionIcon color="blue" component='a'>
                {pathname === "/only_me" ? (
                  <svg viewBox="0 0 256 256"><path fill="currentColor" d="M231.9 220a7.8 7.8 0 0 1-6.9 4H31a7.8 7.8 0 0 1-6.9-4a7.7 7.7 0 0 1 0-8a120.7 120.7 0 0 1 67.1-54.2a72 72 0 1 1 73.6 0a120.7 120.7 0 0 1 67.1 54.2a7.7 7.7 0 0 1 0 8Z"></path></svg>
                ) : (
                  <svg viewBox="0 0 256 256"><path fill="currentColor" d="M235.4 210a124.2 124.2 0 0 0-61.8-53.2a76 76 0 1 0-91.2 0A124.2 124.2 0 0 0 20.6 210a12 12 0 0 0 20.8 12a100 100 0 0 1 173.2 0a12.1 12.1 0 0 0 10.4 6a11.7 11.7 0 0 0 6-1.6a12 12 0 0 0 4.4-16.4ZM76 96a52 52 0 1 1 52 52a52 52 0 0 1-52-52Z"></path></svg>
                )}
              </ActionIcon>
            </Link>
          </Tooltip>
        </div>
        <div style={{ display: 'flex' }}>
          <Tooltip label="Messages of your friends">
            <Link href='/friends' passHref>
              <ActionIcon color="blue" component='a'>
                {pathname === "/friends" ? (
                  <svg viewBox="0 0 256 256"><path fill="currentColor" d="M64 140a7.9 7.9 0 0 1-8 8H12a8.2 8.2 0 0 1-7.2-4.4a8.2 8.2 0 0 1 .8-8.4A67.8 67.8 0 0 1 33 113.5a40 40 0 1 1 66.3-37a8.1 8.1 0 0 1-3.8 8.4a64.3 64.3 0 0 0-27.8 33.8A61.6 61.6 0 0 0 64 140Zm186.4-4.8a67.8 67.8 0 0 0-27.4-21.7a40 40 0 1 0-66.3-37a8.1 8.1 0 0 0 3.8 8.4a64 64 0 0 1 27.8 33.8A61.6 61.6 0 0 1 192 140a7.9 7.9 0 0 0 8 8h44a8 8 0 0 0 6.4-12.8Zm-93.2 42.9a48 48 0 1 0-58.4 0a72.1 72.1 0 0 0-35.6 34.4a7.8 7.8 0 0 0 .5 7.7a7.8 7.8 0 0 0 6.7 3.8h115.2a7.8 7.8 0 0 0 6.7-3.8a7.8 7.8 0 0 0 .5-7.7a72.1 72.1 0 0 0-35.6-34.4Z"></path></svg>
                ) : (
                  <svg viewBox="0 0 256 256"><path fill="currentColor" d="M164.3 177.2a52 52 0 1 0-72.6 0a75.5 75.5 0 0 0-32.1 33.5a12 12 0 0 0 21.6 10.6a52 52 0 0 1 93.6 0a12 12 0 0 0 10.8 6.7a12.3 12.3 0 0 0 5.2-1.2a12 12 0 0 0 5.6-16.1a75.5 75.5 0 0 0-32.1-33.5ZM100 140a28 28 0 1 1 28 28a28.1 28.1 0 0 1-28-28Zm151.2 9.6a12 12 0 0 1-16.8-2.4a47.4 47.4 0 0 0-31.6-18.7a12 12 0 0 1-9.9-9.1a7.8 7.8 0 0 1-.5-1.4a11.9 11.9 0 0 1 8.6-14.6a20 20 0 1 0-23.1-28a12 12 0 1 1-21.6-10.3a44 44 0 1 1 73.4 47.2a71.1 71.1 0 0 1 23.9 20.5a12 12 0 0 1-2.4 16.8Zm-198-21.1a47.4 47.4 0 0 0-31.6 18.7A12.2 12.2 0 0 1 12 152a12.2 12.2 0 0 1-7.2-2.4a12 12 0 0 1-2.4-16.8a71.1 71.1 0 0 1 23.9-20.5a44 44 0 1 1 73.4-47.2a12 12 0 1 1-21.6 10.3a20 20 0 1 0-23.1 28a11.9 11.9 0 0 1 8.6 14.6a7.8 7.8 0 0 1-.5 1.4a12 12 0 0 1-9.9 9.1Z"></path></svg>
                )}
              </ActionIcon>
            </Link>
          </Tooltip>
        </div>
        <div style={{ display: 'flex' }}>
          <Tooltip label="Messages of everyone">
            <Link href='/public' passHref>
              <ActionIcon color="blue" component='a'>
                {pathname === "/public" ? (
                  <svg viewBox="0 0 256 256"><path fill="currentColor" d="m225.9 163.2l.3-1a103.7 103.7 0 0 0 0-68.4l-.3-1A104.4 104.4 0 0 0 128 24a104.2 104.2 0 0 0-97.9 68.8l-.3 1a103.7 103.7 0 0 0 0 68.4l.3 1A104.2 104.2 0 0 0 128 232a104.2 104.2 0 0 0 97.9-68.8ZM128 45.6A108.6 108.6 0 0 1 153.5 88h-51A108.6 108.6 0 0 1 128 45.6ZM102.5 168h51a108.6 108.6 0 0 1-25.5 42.4a108.6 108.6 0 0 1-25.5-42.4Zm-4.2-16a126.4 126.4 0 0 1 0-48h59.4a127.6 127.6 0 0 1 2.3 24a126.8 126.8 0 0 1-2.3 24Zm75.7-48h38.7a88.9 88.9 0 0 1 0 48H174a145 145 0 0 0 0-48Zm32.4-16h-36a128.7 128.7 0 0 0-24.1-46.1A88.6 88.6 0 0 1 206.4 88Zm-60.1 126.1a128.7 128.7 0 0 0 24.1-46.1h36a88.3 88.3 0 0 1-60.1 46.1Z"></path></svg>
                ) : (
                  <svg viewBox="0 0 256 256"><path fill="currentColor" d="m225.9 163.2l.3-1a103.7 103.7 0 0 0 0-68.4l-.3-1A104.4 104.4 0 0 0 128 24a104.2 104.2 0 0 0-97.9 68.8l-.3 1a103.7 103.7 0 0 0 0 68.4l.3 1A104.2 104.2 0 0 0 128 232a104.2 104.2 0 0 0 97.9-68.8ZM102.5 168h51a108.6 108.6 0 0 1-25.5 42.4a108.6 108.6 0 0 1-25.5-42.4Zm-4.2-16a126.4 126.4 0 0 1 0-48h59.4a127.6 127.6 0 0 1 2.3 24a126.8 126.8 0 0 1-2.3 24ZM40 128a90.3 90.3 0 0 1 3.3-24H82a145 145 0 0 0 0 48H43.3a90.3 90.3 0 0 1-3.3-24Zm113.5-40h-51A108.6 108.6 0 0 1 128 45.6A108.6 108.6 0 0 1 153.5 88Zm20.5 16h38.7a88.9 88.9 0 0 1 0 48H174a145 145 0 0 0 0-48Zm32.4-16h-36a128.7 128.7 0 0 0-24.1-46.1A88.6 88.6 0 0 1 206.4 88Zm-96.7-46.1A128.7 128.7 0 0 0 85.6 88h-36a88.6 88.6 0 0 1 60.1-46.1ZM49.6 168h36a128.7 128.7 0 0 0 24.1 46.1A88.3 88.3 0 0 1 49.6 168Zm96.7 46.1a128.7 128.7 0 0 0 24.1-46.1h36a88.3 88.3 0 0 1-60.1 46.1Z"></path></svg>
                )}
              </ActionIcon>
            </Link>
          </Tooltip>
        </div>
        <div>
          <Link href='/calendar' passHref>
            <ActionIcon color="blue" component='a'>
              {pathname === "/calendar" ? (
                <svg viewBox="0 0 256 256"><path fill="currentColor" d="M208 32h-24v-8a8 8 0 0 0-16 0v8H88v-8a8 8 0 0 0-16 0v8H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16Zm0 48H48V48h24v8a8 8 0 0 0 16 0v-8h80v8a8 8 0 0 0 16 0v-8h24Z"></path></svg>
              ) : (
                <svg viewBox="0 0 256 256"><path fill="currentColor" d="M208 32h-24v-8a8 8 0 0 0-16 0v8H88v-8a8 8 0 0 0-16 0v8H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16ZM72 48v8a8 8 0 0 0 16 0v-8h80v8a8 8 0 0 0 16 0v-8h24v32H48V48Zm136 160H48V96h160v112Z"></path></svg>
              )}
            </ActionIcon>
          </Link>
        </div>
        <div>
          <Link href='/friendships' passHref>
            <ActionIcon color="blue" component='a'>
              {pathname === "/friendships" ? (
                <svg viewBox="0 0 256 256"><path fill="currentColor" d="M256 136a8 8 0 0 1-8 8h-16v16a8 8 0 0 1-16 0v-16h-16a8 8 0 0 1 0-16h16v-16a8 8 0 0 1 16 0v16h16a8 8 0 0 1 8 8Zm-111.9 21.6a68 68 0 1 0-72.2 0a118.4 118.4 0 0 0-55.8 37.3a7.8 7.8 0 0 0-1.1 8.5a7.9 7.9 0 0 0 7.2 4.6h171.6a7.9 7.9 0 0 0 7.2-4.6a7.8 7.8 0 0 0-1.1-8.5a118.4 118.4 0 0 0-55.8-37.3Z"></path></svg>
              ) : (
                <svg viewBox="0 0 256 256"><path fill="currentColor" d="M256 136a12 12 0 0 1-12 12h-8v8a12 12 0 0 1-24 0v-8h-8a12 12 0 0 1 0-24h8v-8a12 12 0 0 1 24 0v8h8a12 12 0 0 1 12 12Zm-53 56.3a12 12 0 0 1-1.5 16.9a11.8 11.8 0 0 1-7.7 2.8a12.2 12.2 0 0 1-9.2-4.3a100 100 0 0 0-153.2 0A12 12 0 1 1 13 192.3a124.4 124.4 0 0 1 50.3-36a72 72 0 1 1 89.4 0a124.4 124.4 0 0 1 50.3 36ZM108 148a48 48 0 1 0-48-48a48 48 0 0 0 48 48Z"></path></svg>
              )}
            </ActionIcon>
          </Link>
        </div>
        <div>
          <Link href='/settings' passHref>
            <ActionIcon color="blue" component='a'>
              {pathname === "/settings" ? (
                <svg viewBox="0 0 256 256"><path fill="currentColor" d="m234.8 150.4l-14.9-19.8c.1-1.8 0-3.7 0-5.1l14.9-19.9a7.8 7.8 0 0 0 1.3-6.9a114.8 114.8 0 0 0-10.9-26.4a8.2 8.2 0 0 0-5.8-4l-24.5-3.5l-3.7-3.7l-3.5-24.5a8.2 8.2 0 0 0-4-5.8a114.8 114.8 0 0 0-26.4-10.9a7.8 7.8 0 0 0-6.9 1.3L130.6 36h-5.2l-19.8-14.8a7.8 7.8 0 0 0-6.9-1.3a114.8 114.8 0 0 0-26.4 10.9a8.2 8.2 0 0 0-4 5.8l-3.5 24.5l-3.7 3.7l-24.5 3.5a8.2 8.2 0 0 0-5.8 4a114.8 114.8 0 0 0-10.9 26.4a7.8 7.8 0 0 0 1.3 6.9l14.9 19.8v5.1l-14.9 19.9a7.8 7.8 0 0 0-1.3 6.9a114.8 114.8 0 0 0 10.9 26.4a8.2 8.2 0 0 0 5.8 4l24.5 3.5l3.7 3.7l3.5 24.5a8.2 8.2 0 0 0 4 5.8a114.8 114.8 0 0 0 26.4 10.9a7.6 7.6 0 0 0 2.1.3a7.7 7.7 0 0 0 4.8-1.6l19.8-14.8h5.2l19.8 14.8a7.8 7.8 0 0 0 6.9 1.3a114.8 114.8 0 0 0 26.4-10.9a8.2 8.2 0 0 0 4-5.8l3.5-24.6c1.2-1.2 2.6-2.5 3.6-3.6l24.6-3.5a8.2 8.2 0 0 0 5.8-4a114.8 114.8 0 0 0 10.9-26.4a7.8 7.8 0 0 0-1.3-6.9ZM128 172a44 44 0 1 1 44-44a44 44 0 0 1-44 44Z"></path></svg>
              ) : (
                <svg viewBox="0 0 256 256" ><path fill="currentColor" d="M128 72a56 56 0 1 0 56 56a56 56 0 0 0-56-56Zm0 88a32 32 0 1 1 32-32a32.1 32.1 0 0 1-32 32Zm110-12l-14.1-18.8v-2.4L238 108a12.3 12.3 0 0 0 2-10.3a113.4 113.4 0 0 0-11.4-27.4a11.8 11.8 0 0 0-8.7-5.9l-23.1-3.3l-1.9-1.9l-3.3-23.1a11.8 11.8 0 0 0-5.9-8.7A113.4 113.4 0 0 0 158.3 16a11.9 11.9 0 0 0-10.3 2l-18.7 14h-2.6L108 18a12.3 12.3 0 0 0-10.3-2a113.4 113.4 0 0 0-27.4 11.4a11.8 11.8 0 0 0-5.9 8.7l-3.3 23.1a17 17 0 0 0-1.9 1.9l-23.1 3.3a11.8 11.8 0 0 0-8.7 5.9A113.4 113.4 0 0 0 16 97.7a11.9 11.9 0 0 0 2 10.3l14.1 18.8v2.4L18 148a12.3 12.3 0 0 0-2 10.3a113.4 113.4 0 0 0 11.4 27.4a11.8 11.8 0 0 0 8.7 5.9l23.1 3.3l1.9 1.9l3.3 23.1a11.8 11.8 0 0 0 5.9 8.7A113.4 113.4 0 0 0 97.7 240a10.6 10.6 0 0 0 3.1.4a11.8 11.8 0 0 0 7.2-2.4l18.7-14h2.6l18.7 14a12.3 12.3 0 0 0 10.3 2a113.4 113.4 0 0 0 27.4-11.4a11.8 11.8 0 0 0 5.9-8.7l3.4-23.2l1.7-1.7l23.2-3.4a11.8 11.8 0 0 0 8.7-5.9a113.4 113.4 0 0 0 11.4-27.4a11.9 11.9 0 0 0-2-10.3Zm-27.5 20.7l-21.3 3.1a12.2 12.2 0 0 0-7 3.6c-1.7 1.8-4.9 5.1-6.5 6.5a12.2 12.2 0 0 0-3.9 7.3l-3.1 21.3a85.3 85.3 0 0 1-11.2 4.7l-17.2-13a11.7 11.7 0 0 0-7.9-2.3h-8.8a11.9 11.9 0 0 0-7.9 2.3l-17.2 13a85.3 85.3 0 0 1-11.2-4.7l-3.1-21.3a12.2 12.2 0 0 0-3.9-7.3a60.5 60.5 0 0 1-6.2-6.2a12.2 12.2 0 0 0-7.3-3.9l-21.3-3.1a85.3 85.3 0 0 1-4.7-11.2l13-17.2a12.4 12.4 0 0 0 2.4-7.5c-.1-2.5-.2-7.1-.1-9.2a11.9 11.9 0 0 0-2.3-7.9l-13-17.2a85.3 85.3 0 0 1 4.7-11.2l21.3-3.1a12.2 12.2 0 0 0 7.3-3.9a60.5 60.5 0 0 1 6.2-6.2a12.2 12.2 0 0 0 3.9-7.3l3.1-21.3a85.3 85.3 0 0 1 11.2-4.7l17.2 13a11.7 11.7 0 0 0 7.9 2.3c2.9-.1 5.9-.1 8.8 0a11.7 11.7 0 0 0 7.9-2.3l17.2-13a85.3 85.3 0 0 1 11.2 4.7l3.1 21.3a12.2 12.2 0 0 0 3.9 7.3a60.5 60.5 0 0 1 6.2 6.2a12.2 12.2 0 0 0 7.3 3.9l21.3 3.1a85.3 85.3 0 0 1 4.7 11.2l-13 17.2a11.7 11.7 0 0 0-2.3 7.5c0 2.5.1 7.1 0 9.2a11.7 11.7 0 0 0 2.3 7.9l13 17.2a85.3 85.3 0 0 1-4.7 11.2Z"></path></svg>
              )}
            </ActionIcon>
          </Link>
        </div>
        <div>
          <ActionIcon onClick={() => setIsGratitudeModalOpened(true)} color="blue" component='a'>
            <svg viewBox="0 0 256 256"><path fill="currentColor" d="M216 204h-91l75.5-75.5l26.3-26.4a19.8 19.8 0 0 0 0-28.2l-44.7-44.7a19.9 19.9 0 0 0-28.2 0l-120 120a19.8 19.8 0 0 0-5.9 14.1V208a20.1 20.1 0 0 0 20 20h168a12 12 0 0 0 0-24ZM61 156l75-75l11 11l-75 75Zm103-47l11 11l-75 75l-11-11Zm4-60l39 39l-15 15l-39-39ZM52 181l11.5 11.5L75 204H52Z"></path></svg>
          </ActionIcon>
        </div>
        {isNullish(user) ? (
          <div>
            <Link href='/login' passHref>
              <Button
                leftIcon={<svg viewBox="0 0 256 256" height="20px" width="20px"><path fill="currentColor" d="m144.5 136.5l-42 42A12 12 0 0 1 94 182a12.2 12.2 0 0 1-8.5-3.5a12 12 0 0 1 0-17L107 140H24a12 12 0 0 1 0-24h83L85.5 94.5a12 12 0 0 1 17-17l42 42a12 12 0 0 1 0 17ZM192 28h-56a12 12 0 0 0 0 24h52v152h-52a12 12 0 0 0 0 24h56a20.1 20.1 0 0 0 20-20V48a20.1 20.1 0 0 0-20-20Z"></path></svg>}
                color="blue"
                component="a"
              >
                Log In
              </Button>
            </Link>

          </div>
        ) : (
          <div>
            <Button
              leftIcon={<svg viewBox="0 0 256 256" height="20px" width="20px"><path fill="currentColor" d="m224.5 136.5l-42 42a12 12 0 0 1-8.5 3.5a12.2 12.2 0 0 1-8.5-3.5a12 12 0 0 1 0-17L187 140h-83a12 12 0 0 1 0-24h83l-21.5-21.5a12 12 0 0 1 17-17l42 42a12 12 0 0 1 0 17ZM104 204H52V52h52a12 12 0 0 0 0-24H48a20.1 20.1 0 0 0-20 20v160a20.1 20.1 0 0 0 20 20h56a12 12 0 0 0 0-24Z"></path></svg>}
              onClick={() => openLogOutModal()}
            >
              Log Out
            </Button>
          </div>
        )}
      </div>

      {children}

      <Modal
        opened={isGratitudeModalOpened}
        onClose={() => setIsGratitudeModalOpened(false)}
        closeOnClickOutside={false}
        title="Write a new message of gratitude"
      >
        <GratitudeForm closeModal={() => setIsGratitudeModalOpened(false)} />
      </Modal>

      <style jsx>
        {`
          .navbar-container {
            display: flex;
            height: 44px;
            width: 100%;
            background: lightgray;
            align-items: center;
          }

          .navbar-container > * {
            margin-left: 3px;
          }
        `}
      </style>
    </div>
  )
}