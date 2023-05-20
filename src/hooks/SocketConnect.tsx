import React, { useEffect, useState } from 'react'

import { useAuth } from './useAuth'

export const SocketConnect = (props: { children: React.ReactNode }) => {
  const { socket, user, isAuthorized } = useAuth()
  const [isConnected, setIsConnected] = useState<boolean>(false)
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connect')
      if (!isConnected && isAuthorized && user.id)
        socket.emit('register', {
          userId: user.id
        })
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      console.log('socket disconnected')
      setIsConnected(false)
    })
    return () => {
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [user])

  return <>{props.children}</>
}
