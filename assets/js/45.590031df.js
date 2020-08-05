(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{428:function(e,t,i){"use strict";i.r(t);var n=i(27),a=Object(n.a)({},(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[i("h1",{attrs:{id:"built-in-functions"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#built-in-functions"}},[e._v("#")]),e._v(" Built-in Functions")]),e._v(" "),i("p",[e._v("Since Teaclave is a FaaS-like platform, users can define and register customized\nfunctions (e.g., written in Python). To make data computation more easier and\nfaster (in native speed), the platform also provide some commonly used functions\nwritten in Rust. We call them built-in functions. These functions can be\nselectively compiled in the "),i("em",[e._v("built-in executor")]),e._v(' with a "builtin" prefix in the\nfunction names. Users can selectively invoke these build-in functions by their\nnames.')]),e._v(" "),i("p",[e._v("Currently, we have these built-in functions:")]),e._v(" "),i("ul",[i("li",[i("code",[e._v("builtin-echo")]),e._v(": Return the original input message.")]),e._v(" "),i("li",[i("code",[e._v("builtin-gbdt-train")]),e._v(": Use input data to train a GBDT model.")]),e._v(" "),i("li",[i("code",[e._v("builtin-gbdt-predict")]),e._v(": GBDT prediction with input model and input test data.")]),e._v(" "),i("li",[i("code",[e._v("bulitin-logistic-regression-train")]),e._v(": Use input data to train a LR model.")]),e._v(" "),i("li",[i("code",[e._v("builtin-logistic-regression-predict")]),e._v(": LR prediction with input model and input test data.")]),e._v(" "),i("li",[i("code",[e._v("builtin-private-join-and-compute")]),e._v(": Find intersection of muti-parties' input\ndata and compute sum of the common items.")]),e._v(" "),i("li",[i("code",[e._v("builtin-ordered-set-intersect")]),e._v(": Allow two parties to compute the\nintersection of their ordered sets without revealing anything except for the\nelements in the intersection. Users should calculate hash values of each item\nand upload them as a sorted list.")]),e._v(" "),i("li",[i("code",[e._v("builtin-rsa-sign")]),e._v(": Signing data with RSA key.")]),e._v(" "),i("li",[i("code",[e._v("builtin-face-detection")]),e._v(": an implementation of Funnel-Structured cascade,\nwhich is designed for real-time multi-view face detection.")])]),e._v(" "),i("p",[e._v("The function arguments are in JSON format and can be serialized to a Rust struct\nvery easily. You can learn more about supported arguments in the implementation\nof a specific built-in function.")])])}),[],!1,null,null,null);t.default=a.exports}}]);