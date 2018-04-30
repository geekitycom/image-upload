import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('file') file;

  constructor(
    private http: HttpClient
  ) {}

    upload() {
        let event = new MouseEvent('click', {bubbles: true});
        this.file.nativeElement.dispatchEvent(event);
    }

    onFileChange(event) {
        if (event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            let input = new FormData();
            input.append('image', file);

            this.http.post('/upload.php', input)
              .toPromise()
              .then((res) => {
                console.dir(res);
              })
              .catch((err) => {
                console.dir(err);
              });
        }
    }

}
