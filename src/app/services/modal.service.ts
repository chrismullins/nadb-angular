import { Component, TemplateRef, Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'demo-modal-service-static'
  //templateUrl: './service-template.html'
})

@Injectable()
export class ModalService {

  constructor(private modalService: BsModalService) {}
  modalRef: BsModalRef;
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
