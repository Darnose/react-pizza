import React from "react";

export default interface IButton {
    type: 'submit' | 'reset' | 'button';
    text: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    styleType?: string;
}
