import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import YoutubePlayer from 'react-native-youtube-iframe';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useQuiz } from '../../hooks/useQuiz';

const { width } = Dimensions.get('window');

const SINAIS_BASE = [
  { label: 'Filha', videoId: 'FrJLTByoeiM' },
  { label: 'Filho', videoId: '8DVD6FkRU7s' },
  { label: 'Pai', videoId: '94hJU7keujI' },
  { label: 'Mãe', videoId: 'IljftNTMgqU' }
];

export default function Atividade1Screen() {
    const router = useRouter();
    const {
        currentItem,
        currentStep,
        options,
        selectedOption,
        isAnswered,
        isFinished,
        score,
        totalQuestions,
        progress,
        checkAnswer,
        nextStep,
        isCorrect
    } = useQuiz(SINAIS_BASE);

    const percent = totalQuestions ? (score / totalQuestions) * 100 : 0;

    // TELA DE RESULTADO FINAL
    if (isFinished) {
        return (
        <SafeAreaProvider style={styles.resultScreen}>
            <View style={styles.resultContainer}>
            <MaterialIcons name="stars" size={100} color="#FFD700" />
            
            <Text style={styles.resultTitle}>Atividade Concluída!</Text>
            
            <View style={styles.scoreBox}>
                <Text style={styles.scoreText}>Sua pontuação:</Text>
                <Text style={styles.scoreNumber}>{score} / {totalQuestions}</Text>
            </View>

            <Text style={styles.resultMessage}>
                {score === totalQuestions 
                ? "Incrível! Você dominou todos os sinais! 🏆"
                : percent <= 50
                ? "Não desanime! Revise os sinais e tente novamente!"
                : "Muito bem! Continue praticando para alcançar a nota máxima! 💪"}
            </Text>

            <TouchableOpacity 
                style={styles.finishBtn} 
                onPress={() => router.replace('/unidade8/familia')}
            >
                <Text style={styles.finishBtnText}>VOLTAR PARA A UNIDADE</Text>
                <Ionicons name="home" size={20} color="#fff" style={{marginLeft: 10}} />
            </TouchableOpacity>
            </View>
        </SafeAreaProvider>
        );
    }

    return (
        <SafeAreaProvider style={styles.screen}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.push('/unidade8/familia')}>
            <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Atividade 1</Text>
            <Text style={styles.stepText}>{currentStep + 1} / {SINAIS_BASE.length}</Text>
        </View>

        <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>

        <View style={styles.content}>
            <Text style={styles.pergunta}>Qual é este sinal?</Text>

            <View style={styles.mediaBox}>
                <View style={{ width: '100%', aspectRatio: 16 / 9 }}>
                    <YoutubePlayer
                    key={`yt-${SINAIS_BASE[currentStep].videoId}`} 
                    height={width * 0.6} 
                    play={true}
                    videoId={SINAIS_BASE[currentStep].videoId}
                    />
                </View>
            </View>
            <View style={styles.optionsContainer}>
            {options.map((opcao, index) => {
                const isThisCorrect = isAnswered && opcao === currentItem.label;
                const isThisWrong = isAnswered && selectedOption === opcao && opcao !== currentItem.label;

                return (
                <TouchableOpacity
                    key={index}
                    style={[
                    styles.optionBtn,
                    isThisCorrect && styles.correctOption,
                    isThisWrong && styles.wrongOption,
                    selectedOption === opcao && !isAnswered && styles.selectedOption
                    ]}
                    onPress={() => checkAnswer(opcao)}
                    disabled={isAnswered}
                >
                    <Text style={[styles.optionText, (isThisCorrect || isThisWrong) && { color: '#fff' }]}>
                    {opcao}
                    </Text>
                </TouchableOpacity>
                );
            })}
            </View>

            {isAnswered && (
            <TouchableOpacity style={styles.nextBtn} onPress={nextStep}>
                <Text style={styles.nextBtnText}>
                {isCorrect ? "ACERTOU! PRÓXIMO" : "OPS! PRÓXIMO"}
                </Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
            )}
        </View>
        </SafeAreaProvider>
    );
}

const PURPLE = '#6A04D1';

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: '#F8F9FA' },
    header: {
        height: 60,
        backgroundColor: PURPLE,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        justifyContent: 'space-between'
    },
    headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    stepText: { color: '#fff', fontWeight: '600' },
    back: { padding: 4 },
    progressTrack: { height: 6, backgroundColor: '#E0E0E0', width: '100%' },
    progressFill: { height: '100%', backgroundColor: '#FFD700' }, // Amarelo para destacar do roxo
    content: { flex: 1, padding: 20, alignItems: 'center' },
    pergunta: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 20 },
    mediaBox: {
        width: '100%',
        aspectRatio: 16 / 9,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: PURPLE,
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
    optionsContainer: { width: '100%', marginTop: 30 },
    optionBtn: {
        backgroundColor: '#fff',
        padding: 18,
        borderRadius: 12,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#E0E0E0'
    },
    selectedOption: { borderColor: PURPLE },
    correctOption: { backgroundColor: '#2E7D32', borderColor: '#2E7D32' },
    wrongOption: { backgroundColor: '#D32F2F', borderColor: '#D32F2F' },
    optionText: { fontSize: 18, fontWeight: '600', color: '#444' },
    nextBtn: {
        marginTop: 10,
        backgroundColor: PURPLE,
        width: '100%',
        padding: 16,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    nextBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginRight: 8 },
    resultScreen: {
        flex: 1,
        backgroundColor: PURPLE, // Fundo roxo para celebrar
        justifyContent: 'center',
        alignItems: 'center',
    },
    resultContainer: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 25,
        padding: 30,
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 6.27,
    },
    resultTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 15,
    },
    scoreBox: {
        marginVertical: 20,
        alignItems: 'center',
    },
    scoreText: {
        fontSize: 16,
        color: '#666',
    },
    scoreNumber: {
        fontSize: 48,
        fontWeight: '900',
        color: PURPLE,
    },
    resultMessage: {
        textAlign: 'center',
        fontSize: 16,
        color: '#444',
        marginBottom: 30,
        lineHeight: 22,
    },
    finishBtn: {
        backgroundColor: PURPLE,
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 15,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
    },
    finishBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});