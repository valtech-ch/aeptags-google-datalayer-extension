import getHelper from './getHelper';
import getDataLayer from './getDataLayer';

getHelper();

window.helper = new window.DataLayerHelper(getDataLayer(), {
  listener: function (message, model) {
    if (model.event !== undefined) {
      document.body.dispatchEvent(
        new CustomEvent('gtmDlEvent', {
          bubbles: false,
          detail: { model: model }
        })
      );
    } else {
      document.body.dispatchEvent(
        new CustomEvent('gtmDlChange', {
          bubbles: false,
          detail: { model: model }
        })
      );
    }
  },
  listenToPast: true
});
