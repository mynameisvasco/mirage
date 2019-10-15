(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/support/Home.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/support/Home.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../store/store */ "./resources/js/src/store/store.js");
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
      tickets: {
        num: 0,
        solved: 0,
        unsolved: 0
      },
      invoices: {
        num: 0,
        paid: 0,
        unpaid: 0,
        totalMoney: 0
      }
    };
  },
  methods: {
    getStats: function getStats() {
      var _this = this;

      this.$http.get('/api/stats', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(function (response) {
        //Tickets
        _this.tickets.num = response.data.tickets.numTickets;
        _this.tickets.solved = response.data.tickets.solvedTickets;
        _this.tickets.unsolved = response.data.tickets.unsolvedTickets; //Invoices

        _this.invoices.num = response.data.invoices.numInvoices;
        _this.invoices.paid = response.data.invoices.paidInvoices;
        _this.invoices.unpaid = response.data.invoices.unpaidInvoices;
        _this.invoices.totalMoney = response.data.invoices.totalMoney;
      })["catch"](function (error) {
        console.log(error);
      });
    },
    numberWithCommas: function numberWithCommas(x) {
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }
  },
  mounted: function mounted() {
    this.getStats();
  },
  computed: {
    user: function user() {
      return this.$store.state.AppActiveUser;
    }
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    if (_store_store__WEBPACK_IMPORTED_MODULE_0__["default"].state.AppActiveUser.rank != 1) {
      next('/login');
    } else {
      next();
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/support/Home.vue?vue&type=template&id=347611c9&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/support/Home.vue?vue&type=template&id=347611c9& ***!
  \**************************************************************************************************************************************************************************************************************/
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
              {
                staticClass: "mb-6",
                attrs: {
                  "vs-type": "flex",
                  "vs-justify": "center",
                  "vs-align": "center",
                  "vs-lg": "6",
                  "vs-md": "12",
                  "vs-sm": "12",
                  "vs-w": "12"
                }
              },
              [
                _c(
                  "vx-card",
                  {
                    staticClass:
                      "h-100 text-center bg-primary-gradient greet-user"
                  },
                  [
                    _c("img", {
                      staticStyle: {
                        position: "absolute",
                        left: "0",
                        top: "0"
                      },
                      attrs: {
                        src: __webpack_require__(/*! @assets/images/elements/decore-left.png */ "./resources/assets/images/elements/decore-left.png"),
                        alt: "Decore Left",
                        width: "200"
                      }
                    }),
                    _vm._v(" "),
                    _c("img", {
                      staticStyle: {
                        position: "absolute",
                        right: "0",
                        top: "0"
                      },
                      attrs: {
                        src: __webpack_require__(/*! @assets/images/elements/decore-right.png */ "./resources/assets/images/elements/decore-right.png"),
                        alt: "Decore Right",
                        width: "175"
                      }
                    }),
                    _vm._v(" "),
                    _c("feather-icon", {
                      staticClass:
                        "p-6 mb-8 bg-primary inline-flex rounded-full text-white shadow",
                      attrs: { icon: "AwardIcon", svgClasses: "h-8 w-8" }
                    }),
                    _vm._v(" "),
                    _c("h1", { staticClass: "mb-6 text-white" }, [
                      _vm._v("Welcome back " + _vm._s(_vm.user.name) + ",")
                    ]),
                    _vm._v(" "),
                    _c(
                      "p",
                      {
                        staticClass:
                          "xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-white"
                      },
                      [
                        _vm._v(
                          "We selected the best statistics about your business to present you in this page"
                        )
                      ]
                    )
                  ],
                  1
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "vs-col",
              {
                attrs: {
                  "vs-lg": "6",
                  "vs-md": "12",
                  "vs-sm": "12",
                  "vs-w": "12"
                }
              },
              [
                _c("vx-card", { attrs: { title: "Tickets tracker" } }, [
                  _c(
                    "div",
                    {
                      staticClass: "h-100",
                      attrs: { slot: "no-body" },
                      slot: "no-body"
                    },
                    [
                      _c(
                        "div",
                        { staticClass: "vx-row text-center" },
                        [
                          _c(
                            "vs-col",
                            {
                              staticClass: "mb-6 pt-5",
                              attrs: {
                                "vs-justify": "center",
                                "vs-align": "center",
                                "vs-lg": "4",
                                "vs-md": "4",
                                "vs-sm": "12",
                                "vs-w": "12"
                              }
                            },
                            [
                              _c("feather-icon", {
                                staticClass:
                                  "p-6 mt-6 mb-8 bg-primary inline-flex rounded-full text-white shadow",
                                attrs: {
                                  icon: "MessageSquareIcon",
                                  svgClasses: "h-8 w-8"
                                }
                              }),
                              _vm._v(" "),
                              _c("p", { staticClass: "text-center" }, [
                                _c("span", { staticClass: "block" }, [
                                  _vm._v("Total Tickets")
                                ]),
                                _c("span", { staticClass: "text-4xl" }, [
                                  _vm._v(
                                    _vm._s(
                                      _vm.numberWithCommas(this.tickets.num)
                                    )
                                  )
                                ])
                              ])
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "vs-col",
                            {
                              staticClass: "mb-6 pt-5",
                              attrs: {
                                "vs-justify": "center",
                                "vs-align": "center",
                                "vs-lg": "4",
                                "vs-md": "4",
                                "vs-sm": "12",
                                "vs-w": "12"
                              }
                            },
                            [
                              _c("feather-icon", {
                                staticClass:
                                  "p-6 mt-6 mb-8 bg-success inline-flex rounded-full text-white shadow",
                                attrs: {
                                  icon: "CheckIcon",
                                  svgClasses: "h-8 w-8"
                                }
                              }),
                              _vm._v(" "),
                              _c("p", { staticClass: "text-center" }, [
                                _c("span", { staticClass: "block" }, [
                                  _vm._v("Resolved Tickets")
                                ]),
                                _c("span", { staticClass: "text-4xl" }, [
                                  _vm._v(
                                    _vm._s(
                                      _vm.numberWithCommas(this.tickets.solved)
                                    )
                                  )
                                ])
                              ])
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "vs-col",
                            {
                              staticClass: "mb-6 pt-5",
                              attrs: {
                                "vs-justify": "center",
                                "vs-align": "center",
                                "vs-lg": "4",
                                "vs-md": "4",
                                "vs-sm": "12",
                                "vs-w": "12"
                              }
                            },
                            [
                              _c("feather-icon", {
                                staticClass:
                                  "p-6 mt-6 mb-8 bg-danger inline-flex rounded-full text-white shadow",
                                attrs: { icon: "XIcon", svgClasses: "h-8 w-8" }
                              }),
                              _vm._v(" "),
                              _c("p", { staticClass: "text-center" }, [
                                _c("span", { staticClass: "block" }, [
                                  _vm._v("Unresolved Tickets")
                                ]),
                                _c("span", { staticClass: "text-4xl" }, [
                                  _vm._v(
                                    _vm._s(
                                      _vm.numberWithCommas(
                                        this.tickets.unsolved
                                      )
                                    )
                                  )
                                ])
                              ])
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ]
                  )
                ])
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

/***/ "./resources/assets/images/elements/decore-left.png":
/*!**********************************************************!*\
  !*** ./resources/assets/images/elements/decore-left.png ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/images/decore-left.png?2d9d23e097d9118c0aa4cc074b6c5b22";

/***/ }),

/***/ "./resources/assets/images/elements/decore-right.png":
/*!***********************************************************!*\
  !*** ./resources/assets/images/elements/decore-right.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/images/decore-right.png?da0ab5cda39e974268cbe4da64f597b6";

/***/ }),

/***/ "./resources/js/src/views/support/Home.vue":
/*!*************************************************!*\
  !*** ./resources/js/src/views/support/Home.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Home_vue_vue_type_template_id_347611c9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Home.vue?vue&type=template&id=347611c9& */ "./resources/js/src/views/support/Home.vue?vue&type=template&id=347611c9&");
/* harmony import */ var _Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Home.vue?vue&type=script&lang=js& */ "./resources/js/src/views/support/Home.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Home_vue_vue_type_template_id_347611c9___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Home_vue_vue_type_template_id_347611c9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/support/Home.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/support/Home.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/src/views/support/Home.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/support/Home.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/support/Home.vue?vue&type=template&id=347611c9&":
/*!********************************************************************************!*\
  !*** ./resources/js/src/views/support/Home.vue?vue&type=template&id=347611c9& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_347611c9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=template&id=347611c9& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/support/Home.vue?vue&type=template&id=347611c9&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_347611c9___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_347611c9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);