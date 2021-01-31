import React, { Component } from 'react'
import {
    ImageBackground, 
    Text, 
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Alert } from 'react-native'

import axios from 'axios'

import backgroundImage from '../../assets/imgs/login.jpg'
import commoStyles from '../commonStyles'
import AuthInput from '../components/AuthInput'

import { server, showError, showSucess } from '../common'

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
            this.signup()
        } else {
            Alert.alert('Sucesso!', 'Logar!')
        }
    }
    //Faz a ligação com o back-end da aplicação no caso a api
    signup = async() => {
        try {
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
            })

            showSucess('Usuário cadastrado!!')
            this.setState({stageNew: false})
        } catch (e) {
            showError(e)
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
                        <AuthInput icon= 'user' placeholder='Nome' 
                            value={this.state.name}
                            style={styles.input} 
                            onChangeText={name => this.setState({name})}/>
                    }    
                    <TextInput icon= 'at' placeholder='E-mail' 
                        value={this.state.email}
                        style={styles.input} 
                        onChangeText={email => this.setState({email})}/>
                    <TextInput placeholder='Senha' 
                        value={this.state.password}
                        style={styles.input} secureTextEntry = {true}
                        onChangeText={password => this.setState({password})}/>
                    { this.state.stageNew &&
                        <AuthInput icon = 'lock' 
                            placeholder='Confirmação de Senha' 
                            value={this.state.confirmPassword}
                            style={styles.input} secureTextEntry = {true}
                            onChangeText={confirmPassword => this.setState({confirmPassword})}/>
                    }    
                    <TouchableOpacity onPress = {this.signinOrSignup}>
                        <View style={styles.button}>
                            <TextInput style={styles.buttonText}>
                                {this.state.stageNew ? 'Registrar' : 'Entrar'}
                            </TextInput>
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