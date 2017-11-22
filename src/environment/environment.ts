// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api: {

    //baseUrlApi:   'http://192.168.1.37/KARCHER/web/app_dev.php/',
    baseUrlApi:   'https://karcher-postventa.fonoempresa.com/',
    api_key:'12345678901234567890123456789012',
    client_id:'9_62hewjhy9tkw0c4kwwsk88sw44oogk0k4gwok00s4g0c0kko8c',
    client_secret: '12tpfrokdry8488wwkwos8owkwk0c8440cgsowgkk48ssck4g4',
    fortigate:'FGVM040000112250'
  },
};
