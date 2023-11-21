export interface ValidationInterface {
    value: string | any;
    error: boolean;
    errorMessage: string;
    validator?: RegExp;
    required?: boolean;
}
