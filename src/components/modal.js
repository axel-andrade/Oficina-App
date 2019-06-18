import React from 'react';
import { Modal, View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';

const ModalDescription = props => {

    const { onClose, visible, description } = props;
    console.log(props);
    return (

        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => { }}
        >

            <View style={styles.modalContainer} onPress={onClose}>

                <View style={styles.boxContainer}>
                    <Text style={styles.title}>Descrição</Text>
                    <Text style={styles.content}>{description}</Text>
                    <View style={{ paddingTop: 15 }}>
                        <TouchableOpacity style={styles.button} onPress={onClose}>
                            <Text style={styles.buttonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </Modal>

    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.8)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxContainer: {
        backgroundColor: '#FFF',
        borderWidth: 0.2,
        borderColor: '#6AA84F',
        borderRadius: 5,
        width: '60%',
        height: '40%',
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#6AA84F'
    },
    content: {
        fontSize: 12,
        color: '#999',
        marginTop: 5,
        lineHeight: 24
    },

    button: {
        height: 34,
        width: 100,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#6AA84F',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },

    buttonText: {
        fontSize: 12,
        color: '#6AA84F',
        }
});

export default ModalDescription;