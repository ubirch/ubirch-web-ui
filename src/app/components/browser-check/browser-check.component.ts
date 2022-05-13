import { Component, OnInit } from "@angular/core";
import { detect } from "detect-browser";
import * as supportedBrowsers from "src/supportedBrowsers";
import { AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "ubirch-browser-check",
  templateUrl: "./browser-check.component.html",
  styleUrls: ["./browser-check.component.scss"],
})
export class BrowserCheckComponent implements OnInit {
  browserSupported = "";
  title = "Browser Support";
  browserName: string | null | undefined;
  version: string | null | undefined;
  message = "";
  message2 = "";
  headerKey = "";
  displayBasic = false;

  constructor(
    private alertController: AlertController,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.browserSupported = supportedBrowsers.test(navigator.userAgent)
      ? ""
      : "not";
    if (this.browserSupported === "not") {
      this.translateService.get("init").subscribe(() => {
        this.headerKey = this.translateService.instant("browser-check.warning");
        console.log(this.headerKey);
        this.presentAlert();
      });
    }
  }
  async presentAlert() {
    console.log("header: " + this.headerKey);

    const alert = await this.alertController.create({
      cssClass: "alertModal",
      header: `${this.headerKey}`,
      subHeader: `Browser: ${detect()?.name} - Version: ${detect()?.version}`,
      message: `This version of ${detect()?.name} is ${
        this.browserSupported
      } supported and the app may not work as expected. <br/> Please update ${
        detect()?.name
      }.`,
      buttons: ["OK"],
    });

    await alert.present();
  }
}
