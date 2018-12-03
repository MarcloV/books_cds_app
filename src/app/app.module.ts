import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BookListPage } from '../pages/BookList/BookList';
import { CdListPage } from '../pages/CdList/CdList';
import { LendBookPage } from '../pages/BookList/lendBook/lendBook';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { BookService } from '../services/bookService';
import { CdService } from '../services/cdService';
import { LendCdPage } from '../pages/CdList/LendCd/LendCd';
import { AuthService } from '../services/authService';
import { AuthPage } from '../pages/auth/auth';
import { BookFormPage } from '../pages/BookList/bookForm/bookForm';
import { CdFormPage } from '../pages/CdList/cdForm/cdForm';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BookListPage,
    CdListPage,
    LendBookPage,
    SettingsPage,
    TabsPage,
    LendCdPage,
    AuthPage,
    BookFormPage,
    CdFormPage

  
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BookListPage,
    CdListPage,
    LendBookPage,
    SettingsPage,
    TabsPage,
    LendCdPage,
    AuthPage,
    BookFormPage,
    CdFormPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TabsPage,
    BookService,
    CdService,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
