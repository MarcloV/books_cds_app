import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings';
import { BookListPage } from '../BookList/BookList';
import { CdListPage } from '../CdList/CdList';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  homePage = HomePage;
  bookListPage = BookListPage;
  cdListPage = CdListPage;
  settingsPage = SettingsPage;
}