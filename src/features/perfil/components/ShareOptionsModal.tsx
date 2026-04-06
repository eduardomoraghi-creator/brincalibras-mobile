import React from "react";
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onWhatsapp: () => void | Promise<void>;
  onEmail: () => void | Promise<void>;
  onSms: () => void | Promise<void>;
  onLinkedin: () => void | Promise<void>;
};

export function ShareOptionsModal({
  visible,
  onClose,
  onWhatsapp,
  onEmail,
  onSms,
  onLinkedin,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.shareModalBackdrop} onPress={onClose}>
        <Pressable style={styles.shareModalCenter} onPress={() => {}}>
          <View style={styles.shareModalCard}>
            <Text style={styles.shareModalTitle}>Compartilhar convite</Text>

            <TouchableOpacity
              style={styles.shareOptionButton}
              onPress={onWhatsapp}
              activeOpacity={0.85}
            >
              <Text style={styles.shareOptionText}>WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.shareOptionButton}
              onPress={onEmail}
              activeOpacity={0.85}
            >
              <Text style={styles.shareOptionText}>E-mail</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.shareOptionButton}
              onPress={onSms}
              activeOpacity={0.85}
            >
              <Text style={styles.shareOptionText}>SMS</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.shareOptionButton}
              onPress={onLinkedin}
              activeOpacity={0.85}
            >
              <Text style={styles.shareOptionText}>LinkedIn</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  shareModalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.28)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  shareModalCenter: {
    width: "100%",
    alignItems: "center",
  },

  shareModalCard: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  shareModalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#000000",
    marginBottom: 14,
    textAlign: "center",
  },

  shareOptionButton: {
    minHeight: 46,
    borderRadius: 12,
    backgroundColor: "#F3F3F3",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 16,
  },

  shareOptionText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000000",
  },
});