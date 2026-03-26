import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Animated, Text, TextInput, View } from 'react-native';
import { styles } from '../screens/login/login.styles'; // Reutilizando seus estilos

interface Props {
  label: string | React.ReactNode;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  iconName: keyof typeof Ionicons.glyphMap;
  focusAnim: Animated.Value;
  errorAnim: Animated.Value;
  temErro: boolean;
  secureTextEntry?: boolean;
  animateFocus: (value: Animated.Value, toValue: number) => void;
}

export const InputAnimado = ({ 
  label, placeholder, value, onChangeText, iconName, 
  focusAnim, errorAnim, temErro, secureTextEntry, animateFocus 
}: Props) => {
  
  const opacity = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const bgNormal = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#eeeeee', '#d1d1d1'],
  });

  const bgErro = errorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#eeeeee', '#fcc5c5'],
  });

  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={styles.label}>{label}</Text>
      <Animated.View style={[styles.inputContainer, { backgroundColor: temErro ? bgErro : bgNormal }]}>
        <Ionicons name={iconName} size={20} color="#000" style={styles.inputIcon} />
        <Animated.Text style={[styles.customPlaceholder, { opacity }]}>
          {placeholder}
        </Animated.Text>
        <TextInput 
          style={styles.input}
          onFocus={() => animateFocus(focusAnim, 1)}
          onBlur={() => value === "" && animateFocus(focusAnim, 0)}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
      </Animated.View>
    </View>
  );
};