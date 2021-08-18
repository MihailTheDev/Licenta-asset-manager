import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RedirectService } from '@core/services/redirect.service';
import { AssetService, StatisticsService } from '@shared/services';
import * as d3 from 'd3';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { HomeDialogService } from '../../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public isAdmin: boolean = false;
  public username: string;
  public tickets$: Observable<any>;
  public assigns$: Observable<any>;
  public objectsCount: number = 0;
  public assignDate: any;
  public objectName: string;

  private data = [
    {"Tickets": "Create", "Value": "5", "Released": "2014"},
    {"Tickets": "Rezolvate", "Value": "10", "Released": "2013"},
    {"Tickets": "Create in ultima luna", "Value": "1", "Released": "2016"},
  ];
  private svg;
  private margin = 50;
  private width = 750;
  private height = 600;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;

  constructor(
    private dialogService: HomeDialogService,
    private matDialog: MatDialog,
    private redirectService: RedirectService,
    private staticsService: StatisticsService,
    private assetService: AssetService,
  ) {}

  public ngOnInit(): void {
    this.isAdmin = sessionStorage.getItem('role') === 'admin' ? true : false;
    this.username = sessionStorage.getItem('username') as string;

    this.staticsService.getTickets(this.username).subscribe((response) => console.log(response));
    this.assigns$ = this.staticsService.getAssigns(this.username);

    this.staticsService.getObjects(this.username).subscribe((result) => {
      console.log(result);

      this.objectsCount = result.count;
      this.assignDate = moment(result.assignDate).format('DD MM YYYY');
      if (!result?.assign.assetId) {
        return;
      }
      this.assetService.getAssetById(result.assign.assetId).subscribe((asset) => {
        this.objectName = asset.name;
      });
    });

    this.createSvg();
    this.createColors();
    this.drawChart();
  }

  public createRequest(): void {
    this.dialogService.openRequest(this.matDialog, [], false);
  }

  public createTicket(): void {
    this.dialogService.openTicket(this.matDialog, [], false);
  }

  public goToTickets(): void {
    this.redirectService.toTickets();
  }

  public goToAssigns(): void {
    this.redirectService.toAssigns();
  }

  private createSvg(): void {
    this.svg = d3.select("figure#pie")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
}

private createColors(): void {
  this.colors = d3.scaleOrdinal()
  .domain(this.data.map(d => d.Value.toString()))
  .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
}

private drawChart(): void {
  // Compute the position of each group on the pie:
  const pie = d3.pie<any>().value((d: any) => Number(d.Value));

  // Build the pie chart
  this.svg
  .selectAll('pieces')
  .data(pie(this.data))
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(this.radius)
  )
  .attr('fill', (d, i) => (this.colors(i)))
  .attr("stroke", "#121926")
  .style("stroke-width", "1px");

  // Add labels
  const labelLocation = d3.arc()
  .innerRadius(100)
  .outerRadius(this.radius);

  this.svg
  .selectAll('pieces')
  .data(pie(this.data))
  .enter()
  .append('text')
  .text(d => d.data.Tickets)
  .attr("transform", d => "translate(" + labelLocation.centroid(d) + ")")
  .style("text-anchor", "middle")
  .style("font-size", 15);
}
}
