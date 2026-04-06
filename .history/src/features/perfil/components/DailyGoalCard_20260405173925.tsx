import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { PerfilTheme } from "../../../../app/global/perfil";

const fotoUsuarioImg = require("../../../../assets/images/perfil/foto-usuario.png");

type Props = {
  theme: PerfilTheme;
  fotoUsuario: string | null;
  onPress: () => void;
};

export function ProfilePhotoCard({ theme, fotoUsuario, onPress }: Props) {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.touch}>
        <Image
          source={fotoUsuario ? { uri: fotoUsuario } : fotoUsuarioImg}
          style={[styles.avatarImage, { borderColor: theme.border }]}
          resizeMode="cover"
        />
        <View style={[styles.editBadge, { backgroundColor: theme.primary }]}>
          <Ionicons name="camera-outline" size={16} color="#FFFFFF" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    marginBottom: 20,
  },

  touch: {
    position: "relative",
  },

  avatarImage: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 2,
  },

  editBadge: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
});