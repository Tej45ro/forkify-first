import icons from 'url:../../img/icons.svg';
import paginationView from './paginationView.js';
import previewView from './previewView.js';
import View from './view.js';

class BookMarksView extends View {
  _parentEle = document.querySelector('.bookmarks__list');
  _errMsg = 'sorry no bookMarks found';
  _msg = 'yey';

  addHandlerRender(handler) {
    // console.log('booked');
    window.addEventListener('load', handler);
  }

  _generateMarkUp() {
    // console.log(this._data);

    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new BookMarksView();
