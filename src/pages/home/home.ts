import { Component, ViewChild } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('file') file;

  constructor(
    // private http: HttpClient
  ) {}

  uploadImage() {
    this.file.upload();
  }

  setImage(image) {
    console.dir(image);
  }

  // onFileChange(event) {
  //   if (event.target.files && event.target.files.length > 0) {
  //     let file = event.target.files[0];
  //     let input = new FormData();
  //     input.append('image', file);

  //     this.http.post('https://upload-api.geekity.com/upload.php', input)
  //       .toPromise()
  //       .then((res) => {
  //         console.dir(res);
  //       })
  //       .catch((err) => {
  //         console.dir(err);
  //       });
  //   }
  // }

}
