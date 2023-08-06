import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Language } from "@/app/i18n/i18n";
import { Button, Stack } from "@mui/material";

const getSx = (selected: boolean) =>
  selected ? { color: "secondary.main" } : { color: "text.primary" };

export default function ChooseLanguage() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState<Language>(i18n.language as Language);

  let changeLanguage = (language: Language) => {
    switch (language) {
      case Language.FR:
        setLang(Language.FR);
        i18n.changeLanguage(Language.FR);
        break;
      case Language.EN:
      default:
        setLang(Language.EN);
        i18n.changeLanguage(Language.EN);
        break;
    }
  };

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "center",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      <Button
        onClick={() => changeLanguage(Language.EN)}
        sx={getSx(lang === Language.EN)}
      >
        English
      </Button>
      <span>|</span>
      <Button
        onClick={() => changeLanguage(Language.FR)}
        sx={getSx(lang === Language.FR)}
      >
        Français
      </Button>
    </Stack>
  );
}
