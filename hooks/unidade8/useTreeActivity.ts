import { useState, useCallback, useEffect } from 'react';

const BANCO_SINAIS = [
    { id: '1', label: 'Filho', img: null },
    { id: '2', label: 'Pai', img: null },
    { id: '3', label: 'Mãe', img: null },
    { id: '4', label: 'Avô', img: null },
    { id: '5', label: 'Filha', img: null },
    { id: '6', label: 'Avó', img: null },
];

const FASES = [
    {
        posicoes: {
        top1: { label: 'Pai', hidden: false },
        top2: { label: 'Mãe', hidden: false },
        bottom: { label: 'Filho', hidden: true },
        },
        target: 'Filho',
        gabarito: 'A resposta correta é Filho!',
    },
    {
        posicoes: {
        top1: { label: 'Pai', hidden: true },
        top2: { label: 'Mãe', hidden: false },
        bottom: { label: 'Filho', hidden: false },
        },
        target: 'Pai',
        gabarito: 'A resposta correta é Pai!',
    },
    {
        posicoes: {
        top1: { label: 'Mãe', hidden: true },
        top2: { label: 'Pai', hidden: false },
        bottom: { label: 'Filho', hidden: false },
        },
        target: 'Mãe',
        gabarito: 'A resposta correta é Mãe!',
    },
    {
        posicoes: {
        top1: { label: 'Mãe', hidden: false },
        top2: { label: 'Pai', hidden: false },
        bottom: { label: 'Filha', hidden: true },
        },
        target: 'Filha',
        gabarito: 'A resposta correta é Filha!',
    },
    {
        posicoes: {
        top1: { label: 'Avô', hidden: true },
        top2: { label: 'Avó', hidden: false },
        bottom: { label: 'Pai', hidden: false },
        },
        target: 'Avô',
        gabarito: 'A resposta correta é Avô!',
    },
    {
        posicoes: {
        top1: { label: 'Avô', hidden: false },
        top2: { label: 'Avó', hidden: true },
        bottom: { label: 'Pai', hidden: false },
        },
        target: 'Avó',
        gabarito: 'A resposta correta é Avó!',
    },
];

export const useTreeActivity = () => {
    const [step, setStep] = useState(0);
    const [options, setOptions] = useState<any[]>([]);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const total = FASES.length;
    const currentFase = FASES[step];

    const generateOptions = useCallback(() => {
        if (!currentFase) {
        setOptions([]);
        return;
        }

        const correct = BANCO_SINAIS.find((s) => s.label === currentFase.target);
        const distractors = BANCO_SINAIS.filter((s) => s.label !== currentFase.target)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);

        // ensure we only add defined items
        const pool = [correct, ...distractors].filter(Boolean) as any[];
        setOptions(pool.sort(() => Math.random() - 0.5));
    }, [currentFase]);

    useEffect(() => {
        generateOptions();
        // reset per-step states
        setIsAnswered(false);
        setIsCorrect(false);
    }, [generateOptions, step]);

    const handleAnswer = (label: string) => {
        if (isAnswered || isFinished) return;
        const correct = label === currentFase.target;
        setIsCorrect(correct);
        setIsAnswered(true);
        if (correct) setScore((s) => s + 1);
    };

    const nextStep = () => {
        if (step < FASES.length - 1) {
        setStep((s) => s + 1);
        setIsAnswered(false);
        setIsCorrect(false);
        } else {
        // finalizar
        setIsFinished(true);
        }
    };

    const reset = () => {
        setStep(0);
        setOptions([]);
        setIsAnswered(false);
        setIsCorrect(false);
        setScore(0);
        setIsFinished(false);
        // regenerate options for first step
        setTimeout(() => generateOptions(), 0);
    };

    const progress = ((step + (isAnswered ? 1 : 0)) / Math.max(1, total)) * 100;

    return {
        step,
        currentFase,
        options,
        isAnswered,
        isCorrect,
        handleAnswer,
        nextStep,
        reset,
        total,
        totalQuestions: total,
        score,
        isFinished,
        progress,
    };
};