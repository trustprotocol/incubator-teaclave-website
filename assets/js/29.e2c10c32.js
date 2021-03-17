(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{425:function(e,t,a){"use strict";a.r(t);var n=a(27),o=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("p",[e._v('Last year, we published an RFC - "'),a("a",{attrs:{href:"https://github.com/apache/incubator-teaclave/issues/121",target:"_blank",rel:"noopener noreferrer"}},[e._v("Roadmap: Towards the First Public Release")]),e._v('". Thanks\nfor the continuous efforts made by the community. We have completed several\nmilestones and amazing achievements.')]),e._v(" "),a("p",[e._v("Specifically, we published the first Apache incubator release - "),a("a",{attrs:{href:"https://teaclave.apache.org/blog/2020-10-21-announcing-teaclave-0-1-0/",target:"_blank",rel:"noopener noreferrer"}},[e._v("version 0.1.0")]),e._v(". In this release, we refactored and rewrote almost all core components for\nbetter engineering. New features and enhancements was implemented and well\ntested. Also we wrote plenty of documents for the design, implementation, as\nwell as the code base. Furthermore, the "),a("a",{attrs:{href:"https://teaclave.apache.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("homepage")]),e._v("\nof Apache Teaclave (incubating) was built and online, which contains many\nuseful information on the project and community. We also organized several\noffline meetups to build up and grow the Teaclave family. In addition, for\nbetter explaining the project, we introduced the blog in the Teaclave homepage\nand then published an "),a("a",{attrs:{href:"https://teaclave.apache.org/blog/2020-12-08-teaclave-ecosystem/",target:"_blank",rel:"noopener noreferrer"}},[e._v("article about the ecosystem")]),e._v(".\nIn this article, we spent some time to summarize existing open source projects\npowered by Teaclave. Last but not least, we also attended SGX Workshop and\nApacheCon to introduce our project. Overall we're very glad to see the\ndevelopment of the project and growth of the community.")]),e._v(" "),a("p",[e._v("In the year of 2021, we need to focus on the maturity of the project and\nbuilding a healthier and more sustainable community. Therefore, I summarize\nseveral to-do lists here. There are mainly four parts. The first three are about\nthe project's features and enhancements, which include Teaclave FaaS framework,\nTeaclave SGX SDK, and Teaclave TrustZone SDK (this project just completed the\ndonation voting, more things need to do later). The last one is about community\nbuildup. Yes, this is a very long list. Please let me know if you are interested\nin. I'm more than happy to help you if not familiar with Teaclave, SGX, or Rust.\nAt last, this is not a complete list. Feel free to comment and discuss in this\nthread.")]),e._v(" "),a("h2",{attrs:{id:"teaclave-faas-framework"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#teaclave-faas-framework"}},[e._v("#")]),e._v(" Teaclave FaaS Framework")]),e._v(" "),a("ul",[a("li",[e._v("Support WebAssembly executor")]),e._v(" "),a("li",[e._v("Expose attestation related functions to the executor runtime")]),e._v(" "),a("li",[e._v("Database persistency")]),e._v(" "),a("li",[e._v("Execution report for end user")]),e._v(" "),a("li",[e._v("Async RPC framework for better throughput performance")]),e._v(" "),a("li",[e._v("Monitoring")]),e._v(" "),a("li",[e._v("Performance/Scalability evaluation")]),e._v(" "),a("li",[e._v("Multi-language client SDK: C, Rust client SDK")]),e._v(" "),a("li",[e._v("Improve legacy code using latest compiler features")]),e._v(" "),a("li",[e._v("Documentation: Lifecycle of a task in Teaclave")]),e._v(" "),a("li",[e._v("Documentation: How to launch a multi-party secure computation task")]),e._v(" "),a("li",[e._v("Documentation: FAQ")]),e._v(" "),a("li",[e._v("Technical report")]),e._v(" "),a("li",[e._v("Use a separated service and rule evaluation engine for access control")]),e._v(" "),a("li",[e._v("Implement KMS")]),e._v(" "),a("li",[e._v("Attestation specification for third party enclaves")]),e._v(" "),a("li",[e._v("Automatic state transition of pre-approved tasks")]),e._v(" "),a("li",[e._v("Local configuration of attestation method")]),e._v(" "),a("li",[e._v("Better attestation report freshness management")]),e._v(" "),a("li",[e._v("Refactor RPC interfaces")]),e._v(" "),a("li",[e._v("Add a secure logging service")]),e._v(" "),a("li",[e._v("Active enclaves status service")]),e._v(" "),a("li",[e._v("Support multiple TEE implementations")]),e._v(" "),a("li",[e._v("GRPC or thrift compatibility")]),e._v(" "),a("li",[e._v("Universal TEE interface design and implementation")])]),e._v(" "),a("h2",{attrs:{id:"teaclave-sgx-sdk"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#teaclave-sgx-sdk"}},[e._v("#")]),e._v(" Teaclave SGX SDK")]),e._v(" "),a("ul",[a("li",[e._v("Security auditing and enhancement")]),e._v(" "),a("li",[e._v("Code polishing")]),e._v(" "),a("li",[e._v("Publish an Apache release")]),e._v(" "),a("li",[e._v("Design a proper development, releasing development lifecycle")]),e._v(" "),a("li",[e._v("Documentation polishing")]),e._v(" "),a("li",[e._v("Tutorial")]),e._v(" "),a("li",[e._v("Maintenance of Rust crates for Teaclave")]),e._v(" "),a("li",[e._v("Document porting guideline for Rust crates for SGX")]),e._v(" "),a("li",[e._v("std Aware Cargo supports")]),e._v(" "),a("li",[e._v("Rust secure file system")])]),e._v(" "),a("h2",{attrs:{id:"teaclave-trustzone-sdk"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#teaclave-trustzone-sdk"}},[e._v("#")]),e._v(" Teaclave TrustZone SDK")]),e._v(" "),a("ul",[a("li",[e._v("Keep update to the latest Rust standard library")]),e._v(" "),a("li",[e._v("Keep update to the latest OP-TEE version")]),e._v(" "),a("li",[e._v("Rust Crates for TrustZone, examples")]),e._v(" "),a("li",[e._v("Design attestation framework for TZ")])]),e._v(" "),a("h2",{attrs:{id:"teaclave-community"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#teaclave-community"}},[e._v("#")]),e._v(" Teaclave Community")]),e._v(" "),a("ul",[a("li",[e._v("Organize meetups on topics around Teaclave")]),e._v(" "),a("li",[e._v("Give public talks to developers")]),e._v(" "),a("li",[e._v("Reach out to more Teaclave users")]),e._v(" "),a("li",[e._v("Collaboration with industry and academia")]),e._v(" "),a("li",[e._v("Blogs on Rust, TEE, and Teaclave")])])])}),[],!1,null,null,null);t.default=o.exports}}]);