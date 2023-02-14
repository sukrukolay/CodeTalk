import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export default Button = ({ title, onPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={onPress}
            >
                <Text style={styles.button_title}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    button: {
        padding: 10,
        margin: 10,
        borderRadius: 5,
        alignItems: "center",
        borderWidth: 2,
        borderColor: 'white',
    },
    button_title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
})