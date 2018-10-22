import { Component, OnInit } from '@angular/core';
import { WebRequestJsonService } from '../services/WebRequestJsonService';
import { App } from '../models/App'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //#region Fields

  private readonly dataURL: string = "src/app/app.data.json";

  private data: Array<App> = new Array<App>();
  private pageSize: number = 3;

  private webRequestJsonService: WebRequestJsonService;

  //#endregion

  //#region Properties

  public Categories: Array<string> = new Array<string>();
  public SelectedCategory: string;
  public AppsFiltered: Array<App> = new Array<App>();
  public SelectedPage: number;
  public Apps: Array<App> = new Array<App>();
  public Pages: Array<number> = new Array<number>();

  private filterName: string;
  public get FilterName(): string
  {
    return this.filterName;
  }
  public set FilterName(value: string)
  {
    if (this.filterName != value)
    {
      this.filterName = value;
      this.OnFilterNameChanged(this.filterName);
    }
  }

  //#endregion

  //#region constructor

  public constructor(webRequestJsonService: WebRequestJsonService) 
  {
    this.webRequestJsonService = webRequestJsonService;
  }

  //#endregion

  //#region onInit

  public ngOnInit(): void
  {
    this.FillData();
  }

  private FillData = () =>
  {
    this.webRequestJsonService.RequestJSON<any>(this.dataURL)
      .then((result: any) =>
      {
          this.data = result.value;
          this.AppsFiltered = [...this.data].sort(this.Compare);
          this.SetCategories();
          this.SetPagination(1);
      })
      .catch(() =>
      {
          console.log("Error while fetching data.");
      });
  }

  private Compare = (app1 : App, app2: App) => {
    let totalPriceOfApp1: number = this.GetTotalPrice(app1);
    let totalPriceOfApp2 : number = this.GetTotalPrice(app2);
    if (totalPriceOfApp1 < totalPriceOfApp2)
      return -1;
    if (totalPriceOfApp1 > totalPriceOfApp2)
      return 1;
    return 0;
  }

  private GetTotalPrice = (app : App) =>
  {
    let sum: number = 0;
    for(let subscription of app.subscriptions)
    {
      sum += subscription.price;
    }

    return sum;
  }

  private SetCategories = () => 
  {
    for (const app of this.data) {
      for (const category of app.categories) {
        if (this.Categories.indexOf(category) === -1) {
          this.Categories.push(category);
        }
      }
    }
    this.Categories.sort();
    this.SelectedCategory = this.Categories[0];
  }

  private SetPagination = (page: number) =>
  {
    this.Pages = new Array<any>();
    this.SelectedPage = page;
    let numberOfPages : number = Math.ceil(this.AppsFiltered.length / this.pageSize);
    this.DefinePages(numberOfPages);
    let lastElement = Math.min(3 * this.SelectedPage, this.AppsFiltered.length);
    let firstElement = 3 * (this.SelectedPage - 1);
    this.Apps = this.AppsFiltered.slice(firstElement, lastElement);
  }

  private DefinePages = (numberOfPages: number) =>
  {
    for (let i = 1; i <= numberOfPages; i++)
    {
      this.Pages.push(i);
    }
  }

  //#endregion

  //#region OnCategoryChanged

  public OnCategoryChanged = (value: any) =>
  {
      this.SelectedCategory = value;
      this.filterName = "";
      this.AppsFiltered = this.data.filter(q => q.categories.includes(value));
      this.SelectedPage = 1;
      this.SetPagination(1);
  }

  //#endregion

  //#region OnSelectedPageChanged

  public OnSelectedPageChanged = (page: number) =>
  {
    if(page > 0 && page <= this.Pages.length)
    {
      this.SelectedPage = page;
      this.SetPagination(page);
    }
  }

  //#endregion

  //#region Changed Handlers

  private OnFilterNameChanged = (value: string) =>
  {
    this.SelectedCategory = null;
    this.AppsFiltered = this.data.filter(q => q.name.toLowerCase().includes(this.filterName.toLowerCase()));
    this.SetPagination(1);
  }

  //#endregion
}


