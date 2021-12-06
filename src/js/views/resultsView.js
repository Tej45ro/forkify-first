import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';

import View from './view.js';

class ResultsView extends View {
  _parentEle = document.querySelector('.results');
  _errMsg = 'sorry no results found';
  _msg = 'yey';

  _generateMarkUp() {
    // console.log(this._data);

    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
