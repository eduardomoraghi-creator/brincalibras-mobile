// app/login.tsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { InputAnimado } from '../src/components/InputAnimado';
import { useLogin } from '../hooks/useLogin';
import LoginLayout from '../src/components/loginLayout';

export default function LoginScreen() {
  const router = useRouter();

  const {
    email, setEmail,
    senha, setSenha,
    erro, mensagens,
    erroGeral,
    validarESubmeter,
    focusAnimEmail,
    focusAnimSenha,
    errorAnim,
    animateFocus
  } = useLogin(); 

  const darkMode = false;
  const theme = darkMode ? stylesDark : stylesLight;

  return (
    <LoginLayout>
      {/* HEADER */}
      <View style={[styles.header, { backgroundColor: theme.header }]}>
        <Text style={[styles.title, { color: theme.text }]}>Login</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* SOCIAL LOGIN */}
        <View style={styles.socialContainer}>
          <Text style={[styles.socialText, { color: theme.text }]}>
            Utilize uma rede social...
          </Text>
          <View style={styles.iconRow}>
            <Ionicons name="logo-google" size={32} color="#4285F4" />
            <FontAwesome name="facebook-official" size={32} color="#3b5998" />
            <Ionicons name="logo-instagram" size={32} color="#C13584" />
            <Ionicons name="logo-linkedin" size={32} color="#0077B5" />
          </View>
        </View>

        {/* DIVISOR */}
        <View style={styles.dividerRow}>
          <View style={styles.line} />
          <Text style={[styles.orText, { color: theme.text }]}>ou</Text>
          <View style={styles.line} />
        </View>

        {/* INPUTS */}
        <View style={styles.inputSection}>
          <InputAnimado
            label={
              <View style={styles.labelErro}>
                <Text style={[styles.label, { color: theme.text }]}>E-mail</Text>
                {erro.email && <Text style={styles.msgErro}>{mensagens.email}</Text>}
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
                <Text style={[styles.label, { color: theme.text }]}>Senha</Text>
                {erro.senha && <Text style={styles.msgErro}>{mensagens.senha}</Text>}
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

          {erroGeral && <Text style={styles.msgErro}>{erroGeral}</Text>}

          {/* BOTÃO ENTRAR */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.button }]}
            onPress={validarESubmeter}
          >
            <Text style={[styles.buttonText, { color: theme.buttonText }]}>
              Entrar
            </Text>
          </TouchableOpacity>

          {/* BOTÃO "NÃO TENHO CADASTRO" */}
          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary]}
            onPress={() => router.push('/cadastro')}
          >
            <Text style={[styles.buttonText, { color: theme.buttonText }]}>
              Não tenho cadastro
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LoginLayout>
  );
}

/* TEMAS */
const stylesLight = {
  background: '#FFFFFF',
  header: '#3A8FB7',
  text: '#000',
  button: '#000',
  buttonText: '#FFF'
};

const stylesDark = {
  background: '#2C2C2C',
  header: '#3A8FB7',
  text: '#FFF',
  button: '#BB86FC',
  buttonText: '#000'
};

/* STYLES */
const styles = StyleSheet.create({
  header: { paddingTop: 55, paddingBottom: 25, paddingHorizontal: 20, borderBottomLeftRadius: 25, borderBottomRightRadius: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold' },
  content: { padding: 20, paddingBottom: 40 },
  socialContainer: { borderWidth: 1, borderColor: '#ddd', borderRadius: 15, padding: 20, alignItems: 'center', marginBottom: 20 },
  socialText: { marginBottom: 15, fontWeight: '600' },
  iconRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 30 },
  line: { flex: 1, height: 1, backgroundColor: '#ddd' },
  orText: { marginHorizontal: 10 },
  inputSection: { width: '100%' },
  label: { fontWeight: 'bold', marginBottom: 5 },
  labelErro: { flexDirection: 'row', alignItems: 'flex-end' },
  msgErro: { color: 'red', fontSize: 12, marginLeft: 10 },
  button: { borderRadius: 15, height: 55, justifyContent: 'center', alignItems: 'center', marginTop: 15 },
  buttonText: { fontSize: 18, fontWeight: 'bold' },
  buttonSecondary: { marginTop: 10, backgroundColor: '#555' }
});