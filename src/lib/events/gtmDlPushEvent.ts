export default function (settings, trigger) {
    if (!(typeof settings !== 'undefined' && settings !== null)) return;

    const {method, regex, eventKey} = settings;

    function handler(event) {
        turbine.logger.debug('Launch handled an event: ' + JSON.stringify(event));

        const result = {
            message: event.detail.model.event || 'gtmDlChange',
            model: event.detail.model
        };

        if (method !== 'specificEvent') {
            trigger(result);
        } else {
            if (regex) {
                let re = new RegExp(eventKey);
                if (String(event.detail.model.event).match(re)) {
                    trigger(result);
                }
            } else if (eventKey === event.detail.model.event) {
                trigger(result);
            }
        }
    }

    if (method === 'allData') {
        document.body.addEventListener('gtmDlChange', handler);
    } else if (
        method === 'allEvents' ||
        (method === 'specificEvent' && eventKey !== '')
    ) {
        document.body.addEventListener('gtmDlEvent', handler);
    }
}
