import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Video, ResizeMode } from 'expo-av';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useSlides from '@/hooks/useSlides';

const { width } = Dimensions.get('window');

export default function IntroducaoScreen() {
  const router = useRouter();

  // IDs limpos e prontos para uso
  const slides = [
    { label: 'Filha', videoId: 'FrJLTByoeiM' },
    { label: 'Filho', videoId: '8DVD6FkRU7s' },
    { label: 'Pai', videoId: '94hJU7keujI' },
    { label: 'Mãe', videoId: 'IljftNTMgqU' }
  ];

  const { item: slideAtual, next, prev, length } = useSlides(slides, { circular: true });

  return (
    <SafeAreaProvider style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => router.replace('/atividades')}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <MaterialIcons name="people" size={28} color="#fff" />
          <Text style={styles.headerTitle}>Família</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.introText}>
          Reproduza os sinais até se acostumar com eles
        </Text>

        <View style={styles.mediaArea}>
          <View style={styles.mediaBox}>
            {slideAtual?.videoId ? (
              slideAtual.videoId.includes('http') ? (
                <Video
                  key={`native-${slideAtual.videoId}`} // Chave única força reload
                  source={{ uri: slideAtual.videoId }}
                  style={styles.video}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  shouldPlay
                  isLooping
                />
              ) : (
                <View style={{ width: '100%', aspectRatio: 16 / 9 }}>
                  <YoutubePlayer
                    key={`yt-${slideAtual.videoId}`} // Chave única força reload
                    height={width * 0.6} // Altura proporcional à largura
                    play={true}
                    videoId={slideAtual.videoId}
                  />
                </View>
              )
            ) : (
              <Text style={styles.mediaPlaceholder}>Carregando sinal...</Text>
            )}
          </View>

          <View style={styles.mediaControls}>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={prev}
              accessibilityLabel="Anterior"
            >
              <Ionicons name="chevron-back-circle" size={44} color={ORANGE} />
            </TouchableOpacity>

            <View style={styles.wordBox}>
              <Text style={styles.wordText}>{slideAtual?.label}</Text>
            </View>

            <TouchableOpacity
              style={styles.iconBtn}
              onPress={next}
              accessibilityLabel="Próximo"
            >
              <Ionicons name="chevron-forward-circle" size={44} color={ORANGE} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => alert('Próxima fase')}
          accessibilityRole="button"
        >
          <Text style={styles.actionText}>Continuar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const ORANGE = '#F57C00';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    height: 70,
    backgroundColor: ORANGE,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    left: 12,
    zIndex: 10,
    padding: 8,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  contentContainer: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 40,
  },
  introText: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
    color: '#444',
  },
  mediaArea: {
    alignItems: 'center',
  },
  mediaBox: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: ORANGE,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Importante para o borderRadius funcionar com vídeo
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  mediaPlaceholder: {
    color: '#fff',
    fontSize: 14,
  },
  mediaControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  iconBtn: {
    padding: 5,
  },
  wordBox: {
    flex: 1,
    marginHorizontal: 15,
    height: 60,
    borderRadius: 12,
    backgroundColor: ORANGE,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  wordText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  actionBtn: {
    marginTop: 30,
    backgroundColor: ORANGE,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: ORANGE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  video: {
    width: '100%',
    height: '100%',
  },
});