import { StyleSheet } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import UserLogged from './UserLogged'
import UserGuest from './UserGuest'
import { isUserLogged, getCurrentUser } from '../../utils/actions'
import Loading from '../../components/Loading'

export default function Account() {
  const [login, setLogin] = useState(null)

  useFocusEffect(
    useCallback(() => {
      const user = getCurrentUser()
      user ? setLogin(true) : setLogin(false)
    }, [])
  )

  if (login == null){
    return <Loading isVisible={true} text='Cargando...'/>
  }
  return login ? <UserLogged/> : <UserGuest/>
}

const styles = StyleSheet.create({})