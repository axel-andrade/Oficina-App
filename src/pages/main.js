import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import api from '../services/api';
import ModalDescription from '../components/modal';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Main extends Component {
    static navigationOptions = {
        title: "Propostas",
    };

    state = {
        proposals: [],
        loading: false,
        modalVisible: false,
        description: '',
        error: false
    };

    componentDidMount() {
        //carrengando as propostas da api
        this.loadProposals();
    };

    loadProposals = async () => {

        this.setState({ loading: true })
        await api.get('/').then(res => {
            this.setState({ proposals: res.data, loading: false, error: false })
        }).catch(error => {
            if (!error.status)
                Alert.alert("Sem conexão com a internet");
            else
                Alert.alert(JSON.stringify(error.message));
            this.setState({ loading: false, error: true });
        });
    }

    renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => this.setState({ modalVisible: true, description: item.description })}>
            <View style={styles.pContainer}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.title}>{'Vendedor:  '}
                        <Text style={styles.content}>{item.seller}</Text>
                    </Text>
                    <Text style={styles.title}>{'Comprador:  '}
                        <Text style={styles.content}>{item.customer}</Text>
                    </Text>
                    <Text style={styles.title}>{'Valor:  '}
                        <Text style={styles.content}>{item.value}</Text>
                    </Text>
                </View>
            </View>

        </TouchableOpacity>

    )


    render() {
        let { proposals, loading, error } = this.state;
        return (
            <View style={styles.container}>
                {loading
                    ? <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#6AA84F" />
                    </View>
                    : proposals.length === 0 && !loading && !error ?
                        <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 20 }}>
                            <Text style={styles.title}>Ainda não existem propostas</Text>
                        </View>
                        : error ?
                            <TouchableOpacity style={styles.loading} onPress={() => this.loadProposals()}>
                                <Icon style={{ paddingTop: 15 }} name="redo" size={40} color="#6AA84F" />
                            </TouchableOpacity>
                            : <FlatList
                                contentContainerStyle={styles.list}
                                data={proposals}
                                keyExtractor={item => item.id.toString()}
                                renderItem={this.renderItem}
                            />
                }

                <ModalDescription
                    onClose={() => this.setState({ modalVisible: false })}
                    visible={this.state.modalVisible}
                    description={this.state.description}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    loading: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    list: {
        padding: 15
    },
    pContainer: {
        backgroundColor: '#FFF',
        borderWidth: 0.2,
        borderColor: '#6AA84F',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20
    },
    title: {
        fontSize: 12,
        color: '#6AA84F'
    },
    content: {
        fontSize: 12,
        color: '#999',
        marginTop: 5,
        lineHeight: 24
    },
    button: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#6AA84F',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },

    buttonText: {
        fontSize: 16,
        color: '#6AA84F',
        fontWeight: 'bold'
    }




});