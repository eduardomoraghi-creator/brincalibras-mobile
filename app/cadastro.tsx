import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';

import { useCadastro } from '../hooks/useCadastro';
import { InputAnimado } from '../src/components/InputAnimado';

export default function CadastroScreen() {
  const router = useRouter();

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
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* 🔥 BOTÃO VOLTAR */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={26} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Cadastro</Text>

      {/* SOCIAL */}
      <View style={styles.socialContainer}>
        <Text style={styles.socialText}>Utilize uma rede social...</Text>

        <View style={styles.iconRow}>
          <Ionicons name="logo-google" size={32} color="#4285F4" />
          <FontAwesome name="facebook-official" size={32} color="#3b5998" />
          <Ionicons name="logo-instagram" size={32} color="#C13584" />
          <Ionicons name="logo-linkedin" size={32} color="#0077B5" />
        </View>
      </View>

      <View style={styles.dividerRow}>
        <View style={styles.line} />
        <Text style={styles.orText}>ou</Text>
        <View style={styles.line} />
      </View>

      {/* INPUTS */}
      <View style={styles.inputSection}>
        <InputAnimado
          label={
            <View style={styles.labelErro}>
              <Text style={styles.label}>Nome</Text>
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
              <Text style={styles.label}>E-mail</Text>
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
              <Text style={styles.label}>Senha</Text>
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
              <Text style={styles.label}>Confirmar senha</Text>
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

        <TouchableOpacity style={styles.button} onPress={validarECadastrar}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

      {/* 🔥 MODAL */}
      <Modal visible={sucesso} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.successCard}>
            <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />

            <Text style={styles.successTitle}>Sucesso!</Text>
            <Text style={styles.successMessage}>Sua conta foi criada com sucesso!</Text>

            <TouchableOpacity style={styles.successButton} onPress={fecharESair}>
              <Text style={styles.successButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

// Mantendo seu estilo original, levemente ajustado para consistência visual
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 30,
    justifyContent: 'center'
  },
  backButton: { marginBottom: 10 },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  socialContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center'
  },
  socialText: { marginBottom: 15 },
  iconRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 30 },
  line: { flex: 1, height: 1, backgroundColor: '#ddd' },
  orText: { marginHorizontal: 10 },
  inputSection: { width: '100%' },
  label: { fontWeight: 'bold' },
  labelErro: { flexDirection: 'row', alignItems: 'center' },
  msgErro: { color: 'red', marginLeft: 10, fontSize: 12 },
  button: {
    backgroundColor: '#000',
    borderRadius: 15,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  successCard: { width: '80%', backgroundColor: '#fff', borderRadius: 20, padding: 25, alignItems: 'center' },
  successTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 10 },
  successMessage: { textAlign: 'center', marginVertical: 15 },
  successButton: { backgroundColor: '#000', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 10 },
  successButtonText: { color: '#fff', fontWeight: 'bold' }
});