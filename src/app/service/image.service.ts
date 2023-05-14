import { Injectable } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  url: string = "";

  constructor(private storage: Storage) { }

  public uploadImage($event: any, name: string) {
    const file = $event.target.files[0]
    const imgRef = ref(this.storage, `imagen/` + name)
    uploadBytes(imgRef, file)
      .then(response => { this.getImage() })
      .catch(error => console.log(error))
  }

  getImage() {
    const imagesRef = ref(this.storage, 'imagen')
    listAll(imagesRef)
      .then(async response => {
        for (let item of response.items) {
          this.url = await getDownloadURL(item);
          console.log("a URL es:L " + this.url)
        }
      })
      .catch(error => console.log(error))
  }
}

