import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, Form } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna']

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );
    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
    // this.signupForm.setValue({
    //   'userData': {
    //     'username': 'Chantal',
    //     'email': 'Chantal@hotmail.sg'
    //   },
    //   'gender': 'female',
    //   'hobbies': []
    // });
    this.signupForm.patchValue({
      'userData': {
        'username': 'Jerry'
      },
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset({'gender': 'male'});
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray> this.signupForm.get('hobbies')).push(control);
  }

  // getControls() {
  //   return (<FormArray>this.signupForm.get('hobbies')).controls;
  // }
  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  forbiddenNames(control: FormControl) : {[s: string] : boolean} {  // TypeScript syntax to say: have a key-value pair where the key again
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {    // can be interpreted as a string (which is true for a key in an object
      return {'nameIsForbidden': true};                             // in general. More importantly, the value of that key-value pair,
    }                                                               // should be boolean.
    return null;
  }

  forbiddenEmails(control: FormControl) : Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
