import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { InputAnimado } from '../src/components/InputAnimado';
import { useCadastro } from '../hooks/useCadastro';

import { ThemeProvider, useTheme } from '../src/contexts/themeContext';
import CadastroLayout from '../src/components/cadastroLayout';

export default function CadastroScreen() {
  const router = useRouter();

  return (
    <ThemeProvider>
      <CadastroLayout>
        <CadastroContent router={router} />
      </CadastroLayout>
    </ThemeProvider>
  );
}

// Componente separado para usar useTheme
function CadastroContent({ router }: { router: ReturnType<typeof useRouter> }) {
  const { theme } = useTheme();
  const {
    nome, setNome,
    email, setEmail,
    senha, setSenha,
    confirmaSenha, setConfirmaSenha,
    erro, mensagens,
    erroGeral,
    validarECadastrar,
    animateFocus,
    focusAnimNome,
    focusAnimEmail,
    focusAnimSenha,
    focusAnimConfirma,
    errorAnim,
    sucesso,
    fecharESair
  } = useCadastro();

  return (
    <>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color={theme.text} />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/homeLight/mao.png')}
            style={styles.logoMao}
          />
          <Image
            source={require('../assets/images/homeLight/BrincaLibras.png')}
            style={styles.logoTexto}
          />
        </View>

        <View style={{ width: 26 }} />
      </View>

      {/* INPUTS */}
      <View style={styles.inputSection}>
        <InputAnimado
          label={
            <View style={styles.labelErro}>
              <Text style={[styles.label, { color: theme.text }]}>Nome</Text>
              {erro.nome && <Text style={styles.msgErro}>{mensagens.nome}</Text>}
            </View>
          }
          placeholder="Seu nome"
          value={nome}
          onChangeText={setNome}
          iconName="person-outline"
          focusAnim={focusAnimNome}
          errorAnim={errorAnim}
          temErro={erro.nome}
          animateFocus={animateFocus}
        />

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
          placeholder="********"
          value={senha}
          onChangeText={setSenha}
          iconName="lock-closed-outline"
          focusAnim={focusAnimSenha}
          errorAnim={errorAnim}
          temErro={erro.senha}
          secureTextEntry
          animateFocus={animateFocus}
        />

        <InputAnimado
          label={
            <View style={styles.labelErro}>
              <Text style={[styles.label, { color: theme.text }]}>Confirmar senha</Text>
              {erro.confirmaSenha && <Text style={styles.msgErro}>{mensagens.confirmaSenha}</Text>}
            </View>
          }
          placeholder="********"
          value={confirmaSenha}
          onChangeText={setConfirmaSenha}
          iconName="lock-closed-outline"
          focusAnim={focusAnimConfirma}
          errorAnim={errorAnim}
          temErro={erro.confirmaSenha}
          secureTextEntry
          animateFocus={animateFocus}
        />

        {erroGeral && <Text style={styles.msgErro}>{erroGeral}</Text>}

        <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={validarECadastrar}>
          <Text style={[styles.buttonText, { color: theme.text }]}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  header: {
    paddingTop: 45,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  logoMao: { width: 60, height: 60, resizeMode: 'contain', marginRight: 10 },
  logoTexto: { width: 180, height: 60, resizeMode: 'contain' },
  inputSection: { width: '100%' },
  label: { fontWeight: 'bold' },
  labelErro: { flexDirection: 'row', alignItems: 'center' },
  msgErro: { color: 'red', marginLeft: 10, fontSize: 12 },
  button: { borderRadius: 15, height: 55, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  buttonText: { fontSize: 18, fontWeight: 'bold' },
});