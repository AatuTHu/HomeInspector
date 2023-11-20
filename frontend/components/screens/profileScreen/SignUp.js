import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { inputs }from '../../../styles/inputStyles'
import { useState } from 'react'
import { buttons } from '../../../styles/buttonStyles'

export default function SignUp({setForm,setIsLoggedIn}) {

    const [hidePass, setHidePass ] = useState(true)
    const [hideEmail, setHideEmail ] = useState(true)

    const signUp = () => {
        setIsLoggedIn(true)
    }

  return (<>
    <View style = {inputs.inputCointainer}>
      <Text style = {inputs.inputTexts}>First Name</Text>
      
      <View style = { inputs.input_row_Container }>
        <TextInput style = {inputs.inputs_without_dots}></TextInput>
      </View>
      
      <Text style = {inputs.inputTexts}>Last Name</Text>

      <View style = { inputs.input_row_Container }>
        <TextInput style = {inputs.inputs_without_dots}></TextInput>
      </View>

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
        <TouchableOpacity style = {buttons.signUpButton} onPress = { () => signUp() }><Text style = {buttons.buttonTexts}>SIGN UP</Text></TouchableOpacity>
        <TouchableOpacity style = {buttons.loginButton} onPress={ () => setForm(1) } ><Text style = {buttons.switchButtonText}>I have a user</Text></TouchableOpacity>  
    </View>
</>)
}