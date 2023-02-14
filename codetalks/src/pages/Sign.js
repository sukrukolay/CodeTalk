import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import Input from '../components/Input'
import Button from '../components/Button'

import auth from '@react-native-firebase/auth'

const Sign = ({ navigation }) => {

  const handleSubmitForm = (formValues) => {
    auth().createUserWithEmailAndPassword(formValues.email, formValues.password)
      .then(() => {
        navigation.navigate('LoginPage')
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }

  const initialFormValues = {
    email: '',
    password: '',
    repassword: '',
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.appTitle}>Code TALKS</Text> */}
      <View style={styles.logo_container}>
        <Image
          style={styles.logo}
          source={require('../assets/logo_1.png')}
        />
      </View>
      <Formik initialValues={initialFormValues} onSubmit={handleSubmitForm}>
        {({ handleChange, handleSubmit, values }) => (
          <>
            <Input
              placeholder='e-postanızı Giriniz'
              type='email-address'
              onChange={handleChange('email')}
              value={values.email}

            />
            <Input
              placeholder='Şifrenizi Giriniz'
              onChange={handleChange('password')}
              value={values.password}
              isSecure={true}
            />
            <Input
              placeholder='Şifrenizi Tekrar Giriniz'
              onChange={handleChange('repassword')}
              value={values.repassword}
              isSecure={true}
            />
            <Button title='Kayıt Ol' onPress={handleSubmit} />
          </>
        )}
      </Formik>
      <Button title='Geri' onPress={() => navigation.navigate('LoginPage')} />
    </View>
  )
}

export default Sign

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f04e1d',
  },
  appTitle: {
    fontSize: 75,
    textAlign: 'center',
    color: 'white',
    margin: 50,
    fontWeight: 'bold'
  },
  logo_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: Dimensions.get('window').height / 3,
    width: Dimensions.get('window').width / 2,
  }
})