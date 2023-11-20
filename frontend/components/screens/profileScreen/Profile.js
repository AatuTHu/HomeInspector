import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { inputs }from '../../../styles/inputStyles'
import { buttons } from '../../../styles/buttonStyles'

export default function Profile() {
  return (<>
    <View style = {inputs.inputCointainer}>

      <Text style = {inputs.inputs_profile_text}>First Name</Text>   
      <View style = { inputs.inputs_profile }>
        <TextInput></TextInput>
      </View>
      
      <Text style = {inputs.inputs_profile_text}>Last Name</Text>
      <View style = { inputs.inputs_profile }>
        <TextInput></TextInput>
      </View>

      <Text style = {inputs.inputs_profile_text}>Email</Text>    
      <View style = { inputs.inputs_profile }>
        <TextInput></TextInput>
      </View>
      
      <Text style = {inputs.inputs_profile_text}>Password</Text>
      <View style = { inputs.inputs_profile }>
        <TextInput></TextInput>  
      </View>

      
    </View>
        <TouchableOpacity style = {buttons.updateButton}><Text style = { buttons.buttonTexts }>UPDATE PROFILE</Text></TouchableOpacity>
        <TouchableOpacity style = {buttons.signOutButton}><Text style = { buttons.buttonTexts }>SIGN OUT</Text></TouchableOpacity>
        <TouchableOpacity style = {buttons.deleteButton}><Text style = { buttons.buttonTexts }>DELETE PROFILE</Text></TouchableOpacity>
    </>)
}