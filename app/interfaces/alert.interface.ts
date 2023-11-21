import {AlertColor} from "@mui/material";

export interface AlertInterface {
    type?: AlertColor | any,
    message: string;
    link?: string;
}