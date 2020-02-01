import React from "react";
import { Picker, EmojiData } from "emoji-mart/dist-modern/index.js";

import "emoji-mart/css/emoji-mart.css";

type EmojiNativePicker = EmojiData & {
  native: string;
};

interface EmojiPickerProps {
  onSelected: (emoji: string) => void;
}

const EmojiPicker: React.FunctionComponent<EmojiPickerProps> = ({
  onSelected
}) => {
  return (
    <Picker
      set="apple"
      onSelect={emoji => onSelected((emoji as EmojiNativePicker).native)}
    />
  );
};

export { EmojiPicker };
