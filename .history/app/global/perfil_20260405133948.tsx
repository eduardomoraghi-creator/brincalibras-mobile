import React, { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

const medalhasImg = require('../../assets/images/perfil/medalhas.png');
const compartilharImg = require('../../assets/images/perfil/compartilhe-app.png');

const COLORS = {
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
};

export default function PerfilScreen() {
  const router = useRouter();

  const [feedback, setFeedback] = useState('');
  const progress = 0.82;

  const nome = 'Seu nome aqui';
  const email = 'email@email.com';

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

  const onEditarNome = () => {
    Alert.alert('Dados cadastrais', 'Editar nome.');
  };

  const onEditarEmail = () => {
    Alert.alert('Dados cadastrais', 'Editar e-mail.');
  };

  const onAlterarSenha = () => {
    Alert.alert('Senha', 'Abrir tela de alteração de senha.');
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
    Alert.alert('Configurações', 'Abrir configurações.');
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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <View style={styles.header}>
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
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarIcon}>👤</Text>
          </View>
        </View>

        <SectionCard>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionIcon}>🚀</Text>
              <Text style={styles.sectionTitle}>Meta diária</Text>
            </View>

            <TouchableOpacity onPress={abrirOpcoesCompartilhamento}>
              <Text style={styles.actionIcon}>⤴</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.progressBarTrack}>
            <View
              style={[styles.progressBarFill, { width: `${progress * 100}%` }]}
            />
          </View>

          <PrimaryDarkButton
            label="Visualizar progresso detalhado"
            onPress={onDetalhesPress}
            wide
          />
        </SectionCard>

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

        <SectionCard>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionIcon}>📝</Text>
            <Text style={styles.sectionTitle}>Dados cadastrais</Text>
          </View>

          <InputRow
            value={nome}
            leftIcon="👤"
            onEditPress={onEditarNome}
          />

          <InputRow
            value={email}
            leftIcon="✉"
            onEditPress={onEditarEmail}
          />

          <PrimaryDarkButton
            label="Alterar senha"
            onPress={onAlterarSenha}
            icon="🔒"
          />
        </SectionCard>

        <SectionCard>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionIcon}>💬</Text>
            <Text style={styles.sectionTitle}>Feedback</Text>
          </View>

          <TextInput
            multiline
            value={feedback}
            onChangeText={setFeedback}
            placeholder="Nos conte o que você está achando do BrincaLibras!"
            placeholderTextColor="#BFBFBF"
            style={styles.feedbackInput}
            textAlignVertical="center"
          />

          <TouchableOpacity
            style={styles.inlineActionButton}
            onPress={onEnviarFeedback}
            activeOpacity={0.8}
          >
            <Text style={styles.inlineActionText}>Enviar</Text>
            <Text style={styles.inlineActionArrow}>➤</Text>
          </TouchableOpacity>
        </SectionCard>

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
          style={styles.settingsButton}
          onPress={onConfiguracoes}
          activeOpacity={0.85}
        >
          <Text style={styles.settingsButtonIcon}>⚙</Text>
          <Text style={styles.settingsButtonText}>Configurações</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={onDeleteAccount}
          activeOpacity={0.85}
        >
          <Text style={styles.deleteButtonIcon}>🗑</Text>
          <Text style={styles.deleteButtonText}>Deletar conta</Text>
        </TouchableOpacity>

        <BottomTabBar />
      </ScrollView>
    </SafeAreaView>
  );
}

type SectionCardProps = {
  children: React.ReactNode;
};

function SectionCard({ children }: SectionCardProps) {
  return <View style={styles.card}>{children}</View>;
}

type PrimaryDarkButtonProps = {
  label: string;
  onPress: () => void;
  icon?: string;
  wide?: boolean;
};

function PrimaryDarkButton({
  label,
  onPress,
  icon,
  wide = false,
}: PrimaryDarkButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.darkButton, wide && styles.darkButtonWide]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {icon ? <Text style={styles.darkButtonIcon}>{icon}</Text> : null}
      <Text style={styles.darkButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

type InputRowProps = {
  value: string;
  leftIcon: string;
  onEditPress: () => void;
};

function InputRow({ value, leftIcon, onEditPress }: InputRowProps) {
  return (
    <View style={styles.inputRowContainer}>
      <View style={styles.fakeInput}>
        <Text style={styles.fakeInputLeftIcon}>{leftIcon}</Text>
        <Text style={styles.fakeInputText}>{value}</Text>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={onEditPress}
        activeOpacity={0.8}
      >
        <Text style={styles.editButtonIcon}>✎</Text>
      </TouchableOpacity>
    </View>
  );
}

function BottomTabBar() {
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity style={styles.tabItem} activeOpacity={0.8}>
        <Text style={styles.tabIcon}>👤</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem} activeOpacity={0.8}>
        <Text style={styles.tabIcon}>🔤</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem} activeOpacity={0.8}>
        <Text style={styles.tabIcon}>⌂</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem} activeOpacity={0.8}>
        <Text style={styles.tabIcon}>?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem} activeOpacity={0.8}>
        <Text style={styles.tabIcon}>☾</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    height: 58,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },

  headerTitle: {
    color: COLORS.white,
    fontSize: 19,
    fontWeight: '800',
  },

  headerBackButton: {
    padding: 4,
  },

  headerBackIcon: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '700',
  },

  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 0,
  },

  avatarWrapper: {
    alignItems: 'center',
    marginBottom: 18,
  },

  avatarCircle: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },

  avatarIcon: {
    fontSize: 74,
    color: COLORS.primary,
    lineHeight: 78,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 16,
    marginBottom: 20,
  },

  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  sectionIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },

  actionIcon: {
    fontSize: 20,
    color: COLORS.primary,
  },

  progressBarTrack: {
    height: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.primary,
    overflow: 'hidden',
    backgroundColor: '#F0F0F0',
    marginBottom: 18,
  },

  progressBarFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },

  darkButton: {
    minHeight: 40,
    alignSelf: 'center',
    borderRadius: 14,
    backgroundColor: COLORS.darkButton,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  darkButtonWide: {
    width: '90%',
  },

  darkButtonIcon: {
    fontSize: 15,
    marginRight: 8,
  },

  darkButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '800',
  },

  imageCard: {
    width: '100%',
    position: 'relative',
    marginBottom: 20,
  },

  bannerImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.22,
  },

  medalhasOverlayButton: {
    position: 'absolute',
    left: '20%',
    right: '20%',
    bottom: '5%',
    height: '19%',
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

  inputRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  fakeInput: {
    flex: 1,
    minHeight: 50,
    borderRadius: 14,
    backgroundColor: COLORS.inputBg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },

  fakeInputLeftIcon: {
    fontSize: 20,
    color: '#AFAFAF',
    marginRight: 10,
  },

  fakeInputText: {
    fontSize: 14,
    color: '#B8B8B8',
    fontWeight: '600',
  },

  editButton: {
    width: 32,
    height: 32,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  editButtonIcon: {
    fontSize: 20,
    color: COLORS.text,
  },

  feedbackInput: {
    minHeight: 115,
    borderRadius: 16,
    backgroundColor: COLORS.inputBg,
    paddingHorizontal: 18,
    paddingVertical: 18,
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 10,
    fontWeight: '600',
  },

  inlineActionButton: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 2,
  },

  inlineActionText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.text,
    textDecorationLine: 'underline',
  },

  inlineActionArrow: {
    fontSize: 24,
    color: COLORS.primary,
    marginLeft: 8,
  },

  settingsButton: {
    width: '75%',
    alignSelf: 'center',
    minHeight: 50,
    borderRadius: 16,
    backgroundColor: COLORS.darkButton,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 14,
  },

  settingsButtonIcon: {
    fontSize: 20,
    color: COLORS.white,
    marginRight: 10,
  },

  settingsButtonText: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: '800',
  },

  deleteButton: {
    width: '75%',
    alignSelf: 'center',
    minHeight: 38,
    borderRadius: 14,
    backgroundColor: COLORS.danger,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
  },

  deleteButtonIcon: {
    fontSize: 18,
    color: COLORS.white,
    marginRight: 8,
  },

  deleteButtonText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '800',
  },

  tabBar: {
    marginHorizontal: -22,
    minHeight: 68,
    borderTopWidth: 1,
    borderTopColor: '#CFCFCF',
    backgroundColor: COLORS.card,
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
    color: COLORS.primary,
    fontWeight: '700',
  },
});