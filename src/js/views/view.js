import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkUp();

    if (!render) return markup;

    this._clear();
    this._parentEle.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();

    this._data = data;
    const newMarkup = this._generateMarkUp();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currElements = Array.from(this._parentEle.querySelectorAll('*'));
    newElements.forEach((newEle, i) => {
      const curEle = currElements[i];
      if (
        !newEle.isEqualNode(curEle) &&
        newEle.firstChild?.nodeValue.trim() !== ''
      ) {
        curEle.textContent = newEle.textContent;
      }

      if (!newEle.isEqualNode(curEle)) {
        Array.from(newEle.attributes).forEach(attr =>
          curEle.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
  _clear() {
    this._parentEle.innerHTML = '';
  }
  renderSpinner() {
    const markUp = ` 
    <div class="spinner">
    <svg>
    <use href="${icons}#icon-loader"></use>
    </svg>
    </div>
    `;
    this._clear();

    this._parentEle.insertAdjacentHTML('afterbegin', markUp);
  }

  renderError(msg = this._errMsg) {
    const markup = `<div class="error">
<div>
  <svg>
    <use href="${icons}#icon-alert-triangle"></use>
  </svg>
</div>
<p>${msg}!</p>
</div>
`;
    this._clear();
    this._parentEle.insertAdjacentHTML('afterbegin', markup);
  }

  renderMsg(msg = this._msg) {
    console.log(msg);
    const markup = `<div class="message">
<div>
  <svg>
    <use href="${icons}#icon-smile"></use>
  </svg>
</div>
<p>${msg}!</p>
</div>
`;
    this._clear();
    this._parentEle.insertAdjacentHTML('afterbegin', markup);
  }
}
