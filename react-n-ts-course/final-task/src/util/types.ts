import { SESSIONS } from "../dummy-sessions";

export type Session = typeof SESSIONS[0];
export type ModalRef = {
    open: () => void
}