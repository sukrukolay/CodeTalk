import { StyleSheet, View, FlatList, Dimensions, Button, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import RoomsCard from '../components/RoomsCard/RoomsCard'
import FloatingButton from '../components/FloatingButton'
import Modal from 'react-native-modal'
import Input from '../components/Input'
import database from '@react-native-firebase/database';
import parseContentData from '../utils/ParseContentData'

const Rooms = ({ navigation }) => {

    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const [text, setText] = useState('')
    const [contentList, setContentList] = useState([])


    React.useEffect(() => {
        database()
            .ref('rooms')
            .on('value', snapshot => {
                const contentData = snapshot.val()
                const parsedData = parseContentData(contentData || {})
                setContentList(parsedData)
                // console.log(parsedData)
            });
    }, [])

    const handleSelect = (room_name) => {
        navigation.navigate('ChatRoomPage', { name: room_name })
    }

    const handlePress = () => {
        setIsVisibleModal(true)
    }

    const onClose = () => {
        setIsVisibleModal(false)
    }

    const handleSend = (isVisibleModal) => {
        try {
            const reference = database().ref('rooms')
            reference.push({
                room_name: text,
            })
            setIsVisibleModal(!isVisibleModal)
        } catch (error) {
            console.log(error.code)
        }
    }

    const deleteRoom = (room_name, roomId) => {
        database().ref(`messages`)
            .orderByChild("room_name").startAt(room_name).endAt(room_name)
            .on('value', snapshot => {
                const contentData = snapshot.val()
                const parsedData = parseContentData(contentData || {})
                for (i = 0; i < parsedData.length; i++) {
                    const id = parsedData[i].id
                    database().ref(`messages/${id}`).remove()
                }
            }
            )

        database().ref(`rooms/${roomId}`).remove()
    }


    const renderList = ({ item }) => <RoomsCard
        roomName={item.room_name}
        onSelect={() => handleSelect(item.room_name)}
        deleteRoom={() => deleteRoom(item.room_name, item.id)}
    />

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/arka_plan2.png')}
                style={styles.background}
            >
                <FlatList
                    data={contentList}
                    renderItem={renderList}
                    numColumns={2}
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
                                placeholder="Oda adı..."
                                style={styles.input}
                                onChange={setText}
                                multiline={true}
                            />
                        </View>
                        <Button title='Ekle' onPress={handleSend} color='rebeccapurple' />
                    </View>
                </Modal>
                <FloatingButton onPress={handlePress} icon='plus' />
            </ImageBackground>
        </View>
    )
}

export default Rooms

const deviceSize = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#f04e1d',
        flexDirection: 'row',
    },
    input_main_container: {
        backgroundColor: '#f04e1d',
        padding: 20,
        marginHorizontal: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: deviceSize.height / 5.5,
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