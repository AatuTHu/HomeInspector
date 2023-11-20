import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { inputs }from '../../../styles/inputStyles'
import { useState } from 'react'
import { buttons } from '../../../styles/buttonStyles'

export default function Login({setIsLoggedIn,setForm}) {

    const [hidePass, setHidePass ] = useState(true)
    const [hideEmail, setHideEmail ] = useState(true)

    const login = () => {
        setIsLoggedIn(true)
    }


  return (<>
    <View style = {inputs.inputCointainer}>
      <Text style = {inputs.inputTexts}>Email</Text>
      
      <View style = { inputs.input_row_Container }>
        <TextInput style = {inputs.inputs_with_dots} secureTextEntry={ hideEmail}></TextInput>
        <TouchableOpacity style = {buttons.inputButton} onPress={ () => setHideEmail(!hideEmail)}><Text></Text></TouchableOpacity>
      </View>
      
      <Text style = {inputs.inputTexts}>Password</Text>

      <View style = { inputs.input_row_Container }>
        <TextInput style = {inputs.inputs_with_dots} secureTextEntry={ hidePass}></TextInput>
        <TouchableOpacity style = {buttons.inputButton} onPress={ () => setHidePass(!hidePass)}><Text></Text></TouchableOpacity>
      </View>

    </View>

    <View style = {buttons.button_row_container}>
        <TouchableOpacity style = {buttons.loginButton} onPress = { () => login()}><Text style = {buttons.buttonTexts}>LOGIN</Text></TouchableOpacity>
        <TouchableOpacity style = {buttons.signUpButton} onPress={ () => setForm(2) }><Text style = {buttons.switchButtonText}>Register</Text></TouchableOpacity>
    </View>
</>)
}