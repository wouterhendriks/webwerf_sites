import * as dompack from 'dompack';

import Vue from 'vue/dist/vue.js';

export default class FilterGrid {
  constructor({ itemClass = '',
                filterTypes = [],
                appId = 'app',
              }) {
    this.filterTypes = filterTypes;

    dompack.onDomReady(() => {
      let $app = $(`#${appId}`);

      this.$items = $app.find(`.${itemClass}`);
      if (this.$items.length == 0) {
        console.error($app, `.${itemClass}`);
        throw(`Missing items`);
      }

      this.app = new Vue({
        el: `#${appId}`,
        async created() {
        },
      });
    });
  }
}

// console.log('hi');

// import { URL } from "dompack/browserfix/url";
// import rpc from '../../shared/js/services.rpc.json';

// import Masonry from 'masonry-layout';

// export default class FilterGrid {
//   constructor({ filterTypes = [],
//                 gridId = '#products-grid',
//                 products = [],
//               }) {
//     this.filterTypes = filterTypes;
//     this.gridId = gridId;
//     this.products = products;

//     // if (!this.filterTypes || this.filterTypes.length == 0)
//     //   throw('Missing filter types');

//     if (!this.products || this.products.length == 0)
//       throw('Missing products');

//     let masonrySettings = {
//       itemSelector: '.grid-item',
//       columnWidth: '.grid-sizer',
//       percentPosition: true,
//       transitionDuration: 500,
//       gutter: 18,
//       horizontalOrder: true,
//     };

//     this.grid = new Masonry(gridId, masonrySettings);
//     // this.grid.layout();
//   }

//   setup() {
//     // read the URL for any filters
//     let url = new URL(location.href);
//     let showGridTimeout = 0;
//     let filteredData = {};

//     for (const filter of this.filterTypes) {
//       let param = url.searchParams.get(filter.urlvar);
//       if (param) {
//         filteredData[filter.tag] = [];
//         for (let id of param.split(',')) {
//           filteredData[filter.tag].push(parseInt(id));
//           $(`input[name="${filter.tag}"][value="${id}"]`).prop('checked', true);
//         }
//       }
//     }

//     if (Object.entries(filteredData).length > 0) {
//       showGridTimeout = 500;
//       this.applyFilterToGrid(filteredData);
//     }

//     // initialized, show the grid after a timeout
//     setTimeout(() => {
//       $('#products-grid').addClass('show');
//     }, showGridTimeout);

//     // setup onchange events
//     for (const filter of this.filterTypes) {
//       $(`input[name="${filter.tag}"]`).on('change', this.onFilterChange.bind(this));
//     }
//   }

//   onFilterChange() {
//     let filter = this.getFilter();
//     this.updateURLByFilter(filter);
//     this.applyFilterToGrid(filter);
//   }

//   getFilter() {
//     let filteredData = {};
//     for (const filter of this.filterTypes) {
//       filteredData[filter.tag] = [];
//       $(`input[name="${filter.tag}"]`).each(function() {
//         if ($(this).is(':checked'))
//           filteredData[filter.tag].push(parseInt($(this).val()));
//       });
//     }
//     return filteredData;
//   }

//   updateURLByFilter(filteredData) {
//     let url = new URL(location.href);
//     for (const filter of this.filterTypes) {
//       if (filteredData[filter.tag] && filteredData[filter.tag].length)
//         url.searchParams.set(filter.urlvar, filteredData[filter.tag].join());
//       else
//       url.searchParams.delete(filter.urlvar);
//     }

//     window.history.pushState({}, '', decodeURIComponent(url.toString()));
//   }

//   async applyFilterToGrid(filter) {
//     let products = await rpc.FilterProducts(this.products, filter, this.filterTypes);
//     this.grid.layout({ filterids: products });
//   }
// }
