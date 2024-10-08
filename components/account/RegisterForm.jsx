import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Input, Icon } from 'react-native-elements'
import { size } from 'lodash'
import { useNavigation } from '@react-navigation/native'

import { validateEmail } from '../../utils/helpers'
import { registerUser } from '../../utils/actions'
import Loading from '../../components/Loading'


export default function RegisterForm() {
  
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState(defaultFormValues())
  const [errorEmail, setErrorEmail] = useState("")
  const [errorPassword, setErrorPassword] = useState("")
  const [errorConfirm, setErrorConfirm] = useState("")
  const [loading, setLoading] = useState(false)
  

  const navigation = useNavigation()

  const onChange = (e, type) => {
    setFormData({...formData, [type]: e.nativeEvent.text})
  }

  const doRegisterUser = async () => {
    if(!validateData()){
      return
    }

    setLoading(true)
    const result = await registerUser(formData.email, formData.password)
    setLoading(false)
    
    if(!result.statusResponse){
      setErrorEmail(result.error)
      return
    }

    navigation.navigate('Account')
  }

const validateData = () => {
  setErrorConfirm('')
  setErrorEmail('')
  setErrorPassword('')

  let isValid = true

  if(!validateEmail(formData.email)){
    setErrorEmail('Debes ingresas un email valido')
    isValid = false
  }

  if(size(formData.password) < 6 ){
    setErrorPassword('Debes ingresar una contraseña de minimo 6 caracteres')
    isValid = false
  }

  if(size(formData.confirm) < 6 ){
    setErrorConfirm('Debes ingresar una confirmación de contraseña de minimo 6 caracteres')
    isValid = false
  }

  if(formData.password !== formData.confirm ){
    setErrorPassword('La contraseña y la confimación no coinciden')
    setErrorConfirm('La contraseña y la confimación no coinciden')
    isValid = false
  }

  return isValid
}

  return (
    <View style={styles.form}>
      <Input
        containerStyle={styles.input}
        placeholder='Ingresa tu email'
        onChange={(e) => onChange(e, 'email')}
        keyboardType='email-address'
        errorMessage={errorEmail}
        defaultValue={formData.email}
      />
      <Input
        containerStyle={styles.input}
        placeholder='Ingresa tu contraseña'
        password={true}
        secureTextEntry={!showPassword}
        errorMessage={errorPassword}
        defaultValue={formData.password}
        rightIcon={
          <Icon
              type='material-community'
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              iconStyle={styles.icon}
              onPress={() => setShowPassword(!showPassword)}
          />
        }
        onChange={(e) => onChange(e, 'password')}
      />
      <Input
        containerStyle={styles.input}
        placeholder='Confirma tu contraseña'
        password={true}
        secureTextEntry={!showPassword}
        errorMessage={errorConfirm}
        defaultValue={formData.confirm}
        rightIcon={
          <Icon
              type='material-community'
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              iconStyle={styles.icon}
              onPress={() => setShowPassword(!showPassword)}
          />
        }
        onChange={(e) => onChange(e, 'confirm')}
      />
      <Button
        title='Registrar Nuevo Usuario'
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={() => doRegisterUser()}
      />
      <Loading isVisible={loading} text='Creando cuenta...'/>
    </View>
  )
}

const defaultFormValues = () => {
  return { email: '', password: '', confirm: ''}
}

const styles = StyleSheet.create({
    form: {
        marginTop: 30
    },
    input: {
        width: "100%"
    },
    btnContainer: {
        marginTop: 20,
        width: '85%',
        alignSelf: 'center'
    },
    btn: {
        backgroundColor: '#442484'
    },
    icon: {
      color: '#c1c1c1'
    }
})