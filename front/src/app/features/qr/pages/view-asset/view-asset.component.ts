import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetService } from '@shared/services';

@Component({
  selector: 'app-view-asset',
  templateUrl: './view-asset.component.html',
  styleUrls: ['./view-asset.component.scss'],
})
export class ViewAssetComponent {
  // constructor(private route: ActivatedRoute, private assetService: AssetService) {}
  // ngOnInit() {
  //   this.route.params.subscribe((params) => {
  //     if (!params['id']) {
  //       return;
  //     }
  //   });
  // }
}
