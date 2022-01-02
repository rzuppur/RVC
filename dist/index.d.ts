import { Plugin } from "vue";
declare const useToast: () => (message: string) => void;
declare const useModalConfirm: () => (question: string, yesText?: string, noText?: string, description?: string) => Promise<boolean>;
declare const _default: Plugin;
export { _default as default, useToast, useModalConfirm };
