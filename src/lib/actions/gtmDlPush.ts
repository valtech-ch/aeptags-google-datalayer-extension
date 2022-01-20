/* code copied from ACDL Extensio - see notice / readme file */

import getDataLayer from '../helpers/getDataLayer';
export default function (settings) {

    if (typeof settings !== 'undefined' && settings !== null) {
        let dl = getDataLayer();
        if (typeof dl !== 'undefined') {
            try {
                dl.push(JSON.parse(settings.content));
                turbine.logger.debug('Successfully pushed JSON into DL');
            } catch (e) {
                turbine.logger.error('Could not push content into DL' + e.message);
            }
        } else {
            turbine.logger.error('Could not find the DL');
        }
    }
};

