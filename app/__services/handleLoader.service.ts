import { BehaviorSubject } from "rxjs"


const subject = new BehaviorSubject<boolean>(false);

export const loaderInfo = subject.asObservable();

export const showLoader = () => subject.next(true)
export const hideLoader = () => subject.next(false)
