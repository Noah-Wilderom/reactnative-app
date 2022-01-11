import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

// icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

// formik
import { Formik } from 'formik';

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  StyledButton,
  ButtonText,
  Colors,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent
} from './../components/styles';
import { View } from 'react-native';

// Colors
const { brand, darkLight, primary } = Colors;

// api client
import axios from 'axios';


const Login = () => {
    const [ hidePassword, setHidePassword ] = useState(true);
    const handleLogin = (credentials) => {
        const url = 'http://10.0.2.2:8000/api/login';

        axios.post(url, {name: credentials.name, password: credentials.password}, {Accept: 'application/json'})
        .then((response) => {
            if(response.data.user.name == credentials.name) {
                console.log("Ingelogd")
            }
            console.log(response.data.user);
        })
        .catch(error => {
            console.log(error);
        })
    }
    


  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageLogo resizeMode="cover" source={require('./../assets/img/img1.jpg')} />
        <PageTitle>Runner</PageTitle>
        <SubTitle>Account Login</SubTitle>

        <Formik
          initialValues={{ name: '', password: '' }}
          onSubmit={(values) => {handleLogin(values)}}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <StyledFormArea>
              <MyTextInput
                label="Name"
                icon="person"
                placeholder="Name"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                />

              <MyTextInput
                label="Password"
                icon="lock"
                placeholder="Password"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
                />
                <MsgBox>...</MsgBox>
                <StyledButton onPress={handleSubmit}>
                    <ButtonText>Login</ButtonText>
                </StyledButton>
                <Line />
                <ExtraView>
                    <ExtraText>Don't have an account? </ExtraText>
                    
                        <TextLinkContent>Signup</TextLinkContent>
                    
                </ExtraView>
            </StyledFormArea>
            )}
        </Formik>
      </InnerContainer>
    </StyledContainer>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (<View>
      <LeftIcon>
        <Octicons name={icon} size={35} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
          <RightIcon onPress={() => setHidePassword(!hidePassword)}>
              <Ionicons name={ hidePassword ? 'md-eye-off' : 'md-eye' } size={25} color={darkLight} />
          </RightIcon>
      )}
    </View>);
};

export default Login;
