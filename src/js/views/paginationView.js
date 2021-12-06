import icons from 'url:../../img/icons.svg';
import View from './view.js';

class PaginationView extends View {
  _parentEle = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEle.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const gotoPage = +btn.dataset.goto;

      handler(gotoPage);
    });
  }

  _generateMarkUp() {
    const currPage = this._data.page;
    const numPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numPage);

    if (currPage === 1 && numPage > 1) {
      return `
      <button data-goto="${
        currPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${currPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
    if (currPage === numPage && numPage > 1) {
      return `
        <button data-goto="${
          currPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currPage - 1}</span>
        </button>
        `;
    }
    if (currPage < numPage) {
      return `<button data-goto="${
        currPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${currPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      <button data-goto="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currPage - 1}</span>
    </button>
      `;
    }

    return '';
  }
}

export default new PaginationView();
