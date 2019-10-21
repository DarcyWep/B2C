import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-share-search-nav',
  templateUrl: './share-search-nav.component.html',
  styleUrls: ['./share-search-nav.component.css',
              '../../assets/img/iconfont/iconfont.css']
})
export class ShareSearchNavComponent implements OnInit {

    constructor(
        private router: Router,
        private actRouter: ActivatedRoute,
        private location: Location,
    ) { }

    public pressHome = false;
    public pressMath = false;
    public pressEnglish = false;
    public pressPolity = false;
    public pressSpeCourse = false;
    public url = String();

    ngOnInit() {
        this.url = this.location.path();
        if (this.url === '') {
            this.pressHome = true;
        } else {
            this.actRouter.url.subscribe(url => (this.url = url[0].path));
        }
        if (this.url === 'math') {
            this.pressMath = true;
        }
        if (this.url === 'english') {
            this.pressEnglish = true;
        }
        if (this.url === 'polity') {
            this.pressPolity = true;
        }
        if (this.url === 'speCourse') {
            this.pressSpeCourse = true;
        }
    }
    goHome() {
        this.router.navigateByUrl('');
        this.pressHome = true;
        this.pressMath = false;
        this.pressEnglish = false;
        this.pressPolity = false;
        this.pressSpeCourse = false;
    }
    goMath() {
        this.router.navigateByUrl('math');
        this.pressHome = false;
        this.pressMath = true;
        this.pressEnglish = false;
        this.pressPolity = false;
        this.pressSpeCourse = false;
    }
    goEnglish() {
        this.router.navigateByUrl('english');
        this.pressHome = false;
        this.pressMath = false;
        this.pressEnglish = true;
        this.pressPolity = false;
        this.pressSpeCourse = false;
    }
    goPolity() {
        this.router.navigateByUrl('polity');
        this.pressHome = false;
        this.pressMath = false;
        this.pressEnglish = false;
        this.pressPolity = true;
        this.pressSpeCourse = false;
    }
    goSpeCourse() {
        this.router.navigateByUrl('speCourse');
        this.pressHome = false;
        this.pressMath = false;
        this.pressEnglish = false;
        this.pressPolity = false;
        this.pressSpeCourse = true;
    }
    goCart() {
        this.router.navigateByUrl('user/cart');
    }
}
