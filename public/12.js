(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/client/Invoices.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/client/Invoices.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      invoices: []
    };
  },
  methods: {
    convertStatusName: function convertStatusName(status) {
      if (status === 0) {
        return {
          status: 'warning',
          text: 'Unpaid'
        };
      } else if (status === 1) {
        return {
          status: 'success',
          text: 'Paid'
        };
      } else if (status === 2) {
        return {
          status: 'danger',
          text: 'Overdue'
        };
      } else {
        return {
          status: 'primary',
          text: 'Unknown'
        };
      }
    },
    getInvoices: function getInvoices() {
      var _this = this;

      this.$http.get('/api/invoices', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(function (response) {
        _this.invoices = response.data;
      })["catch"](function (error) {
        console.log(error);
      });
    },
    openInvoice: function openInvoice(url) {
      window.open("/storage/invoices/" + url, '_blank');
    }
  },
  mounted: function mounted() {
    this.getInvoices();
  },
  computed: {
    user: function user() {
      return this.$store.state.AppActiveUser;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/client/Invoices.vue?vue&type=template&id=c58034a0&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/client/Invoices.vue?vue&type=template&id=c58034a0& ***!
  \*****************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "flex" }, [
    _c(
      "div",
      { staticClass: "w-full mt-6" },
      [
        _c(
          "vs-row",
          [
            _c(
              "vs-col",
              { attrs: { "vs-w": "12" } },
              [
                _c(
                  "vs-table",
                  {
                    attrs: {
                      search: "",
                      "max-items": "10",
                      pagination: "",
                      data: _vm.invoices
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(ref) {
                          var data = ref.data
                          return _vm._l(data, function(tr, indextr) {
                            return _c(
                              "vs-tr",
                              { key: indextr, attrs: { data: tr } },
                              [
                                _c(
                                  "vs-td",
                                  { attrs: { data: data[indextr].name } },
                                  [
                                    _vm._v(
                                      "\n\t\t\t\t\t\t\t\t\t" +
                                        _vm._s(data[indextr].name) +
                                        "\n\t\t\t\t\t\t\t\t"
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "vs-td",
                                  { attrs: { data: data[indextr].dueDate } },
                                  [
                                    _vm._v(
                                      "\n\t\t\t\t\t\t\t\t\t" +
                                        _vm._s(data[indextr].dueDate) +
                                        "\n\t\t\t\t\t\t\t\t"
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "vs-td",
                                  { attrs: { data: data[indextr].totalMoney } },
                                  [
                                    _vm._v(
                                      "\n\t\t\t\t\t\t\t\t\t" +
                                        _vm._s(data[indextr].totalMoney) +
                                        " " +
                                        _vm._s(data[indextr].currency) +
                                        "\n\t\t\t\t\t\t\t\t"
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "vs-td",
                                  { attrs: { data: data[indextr].id } },
                                  [
                                    _c(
                                      "vs-chip",
                                      {
                                        attrs: {
                                          color: _vm.convertStatusName(
                                            data[indextr].status
                                          ).status
                                        }
                                      },
                                      [
                                        _vm._v(
                                          _vm._s(
                                            _vm.convertStatusName(
                                              data[indextr].status
                                            ).text
                                          )
                                        )
                                      ]
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "vs-td",
                                  { attrs: { data: data[indextr].id } },
                                  [
                                    _c(
                                      "vs-button",
                                      {
                                        attrs: {
                                          "icon-pack": "feather",
                                          icon: "icon-globe",
                                          color: "primary"
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.openInvoice(
                                              data[indextr].url
                                            )
                                          }
                                        }
                                      },
                                      [_vm._v("Open")]
                                    )
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          })
                        }
                      }
                    ])
                  },
                  [
                    _c("template", { slot: "header" }, [
                      _c("h3", { staticClass: "mb-5" }, [
                        _vm._v("\n\t\t\t\t\t\t\t\tInvoices\n\t\t\t\t\t\t\t")
                      ])
                    ]),
                    _vm._v(" "),
                    _c(
                      "template",
                      { slot: "thead" },
                      [
                        _c("vs-th", [
                          _vm._v("\n\t\t\t\t\t\t\t\tName\n\t\t\t\t\t\t\t")
                        ]),
                        _vm._v(" "),
                        _c("vs-th", [
                          _vm._v("\n\t\t\t\t\t\t\t\tDue Date\n\t\t\t\t\t\t\t")
                        ]),
                        _vm._v(" "),
                        _c("vs-th", { attrs: { "sort-key": "status" } }, [
                          _vm._v("\n\t\t\t\t\t\t\t\tTotal Cost\n\t\t\t\t\t\t\t")
                        ]),
                        _vm._v(" "),
                        _c("vs-th", { attrs: { "sort-key": "status" } }, [
                          _vm._v("\n\t\t\t\t\t\t\t\tStatus\n\t\t\t\t\t\t\t")
                        ]),
                        _vm._v(" "),
                        _c("vs-th")
                      ],
                      1
                    )
                  ],
                  2
                )
              ],
              1
            )
          ],
          1
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/client/Invoices.vue":
/*!****************************************************!*\
  !*** ./resources/js/src/views/client/Invoices.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Invoices_vue_vue_type_template_id_c58034a0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Invoices.vue?vue&type=template&id=c58034a0& */ "./resources/js/src/views/client/Invoices.vue?vue&type=template&id=c58034a0&");
/* harmony import */ var _Invoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Invoices.vue?vue&type=script&lang=js& */ "./resources/js/src/views/client/Invoices.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Invoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Invoices_vue_vue_type_template_id_c58034a0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Invoices_vue_vue_type_template_id_c58034a0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/client/Invoices.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/client/Invoices.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/src/views/client/Invoices.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Invoices.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/client/Invoices.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/client/Invoices.vue?vue&type=template&id=c58034a0&":
/*!***********************************************************************************!*\
  !*** ./resources/js/src/views/client/Invoices.vue?vue&type=template&id=c58034a0& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_template_id_c58034a0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Invoices.vue?vue&type=template&id=c58034a0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/client/Invoices.vue?vue&type=template&id=c58034a0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_template_id_c58034a0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_template_id_c58034a0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);