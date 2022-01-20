# The Valtech AEP Tags (Launch) Google Data Layer Extension

The Google Data Layer extension is a beta.  

## Overview 

The extension allows Launch (new name AEP Tags) to use a Google data layer, either independently or simultaneously with Google solutions, and using the same logic; Google's open source Data Layer _Helper_ library.  The _Helper_ library provides similar Event Driven functionality to the Adobe Client Data Dayer (ACDL).  The data elements, rules and actions of the extension provide similar functionality to those in the [ACDL extension](https://github.com/pitchmuc/acdl_extension).

## Use Case

The Google data layer extension is intended to support the use case of Google and Adobe data consumers on the same web page and provide both with a single source of data truth.  The following scenarios may result in this:

- Google solutions are deployed using AEP Tags (for example via [Acronym's Gtag extension](https://www.adobeexchange.com/experiencecloud.details.101437.google-global-site-tag-gtag.html))
- Google solutions directly added in page, eg.  GTag code in the header.
- Two tag managers, AEP Tags and Google Tag Manager on the same page (double tagging).  While poor practice this is a necessity under some circumstances, for example Google -> Adobe migration.

## Comparison with using a shared Adobe Data Layer

Google technology is tightly coupled to the Google data layer and one is automatically created by Google solutions if not present.  AEP Tags is explicitly data layer agnostic and will not inject a data layer without addition code or a data layer extension.  Shared use of the Google Data Layer is therefore the obvious choice.

## Compatibility with AEP / XDM

The extension is fully compatible with an AEP / XDM implementation, as XDM mapping is not affected by the choice of data layer.  The extension was originally developed for a customer adopting AEP in a primarily Google environment.

## Simultaneous Data Layer Access Risk

The extension does not change the data layer unless a push is made, nor interact with other Helper objects (such as the internal GTM Helper).  The Helper object used by launch to monitor the data layer for changes is separate from other Helpers accessing the data layer, and maintains and operates on an internal model of the data layer; so an event on the data layer is caught and processed independently in each Helper object.  An example of this is seen when the history of past data layer events is processed - each Helper maintains its own history.

The extension is however still in beta, and despite extensive testing, unwanted interference between multiple data layer consumers cannot be fully ruled out.

## Event Integrity

A key function of an Event Driven Data Layer is to process snapshots of the data layer when an event is caught, ie.  within the context of an event.  This ensures that multiple rapid events do not conflict during near simultaneous handling and result in an erroneous read of data in the data layer.  The AEP Tags extension _data elements_ and related _actions_ do respect this and process the data layer in the context of individual events.  For example if a series of events are written to the data layer almost simultaneously, each is caught and processed separately using the state of the datalayer at the time the event fired.

It is also possible to do a simple read of the data layer outside the context of an event.

## Event History

When the data layer extension is loaded in the page, any previous data layer events will be processed, this avoiding the issue of missed events resulting from load order; particularly a concernn in asynchrounous load scenarios. 

## Capabilties

The data extension provides:

- Injection of _Helper_ library 
- Configuration of data layer name 
- A Data Element for accessing Data Layer values.
- A listener event to catch data layer events and changes.
- An action to support dataLayer push

 Source Projects

This project is built on the shoulders of giants:

[Google Helper project](https://github.com/google/data-layer-helper) 

[ACDL Extention](https://github.com/pitchmuc/acdl_extension)

Thank you to the developers - the notice file, license file and code acknowledge your work.

## Development

A full FE build system is included, allowing development in Typescript or ES6+.

Developers should clone the repo and run ``` npm install ``` followed by ``` npm run dev ``` in the project root.  This will start the Reactor Sandbox and compile the project.

Other npm commands can be found in the package.json.  In addition to build these can complete the operations described in the [development documentation](https://experienceleague.adobe.com/docs/experience-platform/tags/extension-dev/overview.html?lang=en).

## License

   Copyright 2022 Valtech Switzerland AG. All Rights Reserved.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

## License Additional Information

The project includes code from the Google Helper library as described in the NOTICE file.  As the Google code is released under the Apache 2.0 license this project and derivatives must continue this, and the Apache 2 license is included in the LICENSE file as required.  Valtech places no additional requirements on derivative work.

