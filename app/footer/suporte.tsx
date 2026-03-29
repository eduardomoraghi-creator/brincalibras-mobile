import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// 🔥 HOOK
import { useSuporte } from '../../hooks/useSuporte';

export default function SuporteScreen() {
  const router = useRouter();
  const {
    email,
    darkMode,
    abrirWhatsApp,
    ligar,
    enviarEmail,
    perguntasVisiveis,
    mostrarMais,
    setMostrarMais,
    perguntaSelecionada,
    abrirPergunta,
    voltarFAQ,
    busca,
    setBusca,
    navegarPorBusca
  } = useSuporte();

  const theme = darkMode ? stylesDark : stylesLight;

  // Função segura para voltar
  const handleVoltar = () => {
    try {
      router.back();
    } catch {
      router.push('/footer/home'); // rota segura se não houver histórico
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
      {/* 🔥 HEADER PADRÃO */}
      <View style={[styles.header, { backgroundColor: theme.header }]}>
        <TouchableOpacity onPress={handleVoltar}>
          <Ionicons name="arrow-back" size={26} color={theme.text} />
        </TouchableOpacity>

        <Text style={[styles.title, { color: theme.text }]}>Suporte</Text>

        <View style={{ width: 26 }} />
      </View>

      {/* 🔥 BUSCA */}
      <View style={[styles.searchBox, { backgroundColor: theme.search }]}>
        <Ionicons name="search" size={20} color="#8E8E8E" />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Ex: perfil, jogos, atividades..."
          placeholderTextColor="#8E8E8E"
          value={busca}
          onChangeText={setBusca}
          onSubmitEditing={navegarPorBusca}
          returnKeyType="search"
        />
      </View>

      {perguntaSelecionada ? (
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.primary }]}>
            {perguntaSelecionada.pergunta}
          </Text>
          <Text style={[styles.resposta, { color: theme.primary }]}>
            {perguntaSelecionada.resposta}
          </Text>
          <TouchableOpacity onPress={voltarFAQ}>
            <Text style={[styles.verMais, { color: theme.primary }]}>
              Voltar
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={[styles.subTitle, { color: theme.text }]}>
            Fale com um dos nossos analistas:
          </Text>

          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.contatoBtn, { backgroundColor: theme.button }]}
              onPress={abrirWhatsApp}
            >
              <FontAwesome name="whatsapp" size={18} color={theme.icon} />
              <Text style={[styles.contatoText, { color: theme.icon }]}>
                (11) 11111-1111
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.contatoBtn, { backgroundColor: theme.button }]}
              onPress={ligar}
            >
              <MaterialIcons name="phone" size={18} color={theme.icon} />
              <Text style={[styles.contatoText, { color: theme.icon }]}>
                (11) 11111-1111
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.contatoBtn, styles.emailBtn, { backgroundColor: theme.button }]}
            onPress={enviarEmail}
          >
            <MaterialIcons name="email" size={18} color={theme.icon} />
            <Text style={[styles.contatoText, { color: theme.icon }]}>
              {email}
            </Text>
          </TouchableOpacity>

          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <Text style={[styles.cardTitle, { color: theme.primary }]}>
              Perguntas frequentes
            </Text>

            {perguntasVisiveis.map((item, index) => (
              <View key={index}>
                <TouchableOpacity onPress={() => abrirPergunta(item)}>
                  <Text style={[styles.item, { color: theme.primary }]}>
                    {item.pergunta}
                  </Text>
                </TouchableOpacity>
                <View style={[styles.divider, { backgroundColor: theme.primary }]} />
              </View>
            ))}

            {!mostrarMais && (
              <TouchableOpacity onPress={() => setMostrarMais(true)}>
                <Text style={[styles.verMais, { color: theme.primary }]}>
                  Ver mais...
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
}

/* 🔥 TEMAS */
const stylesLight = {
  background: '#FFFFFF',
  header: '#3A8FB7',
  search: '#E6E6E6',
  text: '#000000',
  button: '#000',
  icon: '#FFF',
  card: '#FFF',
  primary: '#3A8FB7'
};

const stylesDark = {
  background: '#2C2C2C',
  header: '#3A8FB7',
  search: '#555',
  text: '#FFF',
  button: '#3A8FB7',
  icon: '#FFF',
  card: '#444',
  primary: '#FFF'
};

/* 🔥 ESTILOS */
const styles = StyleSheet.create({
  container: { flexGrow: 1 },
  header: {
    paddingTop: 55,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: { fontSize: 22, fontWeight: 'bold' },
  searchBox: {
    margin: 20,
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchInput: { marginLeft: 10, flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 40 },
  subTitle: { textAlign: 'center', marginBottom: 15, fontWeight: '600' },
  row: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginBottom: 10 },
  contatoBtn: { flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 25, gap: 8 },
  contatoText: { fontSize: 13 },
  emailBtn: { alignSelf: 'center', marginBottom: 20 },
  card: { borderRadius: 20, padding: 15, marginBottom: 15 },
  cardTitle: { textAlign: 'center', marginBottom: 10, fontWeight: 'bold' },
  item: { textAlign: 'center', paddingVertical: 10 },
  resposta: { textAlign: 'center', marginVertical: 15 },
  divider: { height: 1, marginHorizontal: 10 },
  verMais: { textAlign: 'center', marginTop: 10, fontWeight: 'bold' }
});