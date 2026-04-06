import React, { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

const fotoUsuarioImg = require('../../assets/images/perfil/foto-usuario.png');
const medalhasImg = require('../../assets/images/perfil/medalhas.png');
const dadosCadastraisImg = require('../../assets/images/perfil/dados-cadastrais.png');
const feedbackImg = require('../../assets/images/perfil/feedback.png');
const compartilharImg = require('../../assets/images/perfil/compartilhe-app.png');

const LIGHT = {
  primary: '#2D9CDB',
  background: '#EDEDED',
  card: '#F5F5F5',
  border: '#3EA0DD',
  darkButton: '#666666',
  danger: '#F20D0D',
  text: '#111111',
  muted: '#BDBDBD',
  white: '#FFFFFF',
  inputBg: '#E3E3E3',
  tabBg: '#F5F5F5',
  progressBg: '#F0F0F0',
};

const DARK = {
  primary: '#2D9CDB',
  background: '#111418',
  card: '#1C2229',
  border: '#3EA0DD',
  darkButton: '#5A5F66',
  danger: '#D81E1E',
  text: '#F4F4F4',
  muted: '#9EA7B3',
  white: '#FFFFFF',
  inputBg: '#2A313A',
  tabBg: '#1C2229',
  progressBg: '#2B333D',
};

type ThemeType = typeof LIGHT;

export default function PerfilScreen() {
  const router = useRouter();
  const systemScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemScheme === 'dark');

  const theme: ThemeType = isDark ? DARK : LIGHT;

  const [feedback, setFeedback] = useState('');
  const [nome, setNome] = useState('Seu nome aqui');
  const [email, setEmail] = useState('email@email.com');

  const [modalNomeVisible, setModalNomeVisible] = useState(false);
  const [modalEmailVisible, setModalEmailVisible] = useState(false);
  const [modalSenhaVisible, setModalSenhaVisible] = useState(false);

  const [nomeTemp, setNomeTemp] = useState(nome);
  const [emailTemp, setEmailTemp] = useState(email);
  const [senhaTemp, setSenhaTemp] = useState('');
  const [confirmarSenhaTemp, setConfirmarSenhaTemp] = useState('');

  const progress = 0.82;

  const mensagemCompartilhamento = useMemo(
    () =>
      'Venha aprender Libras comigo no BrincaLibras! Aprender junto com os amigos é muito mais divertido!',
    []
  );

  const onBackPress = () => {
    router.back();
  };

  const onDetalhesPress = () => {
    Alert.alert('Meta diária', 'Abrir progresso detalhado.');
  };

  const onFotoUsuarioPress = () => {
    Alert.alert('Foto do usuário', 'Abrir opções para visualizar ou alterar a foto.');
  };

  const onOpenEditarNome = () => {
    setNomeTemp(nome);
    setModalNomeVisible(true);
  };

  const onSalvarNome = () => {
    const valor = nomeTemp.trim();

    if (!valor) {
      Alert.alert('Nome', 'Digite um nome válido.');
      return;
    }

    setNome(valor);
    setModalNomeVisible(false);
  };

  const onOpenEditarEmail = () => {
    setEmailTemp(email);
    setModalEmailVisible(true);
  };

  const onSalvarEmail = () => {
    const valor = emailTemp.trim();

    if (!valor || !valor.includes('@')) {
      Alert.alert('E-mail', 'Digite um e-mail válido.');
      return;
    }

    setEmail(valor);
    setModalEmailVisible(false);
  };

  const onOpenAlterarSenha = () => {
    setSenhaTemp('');
    setConfirmarSenhaTemp('');
    setModalSenhaVisible(true);
  };

  const onSalvarSenha = () => {
    if (!senhaTemp || !confirmarSenhaTemp) {
      Alert.alert('Senha', 'Preencha os dois campos.');
      return;
    }

    if (senhaTemp.length < 6) {
      Alert.alert('Senha', 'A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    if (senhaTemp !== confirmarSenhaTemp) {
      Alert.alert('Senha', 'As senhas não coincidem.');
      return;
    }

    setModalSenhaVisible(false);
    Alert.alert('Senha', 'Senha alterada com sucesso.');
  };

  const onEnviarFeedback = () => {
    if (!feedback.trim()) {
      Alert.alert('Feedback', 'Digite uma mensagem antes de enviar.');
      return;
    }

    Alert.alert('Feedback', 'Feedback enviado com sucesso.');
    setFeedback('');
  };

  const onConfiguracoes = () => {
    Alert.alert(
      'Configurações',
      `Modo atual: ${isDark ? 'escuro' : 'claro'}.`,
      [
        {
          text: isDark ? 'Usar modo claro' : 'Usar modo escuro',
          onPress: () => setIsDark((prev) => !prev),
        },
        { text: 'Fechar', style: 'cancel' },
      ]
    );
  };

  const onDeleteAccount = () => {
    Alert.alert(
      'Deletar conta',
      'Tem certeza que deseja deletar sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Deletar', style: 'destructive' },
      ]
    );
  };

  const compartilharNativo = async () => {
    try {
      await Share.share({
        message: mensagemCompartilhamento,
      });
    } catch (error) {
      console.log('Erro ao compartilhar:', error);
    }
  };

  const compartilharWhatsapp = async () => {
    try {
      const url = `whatsapp://send?text=${encodeURIComponent(
        mensagemCompartilhamento
      )}`;
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        await compartilharNativo();
      }
    } catch (error) {
      console.log('Erro ao compartilhar no WhatsApp:', error);
      await compartilharNativo();
    }
  };

  const compartilharEmail = async () => {
    try {
      const subject = 'Convite para conhecer o BrincaLibras';
      const body = mensagemCompartilhamento;
      const url = `mailto:?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        await compartilharNativo();
      }
    } catch (error) {
      console.log('Erro ao compartilhar por e-mail:', error);
      await compartilharNativo();
    }
  };

  const compartilharSms = async () => {
    try {
      const separator = Platform.OS === 'ios' ? '&' : '?';
      const url = `sms:${separator}body=${encodeURIComponent(
        mensagemCompartilhamento
      )}`;

      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        await compartilharNativo();
      }
    } catch (error) {
      console.log('Erro ao compartilhar por SMS:', error);
      await compartilharNativo();
    }
  };

  const compartilharTelegram = async () => {
    try {
      const url = `tg://msg?text=${encodeURIComponent(
        mensagemCompartilhamento
      )}`;
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        await compartilharNativo();
      }
    } catch (error) {
      console.log('Erro ao compartilhar no Telegram:', error);
      await compartilharNativo();
    }
  };

  const abrirOpcoesCompartilhamento = () => {
    Alert.alert('Compartilhar convite', 'Escolha uma das 4 opções:', [
      { text: 'WhatsApp', onPress: compartilharWhatsapp },
      { text: 'E-mail', onPress: compartilharEmail },
      { text: 'SMS', onPress: compartilharSms },
      { text: 'Telegram', onPress: compartilharTelegram },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  const irParaMedalhas = () => {
    router.push('/global/medalhas');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.primary}
      />

      <View style={[styles.header, { backgroundColor: theme.primary }]}>
        <Text style={styles.headerTitle}>Meu perfil</Text>

        <TouchableOpacity
          style={styles.headerBackButton}
          onPress={onBackPress}
          activeOpacity={0.8}
        >
          <Text style={styles.headerBackIcon}>↩</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageCard}>
          <Image
            source={fotoUsuarioImg}
            style={styles.avatarImage}
            resizeMode="contain"
          />

          <TouchableOpacity
            style={styles.fotoUsuarioOverlayButton}
            onPress={onFotoUsuarioPress}
            activeOpacity={0.12}
          >
            <View />
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.metaCard,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={styles.metaHeaderRow}>
            <View style={styles.metaTitleRow}>
              <Text style={styles.metaIcon}>🚀</Text>
              <Text style={[styles.metaTitle, { color: theme.text }]}>
                Meta diária
              </Text>
            </View>

            <TouchableOpacity onPress={abrirOpcoesCompartilhamento} activeOpacity={0.8}>
              <Text style={[styles.metaShareIcon, { color: theme.primary }]}>⤴</Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.progressBarTrack,
              {
                borderColor: theme.primary,
                backgroundColor: theme.progressBg,
              },
            ]}
          >
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${progress * 100}%`,
                  backgroundColor: theme.primary,
                },
              ]}
            />
          </View>

          <TouchableOpacity
            style={[styles.metaButton, { backgroundColor: theme.darkButton }]}
            onPress={onDetalhesPress}
            activeOpacity={0.85}
          >
            <Text style={styles.metaButtonText}>Visualizar progresso detalhado</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageCard}>
          <Image
            source={medalhasImg}
            style={styles.bannerImage}
            resizeMode="contain"
          />

          <TouchableOpacity
            style={styles.medalhasOverlayButton}
            onPress={irParaMedalhas}
            activeOpacity={0.12}
          >
            <View />
          </TouchableOpacity>
        </View>

        <View style={styles.imageCard}>
          <Image
            source={dadosCadastraisImg}
            style={styles.bannerImage}
            resizeMode="contain"
          />

          <Text
            style={[
              styles.nomeOverlayText,
              { color: isDark ? '#D3D7DB' : '#C2C2C2' },
            ]}
            numberOfLines={1}
          >
            {nome}
          </Text>

          <Text
            style={[
              styles.emailOverlayText,
              { color: isDark ? '#D3D7DB' : '#C2C2C2' },
            ]}
            numberOfLines={1}
          >
            {email}
          </Text>

          <TouchableOpacity
            style={styles.editarNomeOverlayButton}
            onPress={onOpenEditarNome}
            activeOpacity={0.12}
          >
            <View />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.editarEmailOverlayButton}
            onPress={onOpenEditarEmail}
            activeOpacity={0.12}
          >
            <View />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.alterarSenhaOverlayButton}
            onPress={onOpenAlterarSenha}
            activeOpacity={0.12}
          >
            <View />
          </TouchableOpacity>
        </View>

        <View style={styles.imageCard}>
          <Image
            source={feedbackImg}
            style={styles.bannerImage}
            resizeMode="contain"
          />

          <TextInput
            multiline
            value={feedback}
            onChangeText={setFeedback}
            placeholder="Nos conte o que você está achando do BrincaLibras!"
            placeholderTextColor={isDark ? '#A8ADB3' : '#BFBFBF'}
            style={[
              styles.feedbackOverlayInput,
              {
                color: theme.text,
              },
            ]}
            textAlignVertical="center"
          />

          <TouchableOpacity
            style={styles.enviarFeedbackOverlayButton}
            onPress={onEnviarFeedback}
            activeOpacity={0.12}
          >
            <View />
          </TouchableOpacity>
        </View>

        <View style={styles.imageCard}>
          <Image
            source={compartilharImg}
            style={styles.bannerImage}
            resizeMode="contain"
          />

          <TouchableOpacity
            style={styles.compartilharOverlayButton}
            onPress={abrirOpcoesCompartilhamento}
            activeOpacity={0.12}
          >
            <View />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.settingsButton, { backgroundColor: theme.darkButton }]}
          onPress={onConfiguracoes}
          activeOpacity={0.85}
        >
          <Text style={styles.settingsButtonIcon}>⚙</Text>
          <Text style={styles.settingsButtonText}>Configurações</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.deleteButton, { backgroundColor: theme.danger }]}
          onPress={onDeleteAccount}
          activeOpacity={0.85}
        >
          <Text style={styles.deleteButtonIcon}>🗑</Text>
          <Text style={styles.deleteButtonText}>Deletar conta</Text>
        </TouchableOpacity>

        <BottomTabBar
          theme={theme}
          isDark={isDark}
          onToggleDarkMode={() => setIsDark((prev) => !prev)}
        />
      </ScrollView>

      <EditModal
        visible={modalNomeVisible}
        title="Editar nome"
        value={nomeTemp}
        onChangeText={setNomeTemp}
        onClose={() => setModalNomeVisible(false)}
        onSave={onSalvarNome}
        theme={theme}
        placeholder="Digite seu nome"
      />

      <EditModal
        visible={modalEmailVisible}
        title="Editar e-mail"
        value={emailTemp}
        onChangeText={setEmailTemp}
        onClose={() => setModalEmailVisible(false)}
        onSave={onSalvarEmail}
        theme={theme}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
      />

      <PasswordModal
        visible={modalSenhaVisible}
        senha={senhaTemp}
        confirmarSenha={confirmarSenhaTemp}
        onChangeSenha={setSenhaTemp}
        onChangeConfirmarSenha={setConfirmarSenhaTemp}
        onClose={() => setModalSenhaVisible(false)}
        onSave={onSalvarSenha}
        theme={theme}
      />
    </SafeAreaView>
  );
}

type BottomTabBarProps = {
  theme: ThemeType;
  isDark: boolean;
  onToggleDarkMode: () => void;
};

function BottomTabBar({ theme, isDark, onToggleDarkMode }: BottomTabBarProps) {
  return (
    <View
      style={[
        styles.tabBar,
        {
          backgroundColor: theme.tabBg,
          borderTopColor: isDark ? '#2E3843' : '#CFCFCF',
        },
      ]}
    >
      <TouchableOpacity style={styles.tabItem} activeOpacity={0.8}>
        <Text style={[styles.tabIcon, { color: theme.primary }]}>👤</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem} activeOpacity={0.8}>
        <Text style={[styles.tabIcon, { color: theme.primary }]}>🔤</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem} activeOpacity={0.8}>
        <Text style={[styles.tabIcon, { color: theme.primary }]}>⌂</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem} activeOpacity={0.8}>
        <Text style={[styles.tabIcon, { color: theme.primary }]}>?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        activeOpacity={0.8}
        onPress={onToggleDarkMode}
      >
        <Text style={[styles.tabIcon, { color: theme.primary }]}>
          {isDark ? '☀' : '☾'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

type EditModalProps = {
  visible: boolean;
  title: string;
  value: string;
  onChangeText: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
  theme: ThemeType;
  placeholder: string;
  keyboardType?: 'default' | 'email-address';
};

function EditModal({
  visible,
  title,
  value,
  onChangeText,
  onClose,
  onSave,
  theme,
  placeholder,
  keyboardType = 'default',
}: EditModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackdrop}>
        <View style={[styles.modalCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.modalTitle, { color: theme.text }]}>{title}</Text>

          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={theme.muted}
            keyboardType={keyboardType}
            style={[
              styles.modalInput,
              {
                backgroundColor: theme.inputBg,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
          />

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#888888' }]}
              onPress={onClose}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: theme.primary }]}
              onPress={onSave}
            >
              <Text style={styles.modalButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

type PasswordModalProps = {
  visible: boolean;
  senha: string;
  confirmarSenha: string;
  onChangeSenha: (value: string) => void;
  onChangeConfirmarSenha: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
  theme: ThemeType;
};

function PasswordModal({
  visible,
  senha,
  confirmarSenha,
  onChangeSenha,
  onChangeConfirmarSenha,
  onClose,
  onSave,
  theme,
}: PasswordModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackdrop}>
        <View style={[styles.modalCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.modalTitle, { color: theme.text }]}>
            Alterar senha
          </Text>

          <TextInput
            value={senha}
            onChangeText={onChangeSenha}
            placeholder="Nova senha"
            placeholderTextColor={theme.muted}
            secureTextEntry
            style={[
              styles.modalInput,
              {
                backgroundColor: theme.inputBg,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
          />

          <TextInput
            value={confirmarSenha}
            onChangeText={onChangeConfirmarSenha}
            placeholder="Confirmar senha"
            placeholderTextColor={theme.muted}
            secureTextEntry
            style={[
              styles.modalInput,
              {
                backgroundColor: theme.inputBg,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
          />

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#888888' }]}
              onPress={onClose}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: theme.primary }]}
              onPress={onSave}
            >
              <Text style={styles.modalButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  header: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
  },

  headerBackButton: {
    padding: 4,
  },

  headerBackIcon: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
  },

  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 0,
  },

  imageCard: {
    width: '100%',
    position: 'relative',
    marginBottom: 20,
  },

  avatarImage: {
    width: 124,
    height: 124,
    alignSelf: 'center',
  },

  bannerImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.22,
  },

  fotoUsuarioOverlayButton: {
    position: 'absolute',
    alignSelf: 'center',
    top: '4%',
    width: 124,
    height: 124,
    borderRadius: 62,
    backgroundColor: 'transparent',
  },

  metaCard: {
    borderRadius: 16,
    borderWidth: 1.2,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 16,
    marginBottom: 20,
  },

  metaHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  metaTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  metaIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  metaTitle: {
    fontSize: 16,
    fontWeight: '800',
  },

  metaShareIcon: {
    fontSize: 20,
  },

  progressBarTrack: {
    height: 16,
    borderRadius: 999,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 18,
  },

  progressBarFill: {
    height: '100%',
    borderRadius: 999,
  },

  metaButton: {
    minHeight: 40,
    alignSelf: 'center',
    borderRadius: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },

  metaButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  medalhasOverlayButton: {
    position: 'absolute',
    left: '20%',
    right: '20%',
    bottom: '5%',
    height: '19%',
    backgroundColor: 'transparent',
  },

  nomeOverlayText: {
    position: 'absolute',
    left: '25%',
    right: '15%',
    top: '24%',
    fontSize: 14,
    fontWeight: '600',
  },

  emailOverlayText: {
    position: 'absolute',
    left: '25%',
    right: '15%',
    top: '52%',
    fontSize: 14,
    fontWeight: '600',
  },

  editarNomeOverlayButton: {
    position: 'absolute',
    right: '2.8%',
    top: '18%',
    width: '12%',
    height: '14%',
    backgroundColor: 'transparent',
  },

  editarEmailOverlayButton: {
    position: 'absolute',
    right: '2.8%',
    top: '47%',
    width: '12%',
    height: '14%',
    backgroundColor: 'transparent',
  },

  alterarSenhaOverlayButton: {
    position: 'absolute',
    left: '22%',
    right: '22%',
    bottom: '7%',
    height: '17%',
    backgroundColor: 'transparent',
  },

  feedbackOverlayInput: {
    position: 'absolute',
    left: '7%',
    right: '7%',
    top: '24%',
    height: '52%',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 18,
    fontSize: 14,
    fontWeight: '600',
    backgroundColor: 'transparent',
  },

  enviarFeedbackOverlayButton: {
    position: 'absolute',
    right: '2.8%',
    bottom: '4%',
    width: '34%',
    height: '16%',
    backgroundColor: 'transparent',
  },

  compartilharOverlayButton: {
    position: 'absolute',
    right: '3%',
    bottom: '5%',
    width: '33%',
    height: '23%',
    backgroundColor: 'transparent',
  },

  settingsButton: {
    width: '75%',
    alignSelf: 'center',
    minHeight: 50,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 14,
  },

  settingsButtonIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    marginRight: 10,
  },

  settingsButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '800',
  },

  deleteButton: {
    width: '75%',
    alignSelf: 'center',
    minHeight: 38,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
  },

  deleteButtonIcon: {
    fontSize: 18,
    color: '#FFFFFF',
    marginRight: 8,
  },

  deleteButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '800',
  },

  tabBar: {
    marginHorizontal: -22,
    minHeight: 68,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 6,
  },

  tabItem: {
    paddingHorizontal: 8,
    paddingVertical: 10,
  },

  tabIcon: {
    fontSize: 28,
    fontWeight: '700',
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    paddingHorizontal: 22,
  },

  modalCard: {
    borderRadius: 18,
    padding: 18,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 14,
  },

  modalInput: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
  },

  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 6,
  },

  modalButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginLeft: 10,
  },

  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
  },
});