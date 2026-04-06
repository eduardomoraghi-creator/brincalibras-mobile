import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Share,
  Linking,
  Platform,
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
  white: '#FFFFFF',
};

export default function Perfil() {
  const router = useRouter();

  const mensagem =
    'Venha aprender Libras comigo no BrincaLibras! Aprender junto com os amigos é muito mais divertido!';

  // =========================
  // COMPARTILHAMENTO (4 opções)
  // =========================
  const compartilharWhatsapp = async () => {
    const url = `whatsapp://send?text=${encodeURIComponent(mensagem)}`;
    const supported = await Linking.canOpenURL(url);
    supported ? Linking.openURL(url) : Share.share({ message: mensagem });
  };

  const compartilharEmail = async () => {
    const url = `mailto:?subject=BrincaLibras&body=${encodeURIComponent(
      mensagem
    )}`;
    const supported = await Linking.canOpenURL(url);
    supported ? Linking.openURL(url) : Share.share({ message: mensagem });
  };

  const compartilharSms = async () => {
    const sep = Platform.OS === 'ios' ? '&' : '?';
    const url = `sms:${sep}body=${encodeURIComponent(mensagem)}`;
    const supported = await Linking.canOpenURL(url);
    supported ? Linking.openURL(url) : Share.share({ message: mensagem });
  };

  const compartilharTelegram = async () => {
    const url = `tg://msg?text=${encodeURIComponent(mensagem)}`;
    const supported = await Linking.canOpenURL(url);
    supported ? Linking.openURL(url) : Share.share({ message: mensagem });
  };

  const abrirCompartilhar = () => {
    Alert.alert('Compartilhar', 'Escolha uma opção:', [
      { text: 'WhatsApp', onPress: compartilharWhatsapp },
      { text: 'E-mail', onPress: compartilharEmail },
      { text: 'SMS', onPress: compartilharSms },
      { text: 'Telegram', onPress: compartilharTelegram },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu perfil</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* AVATAR */}
        <View style={styles.avatarBox}>
          <View style={styles.avatarCircle}>
            <Text style={{ fontSize: 50 }}>👤</Text>
          </View>
        </View>

        {/* MEDALHAS (NOVA IMAGEM) */}
        <View style={styles.imageCard}>
          <Image source={medalhasImg} style={styles.image} />

          {/* BOTÃO TRANSPARENTE */}
          <TouchableOpacity
            style={styles.overlayMedalhas}
            onPress={() => router.push('/global/medalhas')}
          />
        </View>

        {/* COMPARTILHAR (NOVA IMAGEM) */}
        <View style={styles.imageCard}>
          <Image source={compartilharImg} style={styles.image} />

          {/* BOTÃO TRANSPARENTE */}
          <TouchableOpacity
            style={styles.overlayShare}
            onPress={abrirCompartilhar}
          />
        </View>

        {/* CONFIG */}
        <TouchableOpacity style={styles.configButton}>
          <Text style={styles.configText}>⚙ Configurações</Text>
        </TouchableOpacity>

        {/* DELETE */}
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteText}>🗑 Deletar conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    height: 60,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  scroll: {
    padding: 20,
  },

  avatarBox: {
    alignItems: 'center',
    marginBottom: 20,
  },

  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageCard: {
    marginBottom: 20,
    position: 'relative',
  },

  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.9,
  },

  // 🔥 BOTÕES INVISÍVEIS
  overlayMedalhas: {
    position: 'absolute',
    left: '25%',
    right: '25%',
    bottom: '5%',
    height: '20%',
  },

  overlayShare: {
    position: 'absolute',
    right: '5%',
    bottom: '5%',
    width: '35%',
    height: '25%',
  },

  configButton: {
    backgroundColor: '#666',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },

  configText: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  deleteButton: {
    backgroundColor: '#E53935',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  deleteText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});