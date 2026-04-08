import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Linking,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { InputAnimado } from '../src/components/InputAnimado';
import { useLogin } from '../hooks/useLogin';
import LoginLayout from '../src/components/loginLayout';
import { ThemeProvider, useTheme } from '../src/contexts/themeContext';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <ThemeProvider>
      <LoginLayout>
        <LoginContent router={router} />
      </LoginLayout>
    </ThemeProvider>
  );
}

function LoginContent({ router }: { router: ReturnType<typeof useRouter> }) {
  const { theme } = useTheme();

  const {
    email,
    setEmail,
    senha,
    setSenha,
    erro,
    mensagens,
    erroGeral,
    validarESubmeter,
    focusAnimEmail,
    focusAnimSenha,
    errorAnim,
    animateFocus,
  } = useLogin();

  const handleLogin = async () => {
    const resultado = await validarESubmeter();

    if (resultado.sucesso && resultado.destino) {
      router.replace(resultado.destino as any);
    }
  };

  return (
    <>
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../src/assets/images/home/mao.png')}
            style={styles.logoMao}
          />
          <Image
            source={require('../src/assets/images/home/BrincaLibras.png')}
            style={styles.logoTexto}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.socialContainer}>
          <Text style={[styles.socialText, { color: theme.text }]}>
            Utilize uma rede social...
          </Text>

          <View style={styles.iconRow}>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://accounts.google.com')}
            >
              <Ionicons name="logo-google" size={32} color="#4285F4" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL('https://www.facebook.com')}
            >
              <FontAwesome
                name="facebook-official"
                size={32}
                color="#3b5998"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL('https://www.instagram.com')}
            >
              <Ionicons name="logo-instagram" size={32} color="#C13584" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL('https://www.linkedin.com')}
            >
              <Ionicons name="logo-linkedin" size={32} color="#0077B5" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.line} />
          <Text style={[styles.orText, { color: theme.text }]}>ou</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.inputSection}>
          <InputAnimado
            label={
              <View style={styles.labelErro}>
                <Text style={[styles.label, { color: theme.text }]}>
                  E-mail
                </Text>
                {erro.email && (
                  <Text style={styles.msgErro}>{mensagens.email}</Text>
                )}
              </View>
            }
            placeholder="email@email.com"
            value={email}
            onChangeText={setEmail}
            iconName="mail-outline"
            focusAnim={focusAnimEmail}
            errorAnim={errorAnim}
            temErro={erro.email}
            animateFocus={animateFocus}
          />

          <InputAnimado
            label={
              <View style={styles.labelErro}>
                <Text style={[styles.label, { color: theme.text }]}>
                  Senha
                </Text>
                {erro.senha && (
                  <Text style={styles.msgErro}>{mensagens.senha}</Text>
                )}
              </View>
            }
            placeholder="***************"
            value={senha}
            onChangeText={setSenha}
            iconName="lock-closed-outline"
            focusAnim={focusAnimSenha}
            errorAnim={errorAnim}
            temErro={erro.senha}
            secureTextEntry
            animateFocus={animateFocus}
          />

          {erroGeral ? <Text style={styles.msgErro}>{erroGeral}</Text> : null}

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.primary }]}
            onPress={handleLogin}
          >
            <Text style={[styles.buttonText, { color: theme.text }]}>
              Entrar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary]}
            onPress={() => router.push('/cadastro')}
          >
            <Text style={[styles.buttonText, { color: theme.text }]}>
              Não tenho cadastro
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 45,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoMao: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 10,
  },
  logoTexto: {
    width: 180,
    height: 60,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  socialContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  socialText: {
    marginBottom: 15,
    fontWeight: '600',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    marginHorizontal: 10,
  },
  inputSection: {
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  labelErro: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  msgErro: {
    color: 'red',
    fontSize: 12,
    marginLeft: 10,
  },
  button: {
    borderRadius: 15,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    marginTop: 10,
    backgroundColor: '#555',
  },
});