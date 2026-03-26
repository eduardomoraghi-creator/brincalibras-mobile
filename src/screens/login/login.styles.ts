import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Formatação geral da página
  container: { flex: 1, backgroundColor: '#fff', padding: 40, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  socialContainer: { borderWidth: 1, borderColor: '#ddd', borderRadius: 15, padding: 20, alignItems: 'center' },
  socialText: { color: '#aaa', marginBottom: 15, fontWeight: '600' },
  iconRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 30 },
  line: { flex: 1, height: 1, backgroundColor: '#ddd' },
  orText: { marginHorizontal: 10, color: '#aaa' },
  inputSection: { width: '100%' },
  label: { fontWeight: 'bold', marginBottom: 5 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#eee', borderRadius: 15, marginBottom: 20, paddingHorizontal: 15 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, height: 50, backgroundColor: 'transparent' },
  button: { backgroundColor: '#000', borderRadius: 15, height: 55, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  footerText: { textAlign: 'center', marginTop: 15, color: '#333' },
  link: { color: '#00aeef', fontWeight: 'bold', textDecorationLine: 'underline' },
  customPlaceholder: { position: 'absolute', left: 45, color: '#aaa', zIndex: -1},
  
  // Caixas e diálogos de erro
  errorBox: { backgroundColor: '#fcc5c5', borderWidth: 2, borderColor: '#ff3232', padding: 10, marginBottom: 20, alignItems: 'center', justifyContent: 'center' },
  errorText: { color: '#d32f2f', fontWeight: 'bold', textAlign: 'center' },
  msgErro: { color: 'red', fontSize: 12, marginBottom: 6, marginLeft: 10 },
  labelErro: { flexDirection: 'row', alignItems: 'flex-end' },
  
  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  successCard: { width: '80%', backgroundColor: '#fff', borderRadius: 20, padding: 25, alignItems: 'center', elevation: 10 /*Sombra no Android */, shadowColor: '#000', /*Sombra no IOS */ shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4 },
  successTitle: { fontSize: 22, fontWeight: 'bold',marginTop: 15, color: '#333' },
  successMessage: { fontSize: 16, color: '#666', textAlign: 'center', marginVertical: 15 },
  successButton: { backgroundColor: '#000', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 10, marginTop: 10 },
  successButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});