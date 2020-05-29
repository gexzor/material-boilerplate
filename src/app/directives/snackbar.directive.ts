import { Directive, HostListener, Input } from '@angular/core';
import { SnackbarColor, SnackbarService } from '../services/snackbar.service';

@Directive({ selector: '[appSnackMessage]' })

export class SnackbarDirective {

    public snackbarColor: typeof SnackbarColor = SnackbarColor;

    @Input() public appSnackMessage: string;
    @Input() public appSnackColor: SnackbarColor = SnackbarColor.info;

    constructor(private snackService: SnackbarService) { }

    /**
     * Displays a notification message with the message and color input.
     */
    @HostListener('click') public snackClick(): void {
        this.snackService.displaySnack(this.appSnackMessage, this.appSnackColor);
    }
}
