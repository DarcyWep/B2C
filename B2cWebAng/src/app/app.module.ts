import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';

import { ShareHeaderModule } from './share-header/share-header.module';
import { ShareSearchNavModule } from './share-search-nav/share-search-nav.module';
import { ShareFooterModule } from './share-footer/share-footer.module';
import { MathComponent } from './math/math.component';
import { EnglishComponent } from './english/english.component';
import { PolityComponent } from './polity/polity.component';
import { SpcCourseComponent } from './spc-course/spc-course.component';

import { AdminService } from './service/admin.service';
import { ConfigService } from './service/config.service';
import { UserService } from './service/user.service';
import { ProductService } from './service/product.service';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
   declarations: [
      AppComponent,
      HomepageComponent,
      MathComponent,
      EnglishComponent,
      PolityComponent,
      SpcCourseComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      ShareHeaderModule,
      ShareSearchNavModule,
      ShareFooterModule,
      FormsModule,
      HttpClientModule,
      ReactiveFormsModule,
      FileUploadModule
   ],
   providers: [
      FormBuilder,
      AdminService,
      ConfigService,
      UserService,
      ProductService,
      CookieService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
