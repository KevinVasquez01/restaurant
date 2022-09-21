import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'


import { closeSesion, getCurrentUser } from '../../utils/actions.js'
import InfoUser from '../../components/account/InfoUser.jsx'
import Loading from '../../components/Loading'

export default function UserLogged() {
  const navigation = useNavigation()

  const [loading, setLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])
  

  return (
    <View style={styles.container}>
      {
       user && (
        <View>        
          <InfoUser 
            user={user} 
            setLoading={setLoading} 
            setLoadingText={setLoadingText}/>
          <Text>Account Options</Text>
       </View>
       )
      }
      
      <Button
        title='Cerrar Sesión'
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSessionTitle}
        onPress={() => {
          closeSesion()
          navigation.navigate('restaurants')
        }}
      />
      <Toast position='center' opacity={0.9}/>
      <Loading isVisible={loading} text={loadingText}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: '#f9f9f9'
  },
  btnCloseSession: {
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#442484',
    borderBottomWidth: 1,
    borderBottomColor: '#442484',
    paddingVertical: 10
  },
  btnCloseSessionTitle: {
    color: '#442484'
  }
})