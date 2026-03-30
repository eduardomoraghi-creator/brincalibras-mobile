// components/InputAnimado.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Animated, Text, TextInput, View, StyleSheet } from 'react-native';

interface Props {
  label: string | React.ReactNode;
  placeholder?: string;
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
  label,
  placeholder = '',
  value,
  onChangeText,
  iconName,
  focusAnim,
  errorAnim,
  temErro,
  secureTextEntry,
  animateFocus
}: Props) => {

  const opacity = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: value ? [0, 0] : [1, 0],
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

      {typeof label === 'string' ? (
        <Text style={styles.label}>{label}</Text>
      ) : (
        label
      )}

      <Animated.View
        style={[
          styles.inputContainer,
          { backgroundColor: temErro ? bgErro : bgNormal }
        ]}
      >
        <Ionicons
          name={iconName}
          size={20}
          color={temErro ? '#d32f2f' : '#555'}
          style={styles.inputIcon}
        />

        {placeholder ? (
          <Animated.Text style={[styles.placeholder, { opacity }]}>
            {placeholder}
          </Animated.Text>
        ) : null}

        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          onFocus={() => animateFocus(focusAnim, 1)}
          onBlur={() => value === '' && animateFocus(focusAnim, 0)}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    marginBottom: 5
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50
  },

  inputIcon: {
    marginRight: 10
  },

  input: {
    flex: 1,
    height: '100%',
    backgroundColor: 'transparent'
  },

  placeholder: {
    position: 'absolute',
    left: 45,
    color: '#aaa'
  }
});