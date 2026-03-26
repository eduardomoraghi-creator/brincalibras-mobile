import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Animated } from 'react-native';

export const useLogin = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [erro, setErro] = useState({ email: false, senha: false });
    const [mensagens, setMensagens] = useState<any>({});
    const [erroGeral, setErroGeral] = useState('');

    const focusAnimEmail = useRef(new Animated.Value(0)).current;
    const focusAnimSenha = useRef(new Animated.Value(0)).current;
    const errorAnim = useRef(new Animated.Value(0)).current;

    const animateFocus = (value: Animated.Value, toValue: number) => {
        Animated.timing(value, {
            toValue,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const dispararErro = () => {
        Animated.sequence([
            Animated.timing(errorAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: false
            })
        ]).start();
    };

    const resetarErro = () => {
        Animated.timing(errorAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false
        }).start();

        setErro({ email: false, senha: false });
        setMensagens({});
        setErroGeral('');
    };

    const emailValido = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validarESubmeter = async () => {
        resetarErro();

        let temErro = false;
        const novoErro = { email: false, senha: false };
        const novasMensagens: any = {};

        // Validações front-end
        if (!email.trim()) {
            novoErro.email = true;
            novasMensagens.email = 'E-mail é obrigatório';
            temErro = true;
        } else if (!emailValido(email)) {
            novoErro.email = true;
            novasMensagens.email = 'Digite um e-mail válido';
            temErro = true;
        }

        if (!senha.trim()) {
            novoErro.senha = true;
            novasMensagens.senha = 'Senha é obrigatória';
            temErro = true;
        }

        setErro(novoErro);
        setMensagens(novasMensagens);

        if (temErro) {
            dispararErro();
            return;
        }

        try {
            const response = await fetch('https://brincalibras-api.onrender.com/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });

            const data = await response.json();

            // Erros de validação do back (ex: @NotBlank, @Email)
            if (response.status === 400) {
                const errosBack = {
                    email: !!data.fields?.email,
                    senha: !!data.fields?.senha
                };

                const mensagensBack = {
                    email: data.fields?.email,
                    senha: data.fields?.senha
                };

                setErro(errosBack);
                setMensagens(mensagensBack);
                dispararErro();
                return;
            }

            // Erro de autenticação
            if (response.status === 401) {
                setErroGeral(data.message || 'E-mail ou senha inválidos');
                dispararErro();
                return;
            }

            // Sucesso
            if (response.ok) {
                console.log('Login realizado com sucesso:', data);

                if (data.role === 'ADMIN') {
                    router.replace('/admin' as any);
                } else {
                    router.replace('/home' as any);
                }
            }

        } catch (e) {
            setErroGeral('Erro na conexão com o servidor');
            dispararErro();
            console.error('Erro no login', e);
        }
    };

    return {
        email, setEmail,
        senha, setSenha,
        erro,
        mensagens,
        erroGeral,
        validarESubmeter,
        focusAnimEmail, animateFocus,
        focusAnimSenha,
        errorAnim
    };
};