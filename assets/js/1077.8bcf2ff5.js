(window.webpackJsonp=window.webpackJsonp||[]).push([[1077],{1481:function(e,t,a){"use strict";a.r(t);var n=a(27),r=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"rust-development-guideline"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rust-development-guideline"}},[e._v("#")]),e._v(" Rust Development Guideline")]),e._v(" "),a("p",[e._v("This doc defines some guidelines for developing Teaclave in Rust.")]),e._v(" "),a("h2",{attrs:{id:"style"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#style"}},[e._v("#")]),e._v(" Style")]),e._v(" "),a("p",[e._v("We use "),a("code",[e._v("rustfmt")]),e._v(" and "),a("code",[e._v("clippy")]),e._v(" to format and lint all Rust code. Mostly, we use\nthe default configurations, but there are a couple of custom settings and lint\nexceptions. The exceptions should be defined along with the code. Our CI will\ncheck the format/lint issues and deny all warnings by default. Simply run "),a("code",[e._v("make format")]),e._v(" to format all code and "),a("code",[e._v("make CLP=1")]),e._v(" to lint code before submitting a PR.\nIf you still have some doubts of the "),a("code",[e._v("clippy")]),e._v(" error, feel free to point out and\nadd an exception.")]),e._v(" "),a("h2",{attrs:{id:"elegant-apis"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#elegant-apis"}},[e._v("#")]),e._v(" Elegant APIs")]),e._v(" "),a("p",[e._v("Elegantly designed functions and APIs will make the project readable and\nuser-friendly. Basically, we follow naming conventions and API design patterns\nof Rust standard library. There's no official guideline, but here are several\narticles or docs for reference:")]),e._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://rust-lang.github.io/api-guidelines/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Rust API guidelines")])]),e._v(" "),a("li",[a("a",{attrs:{href:"https://github.com/rust-unofficial/patterns",target:"_blank",rel:"noopener noreferrer"}},[e._v("Rust Design Patterns")])]),e._v(" "),a("li",[a("a",{attrs:{href:"https://deterministic.space/elegant-apis-in-rust.html#what-makes-an-api-elegant",target:"_blank",rel:"noopener noreferrer"}},[e._v("Elegant Library APIs in Rust")])])]),e._v(" "),a("h2",{attrs:{id:"unsafe-rust"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#unsafe-rust"}},[e._v("#")]),e._v(" Unsafe Rust")]),e._v(" "),a("p",[e._v("Using unsafe Rust is extremely dangerous, and may break Rust's strong\nmemory-safety guarantees. Therefore, we want to keep unsafe Rust as minimal as\npossible. Sometimes (very rare) using unsafe Rust can significantly improve\nperformance, the unsafe code should be "),a("em",[e._v("well documented")]),e._v(" and "),a("em",[e._v("explain the\nrationales")]),e._v(". For contributors and reviewers, pay attention to the unsafe code\nand carefully check whether the pre-conditions and post-conditions still\nhold.")]),e._v(" "),a("h2",{attrs:{id:"error-handling"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#error-handling"}},[e._v("#")]),e._v(" Error Handling")]),e._v(" "),a("p",[e._v("Using "),a("code",[e._v("unwrap")]),e._v(" or "),a("code",[e._v("expect")]),e._v(" to get a value from an optional type may introduce\nruntime panic. Therefore, properly using the error handling mechanism provided\nby Rust can make the system robust and clean. In some cases, optional value can\nnever be "),a("code",[e._v("None")]),e._v(" internally, "),a("code",[e._v("unwrap")]),e._v(" can be used with a comment explaining the\nassumptions and reasons. The same rule also applies to "),a("code",[e._v("panic")]),e._v(" and similar\nfunctions which may cause runtime panic. One exception is to use "),a("code",[e._v("unwrap")]),e._v(" and\n"),a("code",[e._v("expect")]),e._v(" in tests, while "),a("code",[e._v("expect")]),e._v(" is better because it will show a message to\nhelp debugging.")]),e._v(" "),a("h2",{attrs:{id:"third-party-crates"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#third-party-crates"}},[e._v("#")]),e._v(" Third-Party Crates")]),e._v(" "),a("p",[e._v("To ensure the security, stability and compatibility of upstream crates, all\nthird-party crates (especially for ported SGX-compatible crates) used in\nTeaclave are vendored in the "),a("code",[e._v("third_party")]),e._v(" directory. Please refer to the\n"),a("code",[e._v("crates-sgx")]),e._v(" and "),a("code",[e._v("crates-io")]),e._v(" repo and choose specific versions of vendored\ncrates.")])])}),[],!1,null,null,null);t.default=r.exports}}]);