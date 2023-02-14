import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

const Input = ({ placeholder, type = 'default', onChange, isSecure, multiline }) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor='white'
            keyboardType={type}
            onChangeText={onChange}
            secureTextEntry={isSecure}
            multiline={multiline}
        />
    )
}

export default Input

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 2,
        borderColor: 'white',
        padding: 10,
        margin: 10,
        color: 'white',
    },
})