import { useMemo, useState } from "react";
import { Linking, Platform, Share } from "react-native";

export const useCompartilhamento = () => {
  const [shareModalVisible, setShareModalVisible] = useState(false);

  const mensagemCompartilhamento = useMemo(
    () =>
      "Venha aprender Libras comigo no BrincaLibras! Aprender junto com os amigos é muito mais divertido!",
    [],
  );

  const compartilharNativo = async () => {
    try {
      await Share.share({
        message: mensagemCompartilhamento,
      });
    } catch (error) {
      console.log("Erro ao compartilhar:", error);
    }
  };

  const compartilharWhatsapp = async () => {
    try {
      const url = `whatsapp://send?text=${encodeURIComponent(
        mensagemCompartilhamento,
      )}`;
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        await compartilharNativo();
      }
    } catch {
      await compartilharNativo();
    }
  };

  const compartilharEmail = async () => {
    try {
      const subject = "Convite para conhecer o BrincaLibras";
      const body = mensagemCompartilhamento;
      const url = `mailto:?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        await compartilharNativo();
      }
    } catch {
      await compartilharNativo();
    }
  };

  const compartilharSms = async () => {
    try {
      const separator = Platform.OS === "ios" ? "&" : "?";
      const url = `sms:${separator}body=${encodeURIComponent(
        mensagemCompartilhamento,
      )}`;
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        await compartilharNativo();
      }
    } catch {
      await compartilharNativo();
    }
  };

  const compartilharLinkedin = async () => {
    try {
      const texto = encodeURIComponent(mensagemCompartilhamento);
      const webUrl = `https://www.linkedin.com/sharing/share-offsite/?summary=${texto}`;
      const webSupported = await Linking.canOpenURL(webUrl);

      if (webSupported) {
        await Linking.openURL(webUrl);
      } else {
        await compartilharNativo();
      }
    } catch {
      await compartilharNativo();
    }
  };

  const abrirOpcoesCompartilhamento = () => {
    setShareModalVisible(true);
  };

  const fecharOpcoesCompartilhamento = () => {
    setShareModalVisible(false);
  };

  const onCompartilharWhatsapp = async () => {
    fecharOpcoesCompartilhamento();
    await compartilharWhatsapp();
  };

  const onCompartilharEmail = async () => {
    fecharOpcoesCompartilhamento();
    await compartilharEmail();
  };

  const onCompartilharSms = async () => {
    fecharOpcoesCompartilhamento();
    await compartilharSms();
  };

  const onCompartilharLinkedin = async () => {
    fecharOpcoesCompartilhamento();
    await compartilharLinkedin();
  };

  return {
    shareModalVisible,
    abrirOpcoesCompartilhamento,
    fecharOpcoesCompartilhamento,
    onCompartilharWhatsapp,
    onCompartilharEmail,
    onCompartilharSms,
    onCompartilharLinkedin,
  };
};