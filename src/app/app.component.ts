import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    public sidenavOpened: boolean = true;

    constructor(public breakpointObserver: BreakpointObserver) {
    }

    public ngOnInit(): void {
        this.breakpointObserver
            .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
            .subscribe((state: BreakpointState) => {
                state.matches ? this.sidenavOpened = false : this.sidenavOpened = true;
            });
    }
}
