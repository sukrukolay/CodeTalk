import { StyleSheet, Text, View, Dimensions, Button, FlatList, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import MessageCard from '../components/MessageCard/MessageCard'
import FloatingButton from '../components/FloatingButton'

import Modal from 'react-native-modal'
import Input from '../components/Input'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth'
import parseContentData from '../utils/ParseContentData'

const ChatRoom = ({ route }) => {

    const [isVisibleModal, setIsVisibleModal] = React.useState(false)
    const [text, setText] = React.useState('')
    const [messageList, setMessageList] = useState([])
    const { name } = route.params

    useEffect(() => {
        database()
            .ref('messages')
            .orderByChild("room_name").startAt(name).endAt(name)
            .on('value', snapshot => {

                const contentData = snapshot.val()
                const parsedData = parseContentData(contentData || {})
                setMessageList(parsedData)
            })
    }, [])

    const handlePress = () => {
        setIsVisibleModal(true)
    }

    const onClose = () => {
        setIsVisibleModal(false)
    }


    const handleSend = () => {
        try {
            const userMail = auth().currentUser.email
            const contentObject = {
                message: text,
                userName: userMail.split('@')[0],
                date: new Date().toISOString(),
                room_name: name,
            }

            database().ref('messages').push(contentObject)
            setIsVisibleModal(!isVisibleModal)
        } catch (error) {
            console.log(error.code)
        }
        setIsVisibleModal(false)

    }

    const deleteMessage = (messageId) => {
        database().ref(`messages/${messageId}`).remove();
    }
    const renderMessage = ({ item }) =>
        <MessageCard
            userName={item.userName}
            message={item.message}
            date={item.date}
            deleteMessage={() => deleteMessage(item.id)}
        />
    return (
        <View style={styles.container}>

            <ImageBackground
                source={require('../assets/arka_plan1.png')}
                style={styles.background}
            >



                <Text style={styles.chat_room_title}>{name} odası kuruldu</Text>
                <FlatList
                    data={messageList}
                    renderItem={renderMessage}
                />
                <Modal
                    isVisible={isVisibleModal}
                    onSwipeComplete={onClose} // aşağıya doğru kayarak kapatmak için
                    onBackdropPress={onClose} // arkaplana basınca kapatmak için
                    onBackButtonPress={onClose} // geri tuşuna basınca kapatmak için
                    swipeDirection='down'
                    style={styles.modal}
                    backdropOpacity={0}
                >
                    <View style={styles.input_main_container}>
                        <View style={styles.input_container}>
                            <Input
                                placeholder="Mesajın..."
                                style={styles.input}
                                onChange={setText}
                                multiline={true}
                            />
                        </View>
                        <Button title='Gönder' onPress={handleSend} color='rebeccapurple' />
                    </View>
                </Modal>
                <FloatingButton icon='plus' onPress={handlePress} />
            </ImageBackground>
        </View>
    )
}


export default ChatRoom
const deviceSize = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f04e1d',
    },
    input_main_container: {
        backgroundColor: '#f04e1d',
        padding: 20,
        marginHorizontal: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: deviceSize.height / 5.5,
    },
    chat_room_title: {
        fontSize: 20,
        color: 'white',
        padding: 10,
        margin: 10,
        textAlign: 'center',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: 'white',
        borderRadius: 10,
    },

    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    input_container: {
        flex: 1,
        justifyContent: 'flex-end',
        margin: -7,
        padding: 1,
    },
    input: {
        flex: 1,
    },
    background: {
        flex: 1,
    }
})
