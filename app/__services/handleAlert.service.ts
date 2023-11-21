import { BehaviorSubject } from "rxjs"

export interface SnackbarInterface {
    isOpened: boolean;
    message: string;
    type: 'success' | 'info' | 'warning' | 'error' | any,
    timeOut?: number;
    link?: HTMLAnchorElement,
    action?: () => void;
};

const subject = new BehaviorSubject<Partial<SnackbarInterface>>({
    isOpened: false
});

export const snackBarinfo = subject.asObservable()

export const openSnackbar = (payload: Pick<SnackbarInterface, 'message' | 'type' | 'timeOut' | 'link' | 'action'>) => {
    subject.next({
        ...payload,
        isOpened: true,
    })
};

export const closeSnackbar = () => {
    subject.next({
        ...subject.getValue(),
        isOpened: false,
    })
}; 
