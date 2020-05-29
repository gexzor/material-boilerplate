import { SnackbarColor } from '../services/snackbar.service';
import { TodoStatus } from './Todo';

export interface StatusFlash {
    status?: TodoStatus;
    message?: string;
    color?: SnackbarColor;
}