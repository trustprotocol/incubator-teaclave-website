(window.webpackJsonp=window.webpackJsonp||[]).push([[1078],{1500:function(e,t,n){"use strict";n.r(t);var a=n(27),s=Object(a.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"teaclave-service-internals"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#teaclave-service-internals"}},[e._v("#")]),e._v(" Teaclave Service Internals")]),e._v(" "),n("p",[e._v("Teaclave Service is one of the most important abstractions in the platform.\nBasically, the Teaclave FaaS platform is the combination of different functional\nservices and connected through trusted channels. The Teaclave services include\nauthentication service, frontend service, management service, storage service,\naccess control service, scheduler service, and execution service. They play\ndifferent roles in the system.")]),e._v(" "),n("p",[e._v("To understand the design and internal implementation of these services, we need\nto discuss in these sections: RPC and protocol, app-enclave structure, and\nthe attestation mechanism.")]),e._v(" "),n("h2",{attrs:{id:"rpc-and-protocols"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#rpc-and-protocols"}},[e._v("#")]),e._v(" RPC and Protocols")]),e._v(" "),n("p",[e._v("We use Protocol Buffers (version 3) to define messages and RPC interfaces of the\nTeaclave services. For example, the authentication service has this definition.")]),e._v(" "),n("div",{staticClass:"language-proto extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("message UserLoginRequest {\n  string id = 1;\n  string password = 2;\n}\n\nmessage UserLoginResponse {\n  string token = 1;\n}\n\nservice TeaclaveAuthenticationApi {\n  rpc UserLogin (UserLoginRequest) returns (UserLoginResponse);\n}\n")])])]),n("p",[e._v('This means that the authentication service (for the API endpoint) has an RPC\ninterface called "'),n("code",[e._v("UserLogin")]),e._v('", which takes a "'),n("code",[e._v("UserLoginRequest")]),e._v('" message with\n'),n("code",[e._v("id")]),e._v(" and "),n("code",[e._v("password")]),e._v(' inside (in string type) and reply a "'),n("code",[e._v("UserLoginResponse")]),e._v('"\nmessage with '),n("code",[e._v("token")]),e._v(" inside (in string type).")]),e._v(" "),n("p",[e._v("With this definition, the build system will help to generate utility functions,\ntraits, and structures for clients to send RPC requests, and for service to\nimplement functions of handling requests. This is done by a build time tool\ncalled "),n("a",{attrs:{href:"https://github.com/apache/incubator-teaclave/tree/master/services/proto/proto_gen",target:"_blank",rel:"noopener noreferrer"}},[n("code",[e._v("proto_gen")])]),e._v(".")]),e._v(" "),n("p",[e._v("There is another layer in the "),n("code",[e._v("teaclave_proto")]),e._v(" crate to help convert protobuf's\nsimple data type to Rust's more concise data type. For example, a URL is defined\nin the string type in protobuf, while in Rust we can use the "),n("code",[e._v("Url")]),e._v(" struct to\nstore a URL.")]),e._v(" "),n("p",[e._v("For more protocol definitions for other services, please see proto files in\nthe "),n("a",{attrs:{href:"https://github.com/apache/incubator-teaclave/tree/master/services/proto/src/proto",target:"_blank",rel:"noopener noreferrer"}},[n("code",[e._v("proto")]),e._v(" directory")]),e._v(".")]),e._v(" "),n("h2",{attrs:{id:"service-implementation-structure"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#service-implementation-structure"}},[e._v("#")]),e._v(" Service Implementation Structure")]),e._v(" "),n("p",[e._v("A service in Teaclave consists of two parts: the app (untrusted) part and the\nenclave (trusted) part. The app part is responsible for managing the service,\nlaunching and terminating the enclave part, while the enclave part is to serve\nRPC requests from clients (or other services) through trusted channels, execute\nlogic, and process data in the trusted execution environment.")]),e._v(" "),n("h3",{attrs:{id:"app-untrusted"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#app-untrusted"}},[e._v("#")]),e._v(" App (Untrusted)")]),e._v(" "),n("p",[e._v("Basically, the app part of a service does the followings:")]),e._v(" "),n("ul",[n("li",[e._v("Load the runtime configuration from the config file.")]),e._v(" "),n("li",[e._v("Create a service launcher: prepare the binder and set the serialized config as\nan input.")]),e._v(" "),n("li",[e._v("Start the service enclave ("),n("em",[e._v("ecall")]),e._v(" to the trusted enclave part).")]),e._v(" "),n("li",[e._v("Misc: register signal handlers so that the app/enclave can respond to some\nsignals.")])]),e._v(" "),n("h3",{attrs:{id:"enclave-trusted"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#enclave-trusted"}},[e._v("#")]),e._v(" Enclave (Trusted)")]),e._v(" "),n("p",[e._v("Typically, a service's implementation in the enclave part contains two important\nstructs and one trait. Let's take the frontend service as an example.")]),e._v(" "),n("ul",[n("li",[n("code",[e._v("TeaclaveFrontendService")]),e._v(" (struct): Define properties or configurations along\nwith the lifetime of the service. For example, the frontend service needs to\nhold clients (with established trusted channels) to communicate with the\nauthentication service and management service.")]),e._v(" "),n("li",[n("code",[e._v("TeaclaveFrontendError")]),e._v(" (struct): Define errors that may occur in this\nservice, authentication error, for example.\n"),n("ul",[n("li",[n("code",[e._v("TeaclaveFrontend")]),e._v(" (trait Define): functions (requests) the service needs to\nhandle. The trait will be automatically derived from definitions in the\nProtoBuf file and can be imported from the "),n("code",[e._v("teaclave_proto")]),e._v(" crate.")])])])]),e._v(" "),n("p",[e._v("You will see some "),n("code",[e._v("#[handle_ecall]")]),e._v(" annotations on functions and the\n"),n("code",[e._v("register_ecall_handler")]),e._v(" macro to help with the function registration.\nThe lifecycle of a Teaclave service consists of enclave initialized, service\nstarted, and enclave finalized, which will invoke the corresponding command\nhandlers - "),n("code",[e._v("InitEnclave")]),e._v(", "),n("code",[e._v("StartService")]),e._v(", and "),n("code",[e._v("FinalizeEnclave")]),e._v(".")]),e._v(" "),n("p",[e._v("The start service function is the entry point of an enclave service. Here are\nsteps to prepare and start serving requests.")]),e._v(" "),n("ul",[n("li",[e._v("Initialize the attestation config and make a remote attestation.")]),e._v(" "),n("li",[e._v("With the endorsed attestation report, initialize an attested TLS config.")]),e._v(" "),n("li",[e._v("Initialize a TLS server with TLS config and listening address.")]),e._v(" "),n("li",[e._v("If needed, initialize service endpoints this service wants to connect. For\nexample, the frontend service needs to connect to the authentication service\nand management service.")]),e._v(" "),n("li",[e._v("Start the service (with endpoint handlers) and begin to serve requests.")])]),e._v(" "),n("p",[e._v("Here is a code snippet from authentication service in the enclave part:")]),e._v(" "),n("div",{staticClass:"language-rust extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('let api_listen_address = config.api_endpoints.authentication.listen_address;\nlet attestation_config = AttestationConfig::from_teaclave_config(&config)?;\nlet attested_tls_config = RemoteAttestation::new(attestation_config)\n    .generate_and_endorse()?\n    .attested_tls_config()\n    .ok_or_else(|| anyhow!("cannot get attested TLS config"))?;\nlet server_config = SgxTrustedTlsServerConfig::from_attested_tls_config(attested_tls_config)?;\n\nlet mut server = SgxTrustedTlsServer::<\n    TeaclaveAuthenticationApiResponse,\n    TeaclaveAuthenticationApiRequest,\n>::new(addr, server_config);\n\nlet service = api_service::TeaclaveAuthenticationApiService::new(db_client, jwt_secret);\n\nmatch server.start(service) {}\n')])])]),n("h2",{attrs:{id:"topology"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#topology"}},[e._v("#")]),e._v(" Topology")]),e._v(" "),n("p",[e._v("These services are communicating through RPC with remote attestation. Here is a\ntopological graph illustrating connections between services.")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("clients => authentication <-+       +----\x3e storage <----+\n                            |       |                   |\nclients => frontend ----------\x3e management            scheduler <-- execution\n                                    |\n                                    +--\x3e access_control\n\n\n                                                  =>      api endpoint connections\n                                                  -> internal endpoint connections\n")])])]),n("h2",{attrs:{id:"attestation-in-services"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#attestation-in-services"}},[e._v("#")]),e._v(" Attestation in Services")]),e._v(" "),n("p",[e._v("To explain the usages of remote attestation mechanism in services, we need to\nconsider two different scenarios: 1) the service wants to serve RPC requests\nfrom clients, 2) the service wants to connect and send requests to other\nservices.")]),e._v(" "),n("p",[e._v("For the first scenario, the endorsed attestation report is used for creating the\ntrusted TLS server, so that clients can attest the service's report to verify\nthe platform. In the meantime, if the service wants to attest clients (a.k.a.,\nestablishing mutual attestation), we need to get the accepted enclave attributes\nfrom the "),n("em",[e._v("enclave info")]),e._v(" first to create the trusted TLS server. By this, the\nserver can also attest clients' attestation reports and only accept expected\nconnections.")]),e._v(" "),n("p",[e._v("You may find code like the following to get the accepted enclave attributes for\nmutual attestation:")]),e._v(" "),n("div",{staticClass:"language-rust extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("let enclave_info = EnclaveInfo::verify_and_new(...)?;\nlet accepted_enclave_attrs: Vec<teaclave_types::EnclaveAttr> = AUTHENTICATION_INBOUND_SERVICES\n    .iter()\n    .map(|service| match enclave_info.get_enclave_attr(service) {...})\n    .collect::<Result<_>>()?;\n\n...\n\nlet server_config = SgxTrustedTlsServerConfig::from_attested_tls_config(attested_tls_config)?\n    .attestation_report_verifier(\n    accepted_enclave_attrs,\n    AS_ROOT_CA_CERT,\n    verifier::universal_quote_verifier,\n)?;\n")])])]),n("p",[e._v("For the second scenario, the report is used to create a trusted TLS channel so\nthat the client can present its report when establishing the channel. Also, the\nserver's report will be verified.")]),e._v(" "),n("h2",{attrs:{id:"customize-a-standalone-service"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#customize-a-standalone-service"}},[e._v("#")]),e._v(" Customize a Standalone Service")]),e._v(" "),n("p",[e._v("For most cases, we suggest using the Teaclave platform as a whole for security\nand functionality concerns. However, you may want to customize a TEE service\nusing Teaclave's existing capabilities under our service framework. For\ninstance, the execution service can be used as a standalone TEE Python executor,\nand the storage service can be used as a secure database as well.")]),e._v(" "),n("p",[e._v("To customize Teaclave services as a standalone one, you need to first think\nabout the interfaces exposed to clients, that is the definitions in protobuf.\nFor example, for a key-value database, we have defined "),n("code",[e._v("Get")]),e._v(", "),n("code",[e._v("Put")]),e._v(" and "),n("code",[e._v("Delete")]),e._v("\ninterfaces.")]),e._v(" "),n("p",[e._v('Additionally, if you are using it as a standalone TEE service, the attestation\nmechanism needs to be "one-way attestation" accordingly. That is, only clients\ncan establish trusted channels and attest the service\'s identity and platform\nstatus, but service cannot attest clients.')])])}),[],!1,null,null,null);t.default=s.exports}}]);