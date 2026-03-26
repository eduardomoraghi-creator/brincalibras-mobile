import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
  useColorScheme
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter } from 'expo-router';

export default function SuporteScreen() {

  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const router = useRouter();
  const systemTheme = useColorScheme();

  const isDark = darkMode || systemTheme === 'dark';

  const enviar = async () => {
    setErro('');

    if (!mensagem.trim()) {
      setErro('Digite uma mensagem');
      return;
    }

    try {
      await axios.post('https://brincalibras-api.onrender.com/suporte', {
        mensagem,
        email: 'usuario@email.com'
      });

      Alert.alert('Sucesso', 'Mensagem enviada!');
      setMensagem('');

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível enviar');
      console.log(error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#f2f2f2' }]}>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Suporte</Text>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </View>

        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput placeholder="Pesquisar..." style={styles.searchInput} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>

        <Text style={styles.subTitle}>
          Fale com um dos nossos analistas:
        </Text>

        <View style={styles.row}>
          <TouchableOpacity style={styles.contatoBtn}>
            <FontAwesome name="whatsapp" size={18} color="#fff" />
            <Text style={styles.contatoText}>(11) 11111-1111</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contatoBtn}>
            <MaterialIcons name="phone" size={18} color="#fff" />
            <Text style={styles.contatoText}>(11) 11111-1111</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.contatoBtn, styles.emailBtn]}>
          <MaterialIcons name="email" size={18} color="#fff" />
          <Text style={styles.contatoText}>sac@brincalibras.com.br</Text>
        </TouchableOpacity>

        {/* FAQ */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Perguntas frequentes</Text>

          <Text style={styles.item}>Como compartilhar o meu progresso?</Text>
          <View style={styles.divider} />

          <Text style={styles.item}>É possível imprimir as minhas medalhas?</Text>
          <View style={styles.divider} />

          <Text style={styles.item}>
            Como gerar um relatório das minhas lições diárias?
          </Text>

          <TouchableOpacity>
            <Text style={styles.verMais}>Ver mais...</Text>
          </TouchableOpacity>
        </View>

        {/* FORM */}
        <Text style={styles.label}>Descreva seu problema</Text>

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        <TextInput
          multiline
          value={mensagem}
          onChangeText={setMensagem}
          placeholder="Digite aqui..."
          style={styles.textArea}
        />

        <TouchableOpacity onPress={enviar} style={styles.botao}>
          <Text style={styles.botaoTexto}>Enviar</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* 🔻 MENU INFERIOR */}
      <View style={styles.bottomMenu}>

        <TouchableOpacity onPress={() => router.push('/perfil')}>
          <Ionicons name="person" size={28} color="#3A8FB7" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/home')}>
          <MaterialIcons name="sort-by-alpha" size={28} color="#3A8FB7" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/home')}>
          <Ionicons name="home" size={28} color="#3A8FB7" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/home')}>
          <Ionicons name="help-circle" size={28} color="#3A8FB7" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setDarkMode(!darkMode)}>
          <Ionicons name={isDark ? 'sunny' : 'moon'} size={28} color="#3A8FB7" />
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1
  },

  header: {
    backgroundColor: '#3A8FB7',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },

  searchBox: {
    marginTop: 15,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },

  searchInput: {
    marginLeft: 10,
    flex: 1,
    height: 40
  },

  content: {
    padding: 20,
    paddingBottom: 100
  },

  subTitle: {
    textAlign: 'center',
    marginBottom: 10
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },

  contatoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#666',
    padding: 10,
    borderRadius: 20,
    gap: 8
  },

  contatoText: {
    color: '#fff'
  },

  emailBtn: {
    alignSelf: 'center',
    marginBottom: 20
  },

  card: {
    backgroundColor: '#666',
    borderRadius: 15,
    padding: 15
  },

  cardTitle: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold'
  },

  item: {
    color: '#fff',
    paddingVertical: 8,
    textAlign: 'center'
  },

  divider: {
    height: 1,
    backgroundColor: '#aaa'
  },

  verMais: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold'
  },

  label: {
    marginTop: 25,
    marginBottom: 5
  },

  erro: {
    color: 'red'
  },

  textArea: {
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 12,
    height: 120,
    textAlignVertical: 'top'
  },

  botao: {
    backgroundColor: '#000',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15
  },

  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold'
  },

  bottomMenu: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd'
  }

});