import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // try {
        //     // Thực hiện đăng nhập ở đây
        //     Alert.alert('Đăng nhập thành công!');
        //     navigation.navigate("Home")
        // } catch (error) {
        //     Alert.alert(`Đăng nhập thất bại: ${error.message}`);
        // }
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
                navigation.navigate("Home")
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                // console.error(error);
            });
    };

    //const link = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"

    return (
        <View style={styles.container}>
            {/* <Image style={styles.logo} source={{ uri: link }} /> */}
            <Text style={styles.title}>Đăng nhập</Text>
            <Text>Email:</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={(email) => setEmail(email)}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text>Mật khẩu:</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry
            />

            <Button mode="contained" onPress={handleLogin}>
                Login
            </Button>

            {/* <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.signupLink}>Chưa có tài khoản? Đăng ký</Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity onPress={() => navigation.navigate('ForgotPass')}>
                <Text style={styles.signupLink}>Quên mật khẩu</Text>
            </TouchableOpacity> */}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
    },
    signupText: {
        marginTop: 16,
        textAlign: 'center',
    },
    signupLink: {
        alignSelf: 'center',
        color: 'blue',
    },
    logo: {
        width: 170,
        height: 150,
        alignSelf: 'center',
        marginBottom: 20
    }
});

export default Login;
