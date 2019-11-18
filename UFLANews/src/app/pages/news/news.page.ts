import { Component, OnInit } from '@angular/core';
import { BoletimModel } from 'src/app/models/boletins.model';
import { BoletinsService } from 'src/app/services/Boletins.service';
//import { LikesPipe } from 'src/app/pipes/likes.pipe';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  lstBoletins: BoletimModel[];

  constructor(public BoletinsService: BoletinsService) { }

  async ngOnInit() {
    try {
    this.lstBoletins = await this.BoletinsService.getAll();
console.log("ok: " + this.lstBoletins);
  } catch(error) {
    console.log("no: "+error);
  }
  }

  async doRefresh(event: any) {
    try {
      this.lstBoletins = await this.BoletinsService.getAll();
    } finally {
      event.target.complete();
    }
  }

  async updateListNews(event: any) {
    this.lstBoletins = await this.BoletinsService.searchByTitle(event.target.value);
  }
}
