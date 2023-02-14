import { StyleSheet, View, Image, Dimensions } from 'react-native'
import React from 'react'

import Input from '../components/Input'
import Button from '../components/Button'
import { Formik } from 'formik'
import auth from '@react-native-firebase/auth'
const Login = ({ navigation }) => {

    async function handleSubmitForm(formValues) {
        try {
            const response = await auth().signInWithEmailAndPassword(formValues.email, formValues.password)
            if (response) {
                // console.log(response)
                navigation.navigate('ChatStack')
            }
        } catch (e) {
            console.error(e.message)
        }
    }
    const initialFormValues = {
        email: '',
        password: '',
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
                            isSecure={true}
                            value={values.password}
                        />
                        <Button title='Giriş Yap' onPress={handleSubmit} />
                    </>
                )}
            </Formik>
            <Button title='Kayıt Ol' onPress={() => navigation.navigate('SignPage')} />
        </View>
    )
}

export default Login

const imageSize = Dimensions.get('window')
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
        height: imageSize.height / 3,
        width: imageSize.width / 2,
    }
})