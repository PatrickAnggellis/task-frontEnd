import React, { Component } from 'react'
import {
    ImageBackground, 
    Text, 
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Platform,
    Alert } from 'react-native'

import backgroundImage from '../../assets/imgs/login.jpg'
import commoStyles from '../commonStyles'


export default class Auth extends Component {
    
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        stageNew: false
    }

    signinOrSignup = () => {
        if(this.state.stageNew) {
            Alert.alert('Sucesso!', 'Criar conta!')
        } else {
            Alert.alert('Sucesso!', 'Logar!')
        }
    }

    render() {
        return (
            <ImageBackground source={backgroundImage}
                style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subTitle}>
                        {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
                    </Text>
                    {this.state.stageNew &&
                        <TextInput placeholder='Nome' value={this.state.name}
                            style={styles.input} 
                            onChangeText={name => this.setState({name})}/>
                    }    
                    <TextInput placeholder='E-mail' value={this.state.email}
                        style={styles.input} 
                        onChangeText={email => this.setState({email})}/>
                   <TextInput placeholder='Senha' value={this.state.password}
                        style={styles.input} secureTextEntry = {true}
                        onChangeText={password => this.setState({password})}/>
                    { this.state.stageNew &&
                        <TextInput placeholder='Confirmar Senha' value={this.state.confirmPassword}
                            style={styles.input} secureTextEntry = {true}
                            onChangeText={confirmPassword => this.setState({confirmPassword})}/>
                    }    
                    <TouchableOpacity onPress = {this.signinOrSignup}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Registrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style = {{padding: 10}}
                    onPress= { () => this.setState({ stageNew: !this.state.stageNew})}>
                        <Text style={styles.buttonText}>
                            {this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}
                        </Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: commoStyles.fontFamily,
        color: commoStyles.colors.secundary,
        fontSize: 70,
        marginBottom: 10
    },
    subTitle: {
        fontFamily: commoStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10
    },  
    formContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
        width: '90%',

    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF',
        // Utiliza o Platform quando um componente
        // apresentar resultados diferentes no android e no ios
        padding: Platform.OS == 'ios' ? 15: 10
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: commoStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    }
})