interface TurbineExtensionSettings {
  gtmDlName: string;
}

interface TurbineLogger {
  debug: (msg: string) => void;
  error: (msg: string) => void;
}

interface Turbine {
  getExtensionSettings: () => TurbineExtensionSettings;
  logger: TurbineLogger;
}

declare const turbine: Turbine;

interface Window {
  helper?: any;
  turbine?: any;
  DataLayerHelper?: any;
}
