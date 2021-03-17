(window.webpackJsonp=window.webpackJsonp||[]).push([[105],{507:function(e,t,n){"use strict";n.r(t);var i=n(27),a=Object(i.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"configurations-in-teaclave"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#configurations-in-teaclave"}},[e._v("#")]),e._v(" Configurations in Teaclave")]),e._v(" "),n("p",[e._v("This Teaclave Config describes all sorts of configurations in the platform. All\nconfigurations are defined in the TOML file format. Basically, there are two types\nof configurations in Teaclave: "),n("em",[e._v("build config")]),e._v(" and "),n("em",[e._v("runtime config")]),e._v(".")]),e._v(" "),n("h2",{attrs:{id:"build-config"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#build-config"}},[e._v("#")]),e._v(" Build Config")]),e._v(" "),n("p",[e._v("The build config defines configurations which are provided at compilation time.\nThat is, this type of configurations will be compiled as the part of the\nTeaclave platform and are hard-coded in the services. For example, the root CA\ncertificate of attestation service used for verifying attestation report,\nauditors' public keys for verification of enclave information, and topological\ngraph of connections between services for mutual attestation. More detailed\nexplanation of configurations can be seen in the\n"),n("a",{attrs:{href:"https://github.com/apache/incubator-teaclave/blob/master/config/build.config.toml",target:"_blank",rel:"noopener noreferrer"}},[n("code",[e._v("build.config.toml")])]),e._v("\nfile. We also implement a\n"),n("a",{attrs:{href:"https://github.com/apache/incubator-teaclave/tree/master/config/config_gen",target:"_blank",rel:"noopener noreferrer"}},[n("code",[e._v("config_gen")])]),e._v("\ntool to generate hard-coded configurations in Rust\nfrom the user-defined config in TOML at compilation time.")]),e._v(" "),n("p",[e._v("Note that it is very "),n("em",[e._v("important")]),e._v(" to define these configurations in build time,\nbecause they are part of Teaclave's "),n("em",[e._v("trusted computing base")]),e._v(" (TCB) and will be\n"),n("em",[e._v("remotely attested")]),e._v(". In Teaclave's "),n("RouterLink",{attrs:{to:"/teaclave/docs/threat-model.html"}},[e._v("threat model")]),e._v(",\noperating system could be compromised. If this configurations is not in TCB\n(i.e., cannot be remotely attested), the security and integrity of the platform\nmay be affected.")],1),e._v(" "),n("h2",{attrs:{id:"runtime-config"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#runtime-config"}},[e._v("#")]),e._v(" Runtime Config")]),e._v(" "),n("p",[e._v("The runtime config defines some configurations which will be used at execution\nruntime. It includes listening and advertised addresses of service endpoints in\nTeaclave, the enclave information and auditor's signatures files loaded at\nruntime, algorithm/id/key used for connecting attestation services, etc.\nSome configurations can be overridden by environment variables. Detailed\nexplanation of configurations can be found in the\n"),n("a",{attrs:{href:"https://github.com/apache/incubator-teaclave/blob/master/config/runtime.config.toml",target:"_blank",rel:"noopener noreferrer"}},[n("code",[e._v("runtime.config.toml")])]),e._v(" file.")]),e._v(" "),n("p",[e._v("Note that the runtime config will be loaded when launching the services. We\n"),n("em",[e._v("should not")]),e._v(" trust the content and make sure maliciously crafted config from\nthis file will not break any data confidentiality/integrity. Otherwise, the\nconfiguration must be defined as a build config.")])])}),[],!1,null,null,null);t.default=a.exports}}]);