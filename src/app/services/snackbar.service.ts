import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

export enum SnackbarColor {
    primary = 'primary',
    warn = 'warn',
    success = 'success',
    info = 'info',
}

@Injectable({
    providedIn: 'root',
})
export class SnackbarService {

    constructor(private snackBar: MatSnackBar) { }

    /**
     * Displays a notification message with the message and color input.
     */
    public displaySnack(msg: string, color: SnackbarColor, duration?: number): void {
        this.snackBar.open(msg, undefined, {
            panelClass: ['snackbar-' + color],
            duration: duration || 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
        });
    }

}
