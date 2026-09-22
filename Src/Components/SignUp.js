/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Button, TextInput, View , Text} from 'react-native';
import {Formik} from 'formik';
import { object, string, number, date, InferType } from 'yup';
let userSchema = object({
  firstName: string().required('Please Enter First Name'),
  lastName: string().required('Please Enter First Name'),
  email: string().required().email('Please email'),
});
const SignUp = props => (
  <Formik
    initialValues={{email: '', firstName: '', lastName: ''}}
    onSubmit={values => console.log(values)}
    validationSchema={userSchema}
    >
    {({handleChange, handleBlur, handleSubmit, values , errors}) => (
      <View>
        <TextInput
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          placeholder="Enter Email"
           placeholderTextColor="black"
          value={values.email}
          style={{
            width: '90%',
            height: 50,
            alignSelf: 'center',
            marginTop: 70,
            borderWidth: 1,
          }}
        />
        {errors.email && <Text style={{color:'red', alignSelf:'center', width:'90%', marginTop:10}}>{errors.email}</Text>}
        <TextInput
          onChangeText={handleChange('firstName')}
          onBlur={handleBlur('firstName')}
          placeholder="Enter FirstName"
          placeholderTextColor="black"
          value={values.firstName}
          style={{
            width: '90%',
            height: 50,
            alignSelf: 'center',
            marginTop: 70,
            borderWidth: 1,
          }}
        />
        {errors.firstName && <Text style={{color:'red', alignSelf:'center', width:'90%', marginTop:10}}>{errors.firstName}</Text>}
        <TextInput
          onChangeText={handleChange('lastName')}
          onBlur={handleBlur('lastName')}
           placeholderTextColor="black"
          placeholder="Enter LastName"
          value={values.lastName}
          style={{
            width: '90%',
            height: 50,
            alignSelf: 'center',
            marginTop: 70,
            borderWidth: 1,
          }}
        />
        {errors.lastName && <Text style={{color:'red', alignSelf:'center', width:'90%', marginTop:10}}>{errors.lastName}</Text>}
        <View
          style={{
            width: 300,
            height: 40,
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 40,
          }}>
          <Button onPress={handleSubmit} title="Submit" />
        </View>
      </View>
    )}
  </Formik>
);
export default SignUp;
