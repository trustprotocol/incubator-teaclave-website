(window.webpackJsonp=window.webpackJsonp||[]).push([[1012],{1417:function(t,e,a){"use strict";a.r(e);var l=a(27),s=Object(l.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"tcmalloc-code-sample"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tcmalloc-code-sample"}},[t._v("#")]),t._v(" tcmalloc code sample")]),t._v(" "),a("p",[t._v("This example shows how to use tcmalloc in rust-sgx enclaves.")]),t._v(" "),a("p",[t._v("This tcmalloc is provided by Intel and located at "),a("code",[t._v("${SGXSDK}/lib64/libsgx_tcmalloc.a")]),t._v(". To link against tcmalloc, the following link flag is required, and placed before link flag of "),a("code",[t._v("-lsgx_tstdc")]),t._v(":")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("-Wl,--whole-archive -lsgx_tcmalloc -Wl,--no-whole-archive\n")])])]),a("h2",{attrs:{id:"one-shot"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#one-shot"}},[t._v("#")]),t._v(" One shot")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ make TCMALLOC=1\n")])])]),a("p",[t._v("This would enable the linking flag "),a("code",[t._v("-lsgx_tcmalloc")]),t._v(".")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ make\n")])])]),a("p",[t._v("This would use the default 'dlmalloc'.")]),t._v(" "),a("h2",{attrs:{id:"comparison-with-traditional-allocator-dlmalloc"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#comparison-with-traditional-allocator-dlmalloc"}},[t._v("#")]),t._v(" Comparison with traditional allocator (dlmalloc)")]),t._v(" "),a("p",[t._v("We provide a sample workload which only allocate buffers:")]),t._v(" "),a("div",{staticClass:"language-rust extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('fn recursive_memory_func(x: u64, multiplier: u64) -> u64 {\n    let v: Vec<u64> = Vec::with_capacity((x * multiplier) as usize);\n    let p: u64 = v.as_ptr() as u64;\n    //println!("ptr = {:X}", p);\n    if x != 0 {\n        p + recursive_memory_func(x - 1, multiplier)\n    } else { p }\n}\n')])])]),a("p",[t._v("Small buffer test settings: "),a("code",[t._v("multiplier = 1")]),t._v(" and initiate "),a("code",[t._v("x = 2000")]),t._v(".")]),t._v(" "),a("p",[t._v("Large buffer test settings: "),a("code",[t._v("multiplier = 100")]),t._v(" and initiate "),a("code",[t._v("x = 1000")]),t._v(".")]),t._v(" "),a("p",[t._v("Please test the performance by yourself. Here is my result (i9-9900k, DDR4-3200):")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"center"}}),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("dlmalloc")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("tcmalloc")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("small payload (1x size, 2000 depth)")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("1.306730572s")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("674.858065ms")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("large payload (100x size, 1000 depth)")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("874.595932ms")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("1.519623607s")])])])])])}),[],!1,null,null,null);e.default=s.exports}}]);