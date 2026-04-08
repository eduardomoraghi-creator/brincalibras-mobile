import { StyleSheet } from "react-native";
import { Colors } from "../constants/theme";

import { s, vs, ms } from 'react-native-size-matters';

/**
 * s (scale) -> Para larguras
 * vs (verticalScale) -> Para alturas 
 * ms (moderateScale) -> Para fontes e arredondamentos
 */

// Parâmetro unidadeColor para definir a cor primária da unidade (ex: roxo para família)
export const unidadeStyles = (unidadeColor: any) => StyleSheet.create({
    //Header
    header: {
        height: vs(70), 
        backgroundColor: unidadeColor,
        paddingHorizontal: s(16),
        justifyContent: "center",
    },
    back: {
        position: "absolute",
        left: 12,
        zIndex: 10,
        padding: 8,
    },
    headerIconWrapper: {
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    headerCenter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold"
    },
    headerSubtitle: {
        color: "rgba(255,255,255,0.88)",
        fontSize: 13,
        marginTop: 2,
        fontWeight: "500",
    },
    // Barra de Progresso
    progressCount: {
        color: unidadeColor,
        fontWeight: "700",
    },
    progressTrack: {
        width: "100%",
        height: 10,
        borderRadius: 10,
        backgroundColor: "#E0E0E0",
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        backgroundColor: unidadeColor,
        borderRadius: 10,
    },
    progressContainer: {
        width: '100%',
        marginTop: vs(15), 
        paddingHorizontal: s(10)
    },
    progressInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    progressText: {
        color: '#666',
        fontSize: 14,
        fontWeight: '500',
    },

    // Container
    screen: {
        flex: 1
    },
    content: {
        flex: 1,
        paddingHorizontal: s(10),
        paddingBottom: vs(30),
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 600, 
    },

    // Vídeo e Mídia
    mediaBox: {
        width: '100%',
        aspectRatio: 16 / 9,
        borderRadius: ms(15),
        borderWidth: 2,
        borderColor: unidadeColor,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },  

    // Pergutas e repostas
    pergunta: {
        fontSize: ms(18), 
        fontWeight: 'bold',
        color: '#333',
        marginTop: vs(10)
    },
    optionsContainer: {
        width: '100%',
        marginTop: vs(10),
        flexGrow: 1, 
        justifyContent: 'center'
    },
    optionBtn: {
        backgroundColor: '#fff',
        paddingVertical: vs(12), 
        paddingHorizontal: s(15),
        borderRadius: ms(12),
        marginBottom: vs(8),
        borderWidth: 2,
        borderColor: Colors.borderLight
    },
    selectedOption: {
        borderColor: unidadeColor
    },
    correctOption: {
        backgroundColor: '#E8F5E9',
        borderColor: Colors.green,
    },
    wrongOption: {
        backgroundColor: '#ff8a8a',
        borderColor: '#9e0000bb',
    },
    optionText: {
        fontSize: ms(16), 
        fontWeight: '600',
        color: '#444'
    },
    // Cards em linha
    optionCard: {
        width: ms(85, 0.8),
        height: ms(85, 0.8),
        backgroundColor: '#fff',
        borderRadius: ms(15),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.borderLight,
        elevation: 3
    },
    optionsRow: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        gap: 10
    },
    optionLabel: { 
        fontSize: ms(12, 0.6), 
        fontWeight: 'bold', 
        marginTop: 5, color: 
        unidadeColor 
    },

    // Botão para a próxima pergunta ou resultado
    nextBtn: {
        marginTop: vs(10),
        backgroundColor: unidadeColor,
        width: '100%',
        height: vs(50),
        paddingVertical: ms(12, 0.8),
        borderRadius: ms(12),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    nextBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 8
    },

    // Tela de resultado final
    alignResultContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resultContainer: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: ms(25),
        padding: vs(30),
        alignItems: 'center',
    },
    resultTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 15
    },
    scoreBox: {
        marginVertical: 20,
        alignItems: 'center'
    },
    scoreText: {
        fontSize: 16,
        color: '#666'
    },
    scoreNumber: {
        fontSize: 48,
        fontWeight: '900',
        color: unidadeColor
    },
    resultMessage: {
        textAlign: 'center',
        fontSize: 16,
        color: '#444',
        marginBottom: 30,
        lineHeight: 22
    },
    finishBtn: {
        backgroundColor: unidadeColor,
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 15,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center'
    },
    finishBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },

    //-----Exclusivo para aulas------

    //Texto explicação
    introText: {
        textAlign: 'center',
        marginBottom: vs(10),
        fontSize: 16,
        color: '#444',
    },

    // Caixa para palavras-chave (Avô, Avó, Pai, Mãe, Irmão, Irmã)
    wordBox: {
        flex: 1,
        marginHorizontal: 15,
        height: 60,
        borderRadius: 12,
        backgroundColor: unidadeColor,
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

    // Mensagem que aparece depois que o usuário completa a aula
    completedMessage: {
        textAlign: 'center',
        color: '#2E7D32',
        fontWeight: '700',
        fontSize: 15,
        marginTop: 15,
        backgroundColor: '#E8F5E9',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#C8E6C9',
    },

    // Botões de controle de mídia
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
    disabledBtn: {
        backgroundColor: '#BDBDBD',
        elevation: 0,
    },
    actionBtn: {
        width: '100%',
        marginTop: 30,
        backgroundColor: unidadeColor,
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 5,
    },
    actionText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },

    // ----- Exclusivo para desenhar ícones -----
    cardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    card: {
        width: 150,
        height: 150,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
        marginBottom: 15,
    },
    iconImage: {
        width: 150,
        height: 150,
    },
    cardText: {
        color: '#fff', 
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 3, 
        textAlign: 'center',
    },
    bgIconContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center', 
        padding: 10, 
    },
});