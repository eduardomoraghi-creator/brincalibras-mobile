import { useState, useEffect, useCallback } from 'react';

export interface QuizItem {
  label: string;
  videoId: string;
}

export const useQuiz = (data: QuizItem[]) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [options, setOptions] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [score, setScore] = useState(0);

    const currentItem = data[currentStep];

    const generateOptions = useCallback(() => {
        if (!currentItem) return;

        const correct = currentItem.label;
        // Pega as outras opções disponíveis para servir de distração
        const distractors = data
        .filter(item => item.label !== correct)
        .map(item => item.label)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);

        const shuffled = [correct, ...distractors].sort(() => Math.random() - 0.5);
        setOptions(shuffled);
        setSelectedOption(null);
        setIsAnswered(false);
    }, [currentStep, data]);

    useEffect(() => {
        generateOptions();
    }, [generateOptions]);

    const checkAnswer = (choice: string) => {
        if (isAnswered) return;
        setSelectedOption(choice);
        setIsAnswered(true);

        if (choice === currentItem.label) {
        setScore(prev => prev + 1);
        }
    };

    const nextStep = () => {
        if (currentStep < data.length - 1) {
        setCurrentStep(prev => prev + 1);
        } else {
        setIsFinished(true);
        }
    };

    return {
        currentItem,
        currentStep,
        options,
        selectedOption,
        isAnswered,
        isFinished,
        score,
        totalQuestions: data.length,
        progress: ((currentStep + 1) / data.length) * 100,
        checkAnswer,
        nextStep,
        isCorrect: selectedOption === currentItem?.label
    };
};