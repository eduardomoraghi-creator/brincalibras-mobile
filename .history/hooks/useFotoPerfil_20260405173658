import { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export const useFotoPerfil = () => {
  const [fotoUsuario, setFotoUsuario] = useState<string | null>(null);

  const abrirCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permissão necessária",
        "Precisamos de acesso à câmera para tirar sua foto.",
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled && result.assets?.length > 0) {
      setFotoUsuario(result.assets[0].uri);
    }
  };

  const abrirGaleria = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permissão necessária",
        "Precisamos de acesso à galeria para escolher sua foto.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.7,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled && result.assets?.length > 0) {
      setFotoUsuario(result.assets[0].uri);
    }
  };

  const removerFoto = () => {
    setFotoUsuario(null);
  };

  const onFotoUsuarioPress = () => {
    Alert.alert("Foto do usuário", "Escolha uma opção:", [
      { text: "Tirar foto", onPress: abrirCamera },
      { text: "Escolher da galeria", onPress: abrirGaleria },
      ...(fotoUsuario
        ? [
            {
              text: "Remover foto",
              onPress: removerFoto,
              style: "destructive" as const,
            },
          ]
        : []),
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  return {
    fotoUsuario,
    onFotoUsuarioPress,
  };
};