(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{416:function(e,t,s){"use strict";s.r(t);var a=s(27),n=Object(a.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h2",{attrs:{id:"background"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#background"}},[e._v("#")]),e._v(" Background")]),e._v(" "),s("p",[e._v("Intel issued "),s("a",{attrs:{href:"https://www.intel.com/content/www/us/en/security-center/advisory/intel-sa-00219.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Intel SA-00219")]),e._v(" on Nov 12, 2019, with CVE number "),s("a",{attrs:{href:"http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-0117",target:"_blank",rel:"noopener noreferrer"}},[e._v("CVE-2019-0117")]),e._v(". Intel also published a "),s("a",{attrs:{href:"https://software.intel.com/en-us/download/intel-sgx-sdk-developer-guidance-intel-sa-00219",target:"_blank",rel:"noopener noreferrer"}},[e._v("guidance")]),e._v(" to instruct the developers/researchers. Then Intel released "),s("a",{attrs:{href:"https://01.org/intel-softwareguard-extensions/downloads/intel-sgx-linux-2.7.1-release-version-string-2.7.101.3",target:"_blank",rel:"noopener noreferrer"}},[e._v("Intel SGX SDK v2.7.1")]),e._v(", including new memory allocation primitives and corresponding patches in PSW enclaves.")]),e._v(" "),s("p",[e._v("This article is to help people understand Intel-SA-00219, and how Teaclave SGX SDK handles it.")]),e._v(" "),s("h2",{attrs:{id:"the-problem-statement-and-my-thoughts"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#the-problem-statement-and-my-thoughts"}},[e._v("#")]),e._v(" The problem statement and my thoughts")]),e._v(" "),s("p",[e._v("The only statement I found is on the "),s("a",{attrs:{href:"https://www.intel.com/content/www/us/en/security-center/advisory/intel-sa-00219.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Intel-SA-00219 page")]),e._v(":")]),e._v(" "),s("blockquote",[s("p",[e._v("Organize the code/data within enclave memory to avoid putting sensitive materials in DWORD0 and DWORD1 of cache line. The effectiveness of this mitigation is dependent on the ability for the software to avoid the affected memory region. To assist the enclave application providers to modify their code, Intel is releasing SGX SDK update (Windows version 2.5.101.3, Linux version 2.7.101.3) with new memory allocation APIs to avoid the affected memory region. More details about the APIs can be found "),s("a",{attrs:{href:"https://software.intel.com/en-us/download/intel-sgx-sdk-developer-guidance-intel-sa-00219",target:"_blank",rel:"noopener noreferrer"}},[e._v("here")]),e._v(".")])]),e._v(" "),s("p",[e._v("Intel does not directly describe the vulnerability here. But it's clear that the 64-byte cache line would contain 8-byte or sensitive data, which can be keys protected by Intel SGX. So the following memory layout can be problematic in SGX:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v(" --------------------------------------------------------------------------------------\n| attacker accessible data A | private key (inaccessible) | attacker accessible data B |\n --------------------------------------------------------------------------------------\n")])])]),s("p",[e._v("It's equal to a vulnerable data structure like:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("struct foo {\n    uint64_t A;\n    uint64_t secret;\n    uint64_t B;\n}\n")])])]),s("p",[e._v("where "),s("code",[e._v("foo.A")]),e._v(" and "),s("code",[e._v("foo.B")]),e._v(" are accessible by design, while "),s("code",[e._v("foo.secret")]),e._v(" is not.")]),e._v(" "),s("p",[e._v('If an attacker somehow can access either A or B, he probably will have first or last 8-byte of the "inaccessible" secret in cache line. Then something bad may happen.')]),e._v(" "),s("p",[e._v('So, the most straightforward mitigation is to insert additional "guard bytes" before and after the sensitive data:')]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v(" ----------------------------------------------------------------------------------------------\n| attacker data A | 8-byte guard | private key (inaccessible) | 8-byte guard | attacker data B |\n ----------------------------------------------------------------------------------------------\n")])])]),s("p",[e._v("It results in a modified structure like")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("struct foo {\n    uint64_t A;\n    (private) uint64_t _guard0;\n    uint64_t secret;\n    (private) uint64_t _guard1;\n    uint64_t B;\n}\n")])])]),s("p",[e._v("Further investigation from Intel's code reveals that "),s("code",[e._v("_guard1")]),e._v(" is not required. So it can be:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("     -------------------------------------------------------------------------------\n    | attacker data A | 8-byte guard | private key (inaccessible) | attacker data B |\n     -------------------------------------------------------------------------------\n")])])]),s("h2",{attrs:{id:"intel-s-new-allocator-primitive"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#intel-s-new-allocator-primitive"}},[e._v("#")]),e._v(" Intel's new allocator primitive")]),e._v(" "),s("p",[e._v("Intel's guidance provides:")]),e._v(" "),s("p",[e._v("(1) A C++ template "),s("code",[e._v("custom_alignment_aligned")]),e._v("\n(2) A C function "),s("code",[e._v("sgx_get_aligned_ptr")]),e._v(" and one of its parameter's type "),s("code",[e._v("struct align_req_t")]),e._v("\n(3) A dynamic memory allocator function "),s("code",[e._v("sgx_aligned_malloc")])]),e._v(" "),s("p",[e._v("After spending hours on Intel's code, I realized that these primitives are helping developers allocate a larger object which:")]),e._v(" "),s("p",[e._v('a) contains all fields of the original object.\nb) adds "guard bytes" before and after each "specified secret field".\nc) align each "specified secret field" on demand')]),e._v(" "),s("h2",{attrs:{id:"intel-s-patches-on-psw-enclaves"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#intel-s-patches-on-psw-enclaves"}},[e._v("#")]),e._v(" Intel's patches on PSW enclaves")]),e._v(" "),s("p",[e._v("The most easy to understand example is from "),s("code",[e._v("psw/ae/pse_op/session_mgr.cpp")]),e._v(":")]),e._v(" "),s("div",{staticClass:"language-diff extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("@@ -417,7 +461,12 @@ pse_op_error_t pse_exchange_report(uint64_t tick,\n {\n     pse_op_error_t status = OP_SUCCESS;\n     sgx_dh_session_t sgx_dh_session;\n-    sgx_key_128bit_t aek;\n+    //\n+    // securely align aek\n+    //\n+    //sgx_key_128bit_t aek;\n+    sgx::custom_alignment_aligned<sgx_key_128bit_t, sizeof(sgx_key_128bit_t), 0, sizeof(sgx_key_128bit_t)> oaek;\n+    sgx_key_128bit_t& aek = oaek.v;\n     sgx_dh_session_enclave_identity_t initiator_identity;\n     cse_sec_prop_t * pcse_sec = NULL;\n     secu_info_t* psec_info = NULL;\n")])])]),s("p",[e._v("The template generates a larger struct "),s("code",[e._v("oaek")]),e._v(". Size of "),s("code",[e._v("sgx_key_128bit_t")]),e._v(" is 16 bytes, and "),s("code",[e._v("sizeof(oaek)")]),e._v(" equals to 32. And the offset of "),s("code",[e._v("oaek.v")]),e._v(" is 8.")]),e._v(" "),s("p",[e._v("And in the same file, another fix is:")]),e._v(" "),s("div",{staticClass:"language-diff extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('--- a/psw/ae/pse/pse_op/session_mgr.cpp\n+++ b/psw/ae/pse/pse_op/session_mgr.cpp\n@@ -29,21 +29,65 @@\n  *\n  */\n\n-\n+#include <sgx_secure_align.h>\n #include "utility.h"\n #include "session_mgr.h"\n #include "pse_op_t.h"\n #include "sgx_dh.h"\n\n // ISV enclave <-> pse-op sessions\n-static pse_session_t        g_session[SESSION_CONNECTION];\n+//\n+// securely align all ISV enclave - pse sessions\' secrets\n+//\n+static sgx::custom_alignment_aligned<pse_session_t, 16, __builtin_offsetof(pse_session_t, active.AEK), 16> og_session[SESSION_CONNECTION];\n+//\n+// following allows existing references to g_session[index]\n+// to not have to change\n+//\n+class CSessions\n+{\n+public:\n+    pse_session_t& operator[](int index) {\n+        return og_session[index].v;\n+    }\n+};\n+static CSessions g_session;\n static uint32_t             g_session_count = 0;\n')])])]),s("p",[e._v("It seems that the original global "),s("code",[e._v("g_session")]),e._v(" array is vulnerabile to INTEL-SA-00219. So Intel created a new structure "),s("code",[e._v("CSessions")]),e._v(" and reloaded the "),s("code",[e._v("[]")]),e._v(" operator, and used "),s("code",[e._v("custom_alignment_aligned")]),e._v(" template to create the array of guarded "),s("code",[e._v("CSessions")]),e._v(".")]),e._v(" "),s("p",[e._v("We can see some more complex samples in the same file, such as:")]),e._v(" "),s("div",{staticClass:"language-diff extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v(" // ephemeral session global variables\n static uint8_t              g_nonce_r_pse[EPH_SESSION_NONCE_SIZE] = {0};      // nonce R(PSE) for ephemeral session establishment\n static uint8_t              g_nonce_r_cse[EPH_SESSION_NONCE_SIZE] = {0};      // nonce R(CSE) for ephemeral session establishment\n-static pairing_data_t       g_pairing_data;                       // unsealed pairing data\n-eph_session_t               g_eph_session;                        // ephemeral session information\n+\n+//\n+// securely align pairing data\n+// Id_pse and Id_cse aren't secrets\n+// I don't think pairingNonce is a secret and even if it is, we can't align\n+// all of [mk, sk, pairingID, pairingNonce]\n+//\n+//static pairing_data_t       g_pairing_data;                       // unsealed pairing data\n+static sgx::custom_alignment<pairing_data_t,\n+    //__builtin_offsetof(pairing_data_t, secret_data.Id_pse), sizeof(((pairing_data_t*)0)->secret_data.Id_pse),\n+    //__builtin_offsetof(pairing_data_t, secret_data.Id_cse), sizeof(((pairing_data_t*)0)->secret_data.Id_cse),\n+    __builtin_offsetof(pairing_data_t, secret_data.mk), sizeof(((pairing_data_t*)0)->secret_data.mk),\n+    __builtin_offsetof(pairing_data_t, secret_data.sk), sizeof(((pairing_data_t*)0)->secret_data.sk),\n+    __builtin_offsetof(pairing_data_t, secret_data.pairingID), sizeof(((pairing_data_t*)0)->secret_data.pairingID)\n+    //__builtin_offsetof(pairing_data_t, secret_data.pairingNonce), sizeof(((pairing_data_t*)0)->secret_data.pairingNonce)\n+    > opairing_data;\n+pairing_data_t& g_pairing_data = opairing_data.v;\n+//\n+// securely align pse - cse/psda ephemeral session secrets\n+//\n+//eph_session_t               g_eph_session;                        // ephemeral session information\n+sgx::custom_alignment<eph_session_t,\n+    __builtin_offsetof(eph_session_t, TSK), sizeof(((eph_session_t*)0)->TSK),\n+    __builtin_offsetof(eph_session_t, TMK), sizeof(((eph_session_t*)0)->TMK)\n+> oeph_session;\n+//\n+// this reference trick requires change to declaration\n+// in other files, but still cleaner than changing\n+// all references\n+//\n+eph_session_t& g_eph_session = oeph_session.v;\n\n /**\n  * @brief Check the status of the ephemeral session\n")])])]),s("p",[e._v("To understand it, let me expand "),s("code",[e._v("struct pairing_data_t")]),e._v(" here:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("/* Pairing blob unsealed and usable inside of enclave*/\ntypedef struct _pairing_data_t\n{\n    se_plaintext_pairing_data_t plaintext; // does not involved\n    struct se_secret_pairing_data_t {\n            SHA256_HASH         Id_pse;\n            SHA256_HASH         Id_cse;\n            SIGMA_MAC_KEY       mk;\n            SIGMA_SECRET_KEY    sk;\n            SIGMA_SECRET_KEY    pairingID;  // old_sk used for repairing check\n            Nonce128_t          pairingNonce;\n            EcDsaPrivKey        VerifierPrivateKey;\n    } secret_data;\n} pairing_data_t;\n")])])]),s("p",[e._v("The patch seems to protect "),s("code",[e._v("mk")]),e._v(", "),s("code",[e._v("sk")]),e._v(", and "),s("code",[e._v("pairingID")]),e._v(", and all the other fields are commented out. What's more, this patch uses a "),s("strong",[e._v("undocumented")]),e._v(" template "),s("code",[e._v("sgx::custom_alignment")]),e._v(" defined as:")]),e._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("    template <class T, std::size_t... OLs>\n    using custom_alignment = custom_alignment_aligned<T, alignof(T), OLs...>;\n")])])]),s("h2",{attrs:{id:"experiments-on-the-undocument-template"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#experiments-on-the-undocument-template"}},[e._v("#")]),e._v(" Experiments on the undocument template")]),e._v(" "),s("p",[e._v("To test how the undocumented template work, I write the following codes:")]),e._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('    struct foo {\n        uint64_t secret1[5];       // offset = 0\n    };\n\n    typedef sgx::custom_alignment<foo, __builtin_offsetof(foo, secret1), sizeof(((foo*)0)->secret1)> AFOO;\n\n    printf("=== Size of foo = %u ===\\n", sizeof(foo));                               // 40\n    printf("=== Size of bar = %u ===\\n", sizeof(AFOO));                              // 64\n    printf("=== offset of AROO.v = %u ===\\n", __builtin_offsetof(AFOO, v));          // 8\n    printf("=== offset of secret1 = %u ===\\n", __builtin_offsetof(AFOO, v.secret1)); // 8\n')])])]),s("p",[e._v("So we can see that the structure of AROO is:")]),e._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("struct AROO {\n    uint64_t _padding_head[1]         // offset = 0, len = 8\n    struct {\n        uint64_t secret1[5];          // offset = 8, len = 40\n    } v;\n    uint64_t _padding_tail[2];        // offset = 40, len = 16\n")])])]),s("p",[e._v("It seems the undocumented C++ template aligns "),s("code",[e._v("AROO")]),e._v(" to the next level, and add 8-byte headings into it. If we add the second secret in "),s("code",[e._v("foo")]),e._v(" like:")]),e._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('    struct foo {\n        uint64_t secret1[5];       // offset = 0\n        uint64_t secret2[1];       // offset = 40\n    };\n\n    typedef sgx::custom_alignment<foo,\n                __builtin_offsetof(foo, secret1), sizeof(((foo*)0)->secret1),\n                __builtin_offsetof(foo, secret2), sizeof(((foo*)0)->secret2)\n            > AFOO;\n\n    printf("=== Size of foo = %u ===\\n", sizeof(foo));            // 48\n    printf("=== Size of bar = %u ===\\n", sizeof(AFOO));           // 64\n    printf("=== offset of AROO.v = %u ===\\n", __builtin_offsetof(AFOO, v));           // 8\n    printf("=== offset of AROO.v.secret1 = %u ===\\n", __builtin_offsetof(AFOO, v.secret1));           // 8\n    printf("=== offset of AROO.v.secret2 = %u ===\\n", __builtin_offsetof(AFOO, v.secret2));           // 48\n')])])]),s("p",[e._v("we can see that the structure of AROO is:")]),e._v(" "),s("div",{staticClass:"language-cpp extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("struct AROO {\n    uint64_t _padding_head[1]         // offset = 0, len = 8\n    struct {\n        uint64_t secret1[5];          // offset = 8, len = 40\n        uint64_t secret2[1];          // offset = 48, len = 8\n    } v;\n    uint64_t _padding_tail[1];        // offset = 56, len = 8\n")])])]),s("p",[e._v("If we increase "),s("code",[e._v("secret2")]),e._v(" to 16-bytes, it works well as usual. And the "),s("code",[e._v("_padding_tail")]),e._v(" will have "),s("strong",[e._v("zero length")]),e._v(". So does it means that "),s("em",[e._v("only extra heading is required for mitigation")]),e._v("? But it'll not compile if we make "),s("code",[e._v("secret2")]),e._v(" 24-bytes, like:")]),e._v(" "),s("div",{staticClass:"language-c++ extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("    struct foo {\n        uint64_t secret1[5];       // offset = 0\n        uint64_t secret2[3];       // offset = 40\n    };\n\n    typedef sgx::custom_alignment<foo,\n                __builtin_offsetof(foo, secret1), sizeof(((foo*)0)->secret1),\n                __builtin_offsetof(foo, secret2), sizeof(((foo*)0)->secret2)\n            > AFOO;\n")])])]),s("p",[e._v("GCC would terminate on:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("make[1]: Entering directory '/root/linux-sgx/SampleCode/Cxx11SGXDemo'\nIn file included from Enclave/TrustedLibrary/Libcxx.cpp:47:0:\n/opt/sgxsdk/include/sgx_secure_align.h: In instantiation of 'struct sgx::__custom_alignment_internal::custom_alignment<ecall_lambdas_demo()::foo, 8ul, -1>':\nEnclave/TrustedLibrary/Libcxx.cpp:125:53:   required from here\n/opt/sgxsdk/include/sgx_secure_align.h:123:13: error: static assertion failed: No viable offset\n             static_assert(LZ > 0, \"No viable offset\");\n             ^\n/opt/sgxsdk/include/sgx_secure_align.h:125:48: error: size of array is negative\n             char __no_secret_allowed_in_here[LZ];\n                                                ^\nMakefile:255: recipe for target 'Enclave/TrustedLibrary/Libcxx.o' failed\n")])])]),s("p",[e._v("Nothing changes if we switch to the original template "),s("code",[e._v("sgx::custom_alignment_aligned")]),e._v(". So I guess the template does not support structures:")]),e._v(" "),s("ul",[s("li",[e._v("contains secrets consecutively,  and")]),e._v(" "),s("li",[e._v("the consecutive secrets' size is larger than a certain number (not sure yet)")])]),e._v(" "),s("p",[e._v("If we break down "),s("code",[e._v("secret1")]),e._v(" and "),s("code",[e._v("secret2")]),e._v(" by inserting something in the middle, the template works:")]),e._v(" "),s("div",{staticClass:"language-c++ extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('struct foo {\n  uint64_t secret1[5];       // offset = 0\n  char     dumb;             // offset = 40\n  uint64_t secret2[3];       // offset = 48\n};\n\ntypedef sgx::custom_alignment<foo,\n__builtin_offsetof(foo, secret1), sizeof(((foo*)0)->secret1),\n__builtin_offsetof(foo, secret2), sizeof(((foo*)0)->secret2)\n  > AFOO;\n\nprintf("=== Size of foo = %u ===\\n", sizeof(foo));            // 72\nprintf("=== Size of bar = %u ===\\n", sizeof(AFOO));           // 128\nprintf("=== offset of AROO.v = %u ===\\n", __builtin_offsetof(AFOO, v));           // 24\nprintf("=== offset of AROO.v.secret1 = %u ===\\n", __builtin_offsetof(AFOO, v.secret1));           // 24\nprintf("=== offset of AROO.v.secret2 = %u ===\\n", __builtin_offsetof(AFOO, v.secret2));           // 72\n')])])]),s("h2",{attrs:{id:"changes-actions-required"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#changes-actions-required"}},[e._v("#")]),e._v(" Changes/Actions required")]),e._v(" "),s("p",[e._v("From Intel's usage, we can learn that:")]),e._v(" "),s("p",[e._v("**Don't construct a sensitive data structure directly. Always allocate an aligned structure and fill it up later **")]),e._v(" "),s("p",[e._v("It means:")]),e._v(" "),s("ul",[s("li",[e._v("if you allocate something sensitive (e.g. keys in "),s("code",[e._v("sgx_key_128bit_t")]),e._v(") on stack/heap, you probably need to allocate another guarded structure first, and get a mutable reference to its inner data.")]),e._v(" "),s("li",[e._v("if you want to make "),s("code",[e._v("sgx_key_128bit_t")]),e._v(" as the type of return value, you can choose between (1) return a guarded structure, or (2) takes an additional argument of caller-allocated, mutuable reference of "),s("code",[e._v("sgx_key_128bit_t")]),e._v(" and fill it.")])]),e._v(" "),s("h2",{attrs:{id:"rust-sgx-provided-primitive"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#rust-sgx-provided-primitive"}},[e._v("#")]),e._v(" Rust SGX provided primitive")]),e._v(" "),s("ul",[s("li",[s("p",[e._v("We provided "),s("code",[e._v("AlignBox")]),e._v(" as a replacement of "),s("code",[e._v("Box")])]),e._v(" "),s("ul",[s("li",[s("p",[s("code",[e._v("Box")]),e._v(' is somewhat tricky because it always "initialize on stack first and copy to heap later". '),s("a",{attrs:{href:"https://github.com/kvark/copyless",target:"_blank",rel:"noopener noreferrer"}},[e._v("copyless")]),e._v(" provides a novel primitive to solve "),s("a",{attrs:{href:"https://github.com/dingelish/realbox",target:"_blank",rel:"noopener noreferrer"}},[e._v("it but it does not always effective")]),e._v(". To this end, we created "),s("code",[e._v("AlignBox")]),e._v(' which guarantees "on-heap initialization" without copying any bits. Usage:')]),e._v(" "),s("div",{staticClass:"language-rust extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("let heap_align_obj = AlignBox::<struct_align_t>::heap_init_with_req(|mut t| {\n  t.key1 = [0xf0, 0xf1, 0xf2, 0xf3, 0xf4, 0xf5, 0xf6, 0xf7, 0xf8, 0xf9, 0xfa, 0xfb, 0xfc, 0xfd, 0xfe, 0xff];\n  t.pad1 = [0x00; 16];\n  t.key2 = [0xf0, 0xf1, 0xf2, 0xf3, 0xf4, 0xf5, 0xf6, 0xf7, 0xf8, 0xf9, 0xfa, 0xfb, 0xfc, 0xfd, 0xfe, 0xff];\n  t.pad2 = [0x00; 16];\n  t.key3 = [0xf0, 0xf1, 0xf2, 0xf3, 0xf4, 0xf5, 0xf6, 0xf7, 0xf8, 0xf9, 0xfa, 0xfb, 0xfc, 0xfd, 0xfe, 0xff];\n  t.pad3 = [0x00; 16];\n  t.key4 = [0xf0, 0xf1, 0xf2, 0xf3, 0xf4, 0xf5, 0xf6, 0xf7, 0xf8, 0xf9, 0xfa, 0xfb, 0xfc, 0xfd, 0xfe, 0xff];\n  }, 16, &str_slice);\nassert!(heap_align_obj.is_some());\n")])])])])])]),e._v(" "),s("li",[s("p",[e._v("We provided aligned key type for each built-in key type. The layout are calculated by Intel's template.")]),e._v(" "),s("ul",[s("li",[s("code",[e._v("sgx_align_key_128bit_t")])]),e._v(" "),s("li",[s("code",[e._v("sgx_align_mac_128bit_t")])]),e._v(" "),s("li",[s("code",[e._v("sgx_align_key_256bit_t")])]),e._v(" "),s("li",[s("code",[e._v("sgx_align_mac_256bit_t")])]),e._v(" "),s("li",[s("code",[e._v("sgx_align_ec256_dh_shared_t")])]),e._v(" "),s("li",[s("code",[e._v("sgx_align_ec256_private_t")])])])])]),e._v(" "),s("p",[e._v("We modified "),s("code",[e._v("sgx_tcrypto")]),e._v(", "),s("code",[e._v("sgx_tse")]),e._v(", and "),s("code",[e._v("sgx_tdh")]),e._v(" and use the above primitives for enhancement, following the above required changes. One sample is from "),s("code",[e._v("sgx_tcrypto")]),e._v(":")]),e._v(" "),s("div",{staticClass:"language-rust extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("+    let mut align_mac = sgx_align_mac_128bit_t::default();\n+    let ret = unsafe {\n+        sgx_rijndael128_cmac_msg(key as * const sgx_cmac_128bit_key_t,\n+                                 src.as_ptr() as * const u8,\n+                                 size as u32,\n+                                 &mut align_mac.mac as * mut sgx_cmac_128bit_tag_t)\n+    };\n")])])]),s("p",[e._v("We allocate an aligned structure first, and then fill it up using Intel's crypto primitive later.")])])}),[],!1,null,null,null);t.default=n.exports}}]);