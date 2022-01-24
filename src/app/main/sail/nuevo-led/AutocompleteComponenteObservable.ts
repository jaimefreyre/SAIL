import {Component, NgModule, EventEmitter, ChangeDetectorRef} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {catchError, map, debounceTime, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

@Component({
    selector: 'select-autocomplete',
    template: `
        <label>Search with autocomplete in Github accounts</label>
        <ng-select [items]="items"
                    [multiple]="true"
                    [addTag]="true"
                   bindLabel="login"
                   placeholder="Find your Github account"
                   [typeahead]="typeahead"
                   [(ngModel)]="githubAccount">
            <ng-template ng-option-tmp let-item="item">
                <img [src]="item.avatar_url" width="20px" height="20px"> {{item.login}}
            </ng-template>
        </ng-select>
        <p>
            Selected github account:
            <span *ngIf="githubAccount">
                <img [src]="githubAccount.avatar_url" width="20px" height="20px"> {{githubAccount.login}}
            </span>
        </p>
    `
})
export class SelectAutocompleteComponent {

    githubAccount: any;
    items:any = [];
    typeahead = new EventEmitter<string>();

    constructor(private http: HttpClient, private cd: ChangeDetectorRef) {
        this.typeahead
            .pipe(
                debounceTime(200),
                switchMap(term => this.loadGithubUsers(term))
            )
            .subscribe(items => {
                this.items = items;
                this.cd.markForCheck();
            }, (err) => {
                console.log('error', err);
                this.items = [];
                this.cd.markForCheck();
            });
    }

    loadGithubUsers(term: string): Observable<any[]> {
        return this.http.get<any>(`https://api.github.com/search/users?q=${term}`).pipe(
            catchError(() => of(({items: []}))),
            map(rsp => rsp.items),
        );
    }
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule
  ],
  declarations: [ SelectAutocompleteComponent ],
  bootstrap: [ SelectAutocompleteComponent ]
})
export class AppModule {}