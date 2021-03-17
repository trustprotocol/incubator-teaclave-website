(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{439:function(e,t,n){"use strict";n.r(t);var a=n(27),s=Object(a.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"everything-about-cve-2020-5499"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#everything-about-cve-2020-5499"}},[e._v("#")]),e._v(" Everything about CVE-2020-5499")]),e._v(" "),n("h2",{attrs:{id:"the-story"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#the-story"}},[e._v("#")]),e._v(" The Story")]),e._v(" "),n("p",[n("a",{attrs:{href:"https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-5499",target:"_blank",rel:"noopener noreferrer"}},[e._v("CVE-2020-5499")]),e._v("\nreported an enclave ID racing problem. We received the report on Nov 1st, 2019\nand fixed it on Nov 5th, 2019 with commit\n"),n("a",{attrs:{href:"https://github.com/apache/incubator-teaclave-sgx-sdk/commit/f29f4e71896589908cd4b43ed70a623a81eda0e5",target:"_blank",rel:"noopener noreferrer"}},[e._v("f29f4e71896589908cd4b43ed70a623a81eda0e5")]),e._v(".")]),e._v(" "),n("h2",{attrs:{id:"analysis-and-fix"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#analysis-and-fix"}},[e._v("#")]),e._v(" Analysis and Fix")]),e._v(" "),n("p",[e._v('The global data "enclave ID" was designed to hold the eid of the enclave\ninstance, and to be used for later provided '),n("code",[e._v("thread::spawn")]),e._v(" feature. In v1.0.8,\nwe didn't have "),n("code",[e._v("thread::spawn")]),e._v(". So the data racing is true, but it can hardly\nharm the enclave.")]),e._v(" "),n("p",[e._v("To be more clear, let's look at the patch:")]),e._v(" "),n("div",{staticClass:"language-diff extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('diff --git a/sgx_tstd/src/rt.rs b/sgx_tstd/src/rt.rs\nindex fcfd0a42..3f738a53 100644\n--- a/sgx_tstd/src/rt.rs\n+++ b/sgx_tstd/src/rt.rs\n@@ -36,6 +36,9 @@ use core::str;\n pub use crate::panicking::{begin_panic, begin_panic_fmt, update_panic_count};\n pub use crate::sys_common::at_exit;\n use crate::sys_common::cleanup;\n+use crate::sync::Once;\n+\n+static INIT: Once = Once::new();\n\n #[no_mangle]\n pub extern "C" fn t_global_exit_ecall() {\n@@ -43,13 +46,14 @@ pub extern "C" fn t_global_exit_ecall() {\n\n #[no_mangle]\n pub extern "C" fn t_global_init_ecall(id: u64, path: * const u8, len: usize) {\n-\n-    enclave::set_enclave_id(id as sgx_enclave_id_t);\n-    let s = unsafe {\n-        let str_slice = slice::from_raw_parts(path, len);\n-        str::from_utf8_unchecked(str_slice)\n-    };\n-    enclave::set_enclave_path(s);\n+    INIT.call_once(|| {\n+        enclave::set_enclave_id(id as sgx_enclave_id_t);\n+        let s = unsafe {\n+            let str_slice = slice::from_raw_parts(path, len);\n+            str::from_utf8_unchecked(str_slice)\n+        };\n+        enclave::set_enclave_path(s);\n+    });\n }\n\n global_dtors_object! {\n')])])]),n("p",[e._v("Basically, the initiation here should be an atomic operation. To be more safe,\nwe marked it as "),n("code",[e._v("Once")]),e._v(", which means that it can only be triggered once.")]),e._v(" "),n("p",[e._v("Overall, we think the threat is subtle. One of the necessary condition is that\nthe enclave should be started with an undocumented feature of urts:\n"),n("code",[e._v("global_init")]),e._v(". Also the enclave should depend on enclave ID on critical paths.\nIt's really rare.")])])}),[],!1,null,null,null);t.default=s.exports}}]);