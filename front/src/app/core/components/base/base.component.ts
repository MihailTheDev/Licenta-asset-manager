import { Component, OnDestroy, OnInit } from '@angular/core';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnDestroy {
  private subscription$: Subscription = new Subscription;

  set subscription(sub: Subscription) {
    this.subscription$.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }


}
