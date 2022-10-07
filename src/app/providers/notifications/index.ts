import { Injectable } from '@angular/core';
import { ToastrService } from "ngx-toastr";


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private toastr: ToastrService) { }

  public pop(type:('info'|'success'|'warning'|'error'), title:string, timeOut:number=5000){
    switch (type) {
      case 'info':
        this.toastr.info(
          `<span data-notify="icon" class="nc-icon nc-sun-fog-29"></span><span data-notify="message">${title}</span>`,
            "",
            {
              timeOut,
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-info alert-with-icon",
              positionClass: "toast-bottom-right"
            }
        );
      break;
      case 'success':
        this.toastr.success(
          `<span data-notify="icon" class="nc-icon nc-check-2"></span><span data-notify="message">${title}</span>`,
            "",
            {
              timeOut,
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-success alert-with-icon",
              positionClass: "toast-bottom-right"
            }
        );
      break;
      case 'warning':
        this.toastr.warning(
          `<span data-notify="icon" class="nc-icon  nc-alert-circle-i"></span><span data-notify="message">${title}</span>`,
            "",
            {
              timeOut,
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-warning alert-with-icon",
              positionClass: "toast-bottom-right"
            }
        );
      break;
      case 'error':
        this.toastr.error(
          `<span data-notify="icon" class="nc-icon nc-simple-remove"></span><span data-notify="message">${title}</span>`,
            "",
            {
              timeOut,
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-error alert-with-icon",
              positionClass: "toast-bottom-right"
            }
        );
      break;
    }

  }
}
