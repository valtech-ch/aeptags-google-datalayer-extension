export default function () {
  const name = turbine.getExtensionSettings().gtmDlName;
  (<any>window)[name] = window[name] || [];
  return window[name];
}
