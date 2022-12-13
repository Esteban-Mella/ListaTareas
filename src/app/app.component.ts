import { Component } from '@angular/core';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { DatabaseService } from './services/database.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private screenOrientation: ScreenOrientation,private database: DatabaseService) {

    this.database.createDataBase();
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    
  }
}
