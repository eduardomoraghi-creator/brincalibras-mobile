import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

/**
 * Perfil.tsx
 *
 * Tela montada com base no layout enviado.
 *
 * Onde usar PNGs:
 * - avatar-placeholder.png
 * - medalha_1.png ... medalha_6.png
 * - amigos.png
 *
 * Se você já tiver componentes próprios de botão, input, card, ícone
 * ou navegação inferior, pode substituir os blocos equivalentes aqui.
 */

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
};

type MedalhaItem = {
  id: string;
  image: any;
};

const medalhas: MedalhaItem[] = [
  { id: '1', image: require('../assets/images/medalha_1.png') },
  { id: '2', image: require('../assets/images/medalha_2.png') },
  { id: '3', image: require('../assets/images/medalha_3.png') },
  { id: '4', image: require('../assets/images/medalha_4.png') },
  { id: '5', image: require('../assets/images/medalha_5.png') },
  { id: '6', image: require('../assets/images/medalha_6.png') },
];

const iconAvatar = '👤';
const iconRocket = '🚀';
const iconShare = '⤴';
const iconMedal = '🏅';
const iconClipboard = '📝';
const iconFeedback = '💬';
const iconSettings = '⚙';
const iconTrash = '🗑';
const iconEdit = '✎';
const iconLock = '🔒';
const iconMail = '✉';
const iconSend = '➤';
const iconBack = '↩';

export default function Perfil() {
  const progress = 0.82;

  const onBackPress = () => {
    console.log('Voltar');
  };

  const onDetalhesPress = () => {
    console.log('Visualizar progresso detalhado');
  };

  const onVerMaisMedalhas = () => {
    console.log('Ver mais medalhas');
  };

  const onEditarNome = () => {
    console.log('Editar nome');
  };

  const onEditarEmail = () => {
    console.log('Editar email');
  };

  const onAlterarSenha = () => {
    console.log('Alterar senha');
  };

  const onEnviarFeedback = () => {
    console.log('Enviar feedback');
  };

  const onConvidar = () => {
    console.log('Convidar');
  };

  const onConfiguracoes = () => {
    console.log('Abrir configurações');
  };

  const onDeleteAccount = () => {
    console.log('Deletar conta');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu perfil</Text>
        <TouchableOpacity style={styles.headerBackButton} onPress={onBackPress}>
          <Text style={styles.headerBackIcon}>{iconBack}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarCircle}>
            <Image
              source={require('../assets/images/avatar-placeholder.png')}
              style={styles.avatarImage}
              resizeMode="contain"
            />
          </View>
        </View>

        <SectionCard>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionIcon}>{iconRocket}</Text>
              <Text style={styles.sectionTitle}>Meta diária</Text>
            </View>

            <TouchableOpacity onPress={onConvidar}>
              <Text style={styles.actionIcon}>{iconShare}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
          </View>

          <PrimaryDarkButton label="Visualizar progresso detalhado" onPress={onDetalhesPress} wide />
        </SectionCard>

        <SectionCard>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionIcon}>{iconMedal}</Text>
            <Text style={styles.sectionTitle}>Medalhas</Text>
          </View>

          <View style={styles.medalhasGrid}>
            {medalhas.map((item) => (
              <Image key={item.id} source={item.image} style={styles.medalhaImage} resizeMode="contain" />
            ))}
          </View>

          <PrimaryDarkButton label="Ver mais" onPress={onVerMaisMedalhas} />
        </SectionCard>

        <SectionCard>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionIcon}>{iconClipboard}</Text>
            <Text style={styles.sectionTitle}>Dados cadastrais</Text>
          </View>

          <InputRow placeholder="Seu nome aqui" leftIcon={iconAvatar} onEditPress={onEditarNome} />
          <InputRow placeholder="email@email.com" leftIcon={iconMail} onEditPress={onEditarEmail} />

          <PrimaryDarkButton label="Alterar senha" onPress={onAlterarSenha} icon={iconLock} />
        </SectionCard>

        <SectionCard>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionIcon}>{iconFeedback}</Text>
            <Text style={styles.sectionTitle}>Feedback</Text>
          </View>

          <TextInput
            multiline
            placeholder="Nos conte o que você está achando do BrincaLibras!"
            placeholderTextColor="#BFBFBF"
            style={styles.feedbackInput}
            textAlignVertical="center"
          />

          <TouchableOpacity style={styles.inlineActionButton} onPress={onEnviarFeedback}>
            <Text style={styles.inlineActionText}>Enviar</Text>
            <Text style={styles.inlineActionArrow}>{iconSend}</Text>
          </TouchableOpacity>
        </SectionCard>

        <SectionCard>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionIcon}>{iconShare}</Text>
            <Text style={styles.sectionTitle}>Compartilhe o app</Text>
          </View>

          <View style={styles.shareContent}>
            <Image source={require('../assets/images/amigos.png')} style={styles.shareImage} resizeMode="contain" />
            <View style={styles.shareTextBlock}>
              <Text style={styles.shareText}>Aprender junto com os amigos é muito mais divertido!</Text>

              <TouchableOpacity style={styles.inlineActionButtonSmall} onPress={onConvidar}>
                <Text style={styles.inlineActionText}>Convidar</Text>
                <Text style={styles.inlineActionArrow}>{iconSend}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SectionCard>

        <TouchableOpacity style={styles.settingsButton} onPress={onConfiguracoes}>
          <Text style={styles.settingsButtonIcon}>{iconSettings}</Text>
          <Text style={styles.settingsButtonText}>Configurações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={onDeleteAccount}>
          <Text style={styles.deleteButtonIcon}>{iconTrash}</Text>
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

function PrimaryDarkButton({ label, onPress, icon, wide = false }: PrimaryDarkButtonProps) {
  return (
    <TouchableOpacity style={[styles.darkButton, wide && styles.darkButtonWide]} onPress={onPress}>
      {icon ? <Text style={styles.darkButtonIcon}>{icon}</Text> : null}
      <Text style={styles.darkButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

type InputRowProps = {
  placeholder: string;
  leftIcon: string;
  onEditPress: () => void;
};

function InputRow({ placeholder, leftIcon, onEditPress }: InputRowProps) {
  return (
    <View style={styles.inputRowContainer}>
      <View style={styles.fakeInput}>
        <Text style={styles.fakeInputLeftIcon}>{leftIcon}</Text>
        <Text style={styles.fakeInputText}>{placeholder}</Text>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
        <Text style={styles.editButtonIcon}>{iconEdit}</Text>
      </TouchableOpacity>
    </View>
  );
}

function BottomTabBar() {
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity style={styles.tabItem}>
        <Text style={styles.tabIcon}>👤</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem}>
        <Text style={styles.tabIcon}>🔤</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem}>
        <Text style={styles.tabIcon}>⌂</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem}>
        <Text style={styles.tabIcon}>?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem}>
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
  avatarImage: {
    width: 80,
    height: 80,
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
  actionIcon: {
    fontSize: 20,
    color: COLORS.primary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
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
  medalhasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    rowGap: 18,
    columnGap: 12,
    paddingVertical: 8,
    marginBottom: 14,
  },
  medalhaImage: {
    width: 78,
    height: 78,
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
    backgroundColor: '#E3E3E3',
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
    backgroundColor: '#E3E3E3',
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
  inlineActionButtonSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
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
  shareContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingTop: 4,
  },
  shareImage: {
    width: 120,
    height: 100,
  },
  shareTextBlock: {
    flex: 1,
    marginLeft: 10,
    alignItems: 'flex-start',
  },
  shareText: {
    fontSize: 16,
    lineHeight: 28,
    color: '#333333',
    maxWidth: 150,
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
