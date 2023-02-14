import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import React from 'react'

const MessageCard = ({ userName, message, date, deleteMessage }) => {
    return (
        <TouchableWithoutFeedback
            delayLongPress={1000}
            onLongPress={deleteMessage} activeOpacity={0.3}
        >
            <View style={styles.container}>
                <View style={styles.name_date_container}>
                    <Text style={styles.userName_text}>{userName}</Text>
                    <Text>{date}</Text>
                </View>
                <View style={styles.message_container}>
                    <Text>{message}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default MessageCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 1,
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'orange',
    },
    name_date_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    message_container: {
        margin: 2,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    userName_text: {
        fontWeight: 'bold',
        color: 'black',
    }
})