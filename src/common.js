import { Alert, ALert, Platform } from 'react-native'

const server = Platform.OS === 'ios'
    ? 'http://local:3000' : 'http:10.0.2.2:3000'

function showError(err) {
    Alert.alert('Ops! Ocorreu um problema', `Mensagem: ${err}`)
}

function showSucess (msg) {
    Alert.alert('Sucesso!', msg)
}

export {server, showError, showSucess}