export interface ModalInterface {
    is_open: boolean;
    on_hide: () => void;
    message: string;
    type: "WARNING" | "ERROR" | "SUCCESS" | "INFO",
    action?: () => void
}