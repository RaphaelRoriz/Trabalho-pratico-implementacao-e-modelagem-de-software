import { Component, OnInit } from '@angular/core';
import { PublicadorModel } from 'src/app/models/publicadores.model';
import { PublicadoresService } from 'src/app/services/publicadores.service';

@Component({
  selector: 'app-search-publisher',
  templateUrl: './search-publisher.page.html',
  styleUrls: ['./search-publisher.page.scss'],
})
export class SearchPublisherPage implements OnInit {

  lstPublicadores: PublicadorModel[];

  constructor(public PublicadoresService: PublicadoresService) { }

  async ngOnInit() {
    try {
    this.lstPublicadores = await this.PublicadoresService.getAll();
    debug: console.log("ok: " + this.lstPublicadores);
  } catch(error) {
    debug: console.log("not ok: " + error);
  }
}

  async doRefresh(event: any) {
    try {
      this.lstPublicadores = await this.PublicadoresService.getAll();
    } finally {
      event.target.complete();
    }
  }

  //async updatePublicadores(event: any) {
    //this.lstPublicadores = await this.PublicadoresService.searchByTitle(event.target.value);
  //}


}
