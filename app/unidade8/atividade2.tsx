import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TreeSlot } from '@/src/components/unidade8/treeSlot';
import { useTreeActivity } from '@/hooks/unidade8/useTreeActivity';

export default function Atividade2() {
    const router = useRouter();
    const { step, currentFase, options, isAnswered, isCorrect, handleAnswer, nextStep, reset, total, totalQuestions, score, isFinished, progress } = useTreeActivity();

    // Renderização da tela de resultado (aproveitando seu estilo)
    if (step === total - 1 && isAnswered && isCorrect) { /* Renderizar ResultScreen aqui */ }

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
        <View style={styles.screen}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/unidade8/familia')} style={styles.back}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Atividade 2 - Árvore Genealógica</Text>
                <Text style={styles.stepText}>{step + 1} / {total}</Text>
            </View>

            <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${((step + 1) / total) * 100}%` }]} />
            </View>

            <View style={styles.content}>
                <Text style={styles.pergunta}>Quem falta na árvore?</Text>

                {/* --- ÁREA DA ÁRVORE --- */}
                <View style={styles.treeContainer}>
                    <View style={styles.row}>
                        {/* Slot Superior 1 */}
                        <TreeSlot 
                            label={currentFase.posicoes.top1.label} 
                            isFilled={!currentFase.posicoes.top1.hidden || (isAnswered && isCorrect && currentFase.target === currentFase.posicoes.top1.label)}
                            isTarget={currentFase.posicoes.top1.hidden}
                        />
                        
                        {/* Slot Superior 2 */}
                        <TreeSlot 
                            label={currentFase.posicoes.top2.label} 
                            isFilled={!currentFase.posicoes.top2.hidden || (isAnswered && isCorrect && currentFase.target === currentFase.posicoes.top2.label)}
                            isTarget={currentFase.posicoes.top2.hidden}
                        />
                    </View>
                    
                    <View style={styles.connectorContainer}>
                        <View style={styles.horizontalLine} />
                        <View style={styles.verticalLine} />
                    </View>

                    <View style={styles.row}>
                        {/* Slot Inferior */}
                        <TreeSlot 
                            label={currentFase.posicoes.bottom.label} 
                            isFilled={!currentFase.posicoes.bottom.hidden || (isAnswered && isCorrect && currentFase.target === currentFase.posicoes.bottom.label)}
                            isTarget={currentFase.posicoes.bottom.hidden}
                        />
                    </View>
                </View>

                {/* --- ÁREA DE RESPOSTAS (Clicáveis) --- */} {/* Seria legal fazer arrastável no futuro */ }
                <View style={styles.optionsWrapper}>
                    <Text style={styles.hintText}>Selecione o sinal correto:</Text>
                    <View style={styles.optionsRow}>
                        {options.map((opt, i) => (
                            <TouchableOpacity 
                                key={i} 
                                style={[
                                    styles.optionCard,
                                    isAnswered && opt.label === currentFase.target && styles.correctCard,
                                    isAnswered && opt.label !== currentFase.target && styles.wrongCard
                                ]}
                                onPress={() => handleAnswer(opt.label)}
                                disabled={isAnswered}
                            >
                                <MaterialCommunityIcons name="hand-front-right" size={30} color={PURPLE} />
                                <Text style={styles.optionLabel}>{opt.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* GABARITO E BOTÃO PRÓXIMO */}
                {isAnswered && (
                    <View style={styles.feedbackArea}>
                        <View style={[styles.gabaritoBox, isCorrect ? styles.bgSuccess : styles.bgError]}>
                            <Text style={styles.gabaritoText}>
                                {isCorrect ? "Muito bem!" : "Não foi dessa vez..."}
                            </Text>
                            <Text style={styles.gabaritoSub}>{currentFase.gabarito}</Text>
                        </View>
                        
                        <TouchableOpacity style={styles.nextBtn} onPress={nextStep}>
                            <Text style={styles.nextBtnText}>CONTINUAR</Text>
                            <Ionicons name="arrow-forward" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}

const PURPLE = '#6A04D1';

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: '#F8F9FA' },
    header: { height: 70, backgroundColor: PURPLE, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, justifyContent: 'space-between' },
    headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    stepText: { color: '#fff', fontWeight: '600' },
    back: { padding: 4 },
    progressTrack: { height: 6, backgroundColor: '#E0E0E0', width: '100%' },
    progressFill: { height: '100%', backgroundColor: '#FFD700' },
    content: { flex: 1, padding: 20, alignItems: 'center' },
    pergunta: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 10 },
    
    // Estilos da Árvore
    treeContainer: { marginVertical: 30, alignItems: 'center', width: '100%' },
    row: { flexDirection: 'row', gap: 50, justifyContent: 'center' },
    connectorContainer: { alignItems: 'center', height: 40, width: '100%' },
    horizontalLine: { width: 50, height: 2, backgroundColor: '#CCC', top: -40 },
    verticalLine: { width: 2, height: 80, backgroundColor: '#CCC', top: -40 },

    // Opções
    optionsWrapper: { width: '100%', marginTop: 20 },
    hintText: { textAlign: 'center', color: '#666', marginBottom: 15, fontWeight: '600' },
    optionsRow: { flexDirection: 'row', justifyContent: 'center', gap: 10 },
    optionCard: { width: 90, height: 90, backgroundColor: '#fff', borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#E0E0E0', elevation: 3 },
    correctCard: { borderColor: '#2E7D32', backgroundColor: '#E8F5E9' },
    wrongCard: { borderColor: '#D32F2F', opacity: 0.6 },
    optionLabel: { fontSize: 12, fontWeight: 'bold', marginTop: 5, color: PURPLE },

    // Feedback
    feedbackArea: { width: '100%', marginTop: 20 },
    gabaritoBox: { padding: 15, borderRadius: 12, marginBottom: 15 },
    bgSuccess: { backgroundColor: '#2E7D32' },
    bgError: { backgroundColor: '#D32F2F' },
    gabaritoText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    gabaritoSub: { color: '#fff', fontSize: 14, marginTop: 4 },
    nextBtn: { backgroundColor: PURPLE, padding: 16, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    nextBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginRight: 8 },

    // Tela de resultado
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