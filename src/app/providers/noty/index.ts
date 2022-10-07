import { Injectable, OnDestroy } from '@angular/core';
import * as Noty from 'noty';
import { Subscription } from 'rxjs';
import dot from 'dot-object';

@Injectable({
  providedIn: 'root'
})
export class NotyService implements OnDestroy {

  private icons = {
    alert: 'far fa-bell',
    success: 'fas fa-check-circle',
    warning: 'fas fa-exclamation-triangle',
    error: 'fas fa-times-circle',
    info: 'fas fa-info-circle',
    information: 'fas fa-info-circle'
  };

  public listenerTranslate: Subscription;

  constructor() {
    Noty.setMaxVisible(10);
  }

  public pop(type: Noty.Type, title:string, timeout:number = 5000, closeWith: ("click"|"button")[]=['click', 'button']){
    const noty = new Noty({
      type,
      theme: 'mint',
      layout: 'bottomRight',
      text: `
          <div class="grid grid-cols-12 m-0 p-0">
            <div class="col-span-2 m-0 p-0 text-center">
              <em style="marign-left: -8px; font-size:16pt; margin-top:5px" class="${dot.pick(
                type,
                this.icons
              )}">
              </em>
            </div>
            <div class="col-span-10 mt-1 p-0">
                <span>${title}</span>
            </div>
          </div>`,
      closeWith,
      timeout,
      modal: false,
      killer: false,
      animation: {
        open: 'moderateSpeed fadeInRightNoty',
        close: 'moderateSpeed fadeOutDownNoty',
      },
    });
    noty.show();
  }

  public clear(){
    Noty.closeAll();
  }

  ngOnDestroy(): void {
    if(this.listenerTranslate){
      this.listenerTranslate.unsubscribe();
    }
  }

  noty_test(){
    new Noty({
      type: 'success',
      layout: 'topRight',
      text: 'Some notification text'
    }).show();
  }

}
