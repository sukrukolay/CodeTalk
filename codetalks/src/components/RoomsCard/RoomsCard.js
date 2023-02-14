import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native'
import React from 'react'

const RoomsCard = ({ onSelect, roomName, deleteRoom }) => {
    return (

        <TouchableWithoutFeedback
            onPress={onSelect}
            delayLongPress={1000}
            onLongPress={deleteRoom}
            activeOpacity={0.3}>
            <View style={styles.container}>
                <Text style={styles.room_text}>{roomName}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default RoomsCard

const size = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        borderColor: 'rebeccapurple',
        borderWidth: 5,
        width: size.width / 2.2,
        height: size.height / 8,
        margin: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,

    },
    room_text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FF5349',
    },
})