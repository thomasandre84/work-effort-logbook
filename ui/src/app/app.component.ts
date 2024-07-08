import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { WorkComponent } from "./work/work.component";
import { WorkTimeComponent } from "./work-time/work-time.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, HeaderComponent, WorkComponent, WorkTimeComponent]
})
export class AppComponent {
}
