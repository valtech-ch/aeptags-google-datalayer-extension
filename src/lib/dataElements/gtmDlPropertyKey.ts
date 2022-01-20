export default function (settings, event) {
  if (hasSettings(settings)) {
    if (!hasEvent(event)) {
      return getPropertyFromDatalayer(settings.value);
    } else {
      return getPropertyFromEvent(settings, event);
    }
  } else {
    if (!hasEvent(event)) {
      return '';
    } else {
      return getCompleteEvent(event);
    }
  }
}

function hasSettings(settings) {
  return settings && settings.value && settings.value.length > 0;
}

function hasEvent(event) {
  return typeof event !== 'undefined';
}

function getPropertyFromDatalayer(property) {
  turbine.logger.debug(
    'Google Data Layer property was returned ' + JSON.stringify(property)
  );
  return window.helper.get(property);
}

function getCompleteEvent(event) {
  turbine.logger.debug(
    'Google Data Layer event was returned: ' + JSON.stringify(event)
  );
  return event.model;
}

function getPropertyFromEvent(settings, event) {
  let property = '';
  try {
    property = event.model[settings.value];
    turbine.logger.debug(
      'Google Data Layer Model property was returned from event ' +
        JSON.stringify(event)
    );
  } catch (error) {
    turbine.logger.error(
      'an attempt to get a Google data layer attribute property caused an error.  Event:' +
        JSON.stringify(event)
    );
  }
  return property;
}
