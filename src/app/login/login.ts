import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ TranslateModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = "";
  password = null;
}
