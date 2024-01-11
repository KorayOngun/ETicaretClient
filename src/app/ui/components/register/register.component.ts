import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { CreateUser } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToasterPosition, ToastrMessageType } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {
  frm: FormGroup;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastService: CustomToastrService, spinner: NgxSpinnerService) {
    super(spinner)
  }



  ngOnInit(): void {
    this.frm = this.formBuilder.group(
      {
        nameSurname: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
        userName: ["", [Validators.required, Validators.maxLength(250)]],
        email: ["", [Validators.required, Validators.maxLength(250), Validators.email]],
        password: ["", [Validators.required,]],
        passwordConfirm: ["", [Validators.required]]
      }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let sifre = group.get("password").value;
        let sifreTekrar = group.get("passwordConfirm").value;
        return sifre == sifreTekrar ? null : { notSame: true };
      }
    }
    )
  }

  get component() {
    return this.frm.controls;
  }

  submitted: boolean = false;
  async onSubmit(user: User) {
    this.submitted = true;
    debugger;
    if (this.frm.invalid) {
      return
    } else {
      const result: CreateUser = await this.userService.create(user);
      if (result.succeded) {
        this.toastService.message(result.message, "kullanıcı kaydı başarılı", {
          messageType: ToastrMessageType.Success,
          position: ToasterPosition.TopRight
        })
      } else {
        this.toastService.message(result.message, "hata", {
          messageType: ToastrMessageType.Error,
          position: ToasterPosition.TopRight
        })
      }
    }
  }
}
