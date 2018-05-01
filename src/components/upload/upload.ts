import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { PersistService } from '../../services/persist.service';

@Component({
    selector: 'upload',
    templateUrl: 'upload.html'
})
export class UploadComponent {

    @ViewChild('file') file;
    @Output('path') path: EventEmitter<any>;

    constructor(
        public service: PersistService
    ) {
        this.path = new EventEmitter<any>();
    }

    upload() {
        let event = new MouseEvent('click', {bubbles: true});
        this.file.nativeElement.dispatchEvent(event);
    }

    onFileChange(event) {
        if (event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            let input = new FormData();
            input.append('image', file);

            this.service.setData('upload.php', input)
                .then((res) => {
                    this.path.emit(res);
                })
                .catch((err) => {
                    console.dir(err);
                });
        }
    }

}
