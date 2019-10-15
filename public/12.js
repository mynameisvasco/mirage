(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/client/Company.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/client/Company.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
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
      company: {
        items: [{}]
      },
      itemToEdit: {},
      editPopupActive: false
    };
  },
  methods: {
    getCompanyInfo: function getCompanyInfo() {
      var _this = this;

      this.$http.get('/api/companies/' + this.$store.state.AppActiveUser.company_id, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(function (response) {
        _this.company = response.data;
        _this.company.items = response.data.items;
      })["catch"](function (error) {
        console.log(error);
      });
    },
    updateCompanyInfo: function updateCompanyInfo() {
      var _this2 = this;

      var formData = new FormData();
      formData.append('name', this.company.name);
      formData.append('address', this.company.address);
      formData.append('email', this.company.email);
      formData.append('phone', this.company.phone);
      formData.append('number', this.company.number);
      formData.append('picture', this.company.picture);
      formData.append('_method', 'PUT');
      this.$http.post('/api/companies/' + this.company.id, formData, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.token,
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        _this2.company = response.data;

        _this2.$vs.notify({
          title: 'Success!',
          text: 'Company was updated with success',
          color: 'success',
          position: 'top-right'
        });
      })["catch"](function (error) {
        //Show error notification
        Object.keys(error['response'].data.errors).forEach(function (key) {
          var message = String(error['response'].data.errors[key]).replace('["', '').replace('"]', ''); //Show error notification

          _this2.$vs.notify({
            title: 'Error!',
            text: message,
            color: 'danger',
            position: 'top-right'
          });
        });
      });
    },
    onFileChange: function onFileChange(event) {
      this.company.picture = event.target.files[0];
    },
    openEditPopUp: function openEditPopUp(item) {
      this.editPopupActive = true;
      this.itemToEdit = item;
    },
    editItem: function editItem() {
      var _this3 = this;

      var formData = new FormData();
      formData.append('description', this.itemToEdit.description);
      formData.append('_method', 'PUT');
      this.$http.post('/api/items/' + this.itemToEdit.id, formData, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.token,
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        for (var i = 0; i < _this3.company.items.length; i++) {
          if (_this3.company.items[i].id == response.data.id) {
            _this3.$set(_this3.company.items, i, response.data);
          }
        }

        _this3.$vs.notify({
          title: 'Success!',
          text: 'Company was updated with success',
          color: 'success',
          position: 'top-right'
        });
      })["catch"](function (error) {
        //Show error notification
        Object.keys(error['response'].data.errors).forEach(function (key) {
          var message = String(error['response'].data.errors[key]).replace('["', '').replace('"]', ''); //Show error notification

          _this3.$vs.notify({
            title: 'Error!',
            text: message,
            color: 'danger',
            position: 'top-right'
          });
        });
      });
    }
  },
  mounted: function mounted() {
    this.getCompanyInfo();
  },
  //Only admin clients can access this route
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    if (_store_store__WEBPACK_IMPORTED_MODULE_0__["default"].state.AppActiveUser.company_rank != 3) {
      next('/login');
    } else {
      next();
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/client/Company.vue?vue&type=template&id=32ce4723&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/client/Company.vue?vue&type=template&id=32ce4723& ***!
  \****************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    [
      _c(
        "vs-popup",
        {
          staticClass: "holamundo",
          attrs: {
            "background-color": "rgba(0,0,0,.6)",
            title: "Edit Item",
            active: _vm.editPopupActive
          },
          on: {
            "update:active": function($event) {
              _vm.editPopupActive = $event
            }
          }
        },
        [
          _c(
            "vs-row",
            [
              _c(
                "vs-col",
                {
                  staticClass: "mb-4",
                  attrs: { "vs-align": "center", "vs-sm": "12" }
                },
                [
                  _c("vs-input", {
                    staticClass: "w-full",
                    attrs: {
                      type: "text",
                      "icon-pack": "feather",
                      icon: "icon-edit",
                      "icon-no-border": "",
                      label: "Description"
                    },
                    model: {
                      value: _vm.itemToEdit.description,
                      callback: function($$v) {
                        _vm.$set(_vm.itemToEdit, "description", $$v)
                      },
                      expression: "itemToEdit.description"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "vs-col",
                { attrs: { "vs-w": "12" } },
                [
                  _c(
                    "vs-button",
                    {
                      attrs: {
                        color: "primary",
                        "icon-pack": "feather",
                        icon: "icon-save",
                        type: "filled"
                      },
                      on: {
                        click: function($event) {
                          return _vm.editItem()
                        }
                      }
                    },
                    [_vm._v("Save")]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm._m(0),
      _vm._v(" "),
      _c(
        "vs-row",
        { staticClass: "ml-0" },
        [
          _c(
            "vs-col",
            {
              staticClass: "mb-4",
              attrs: {
                "vs-align": "center",
                "vs-sm": "12",
                "vs-w": "12",
                "vs-md": "6",
                "vs-lg": "4"
              }
            },
            [
              _c(
                "div",
                { staticClass: "flex" },
                [
                  _c(
                    "vx-card",
                    { staticClass: "h-100", attrs: { title: "Informations" } },
                    [
                      _c(
                        "vs-row",
                        [
                          _c(
                            "vs-col",
                            {
                              staticClass: "mb-4",
                              attrs: {
                                "vs-w": "12",
                                "vs-lg": "4",
                                "vs-md": "6",
                                "vs-sm": "12"
                              }
                            },
                            [
                              !_vm.company.picture
                                ? _c("vs-avatar", {
                                    attrs: {
                                      size: "100px",
                                      color: "primary",
                                      text: _vm.company.name
                                    }
                                  })
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.company.picture
                                ? _c("vs-avatar", {
                                    attrs: {
                                      size: "100px",
                                      src:
                                        "/storage/companies/" +
                                        _vm.company.picture +
                                        "?" +
                                        Math.random()
                                    }
                                  })
                                : _vm._e()
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "vs-col",
                            {
                              staticClass: "mb-5",
                              attrs: { "vs-w": "12", "vs-lg": "6" }
                            },
                            [
                              _c("vs-input", {
                                staticClass: "w-full",
                                attrs: {
                                  type: "file",
                                  "icon-pack": "feather",
                                  icon: "icon-file",
                                  "icon-no-border": "",
                                  label: "Upload Logo"
                                },
                                on: { change: _vm.onFileChange }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "vs-col",
                            {
                              staticClass: "mb-4",
                              attrs: { "vs-align": "center", "vs-sm": "12" }
                            },
                            [
                              _c("vs-input", {
                                staticClass: "w-full",
                                attrs: {
                                  type: "text",
                                  "icon-pack": "feather",
                                  icon: "icon-truck",
                                  "icon-no-border": "",
                                  label: "Name"
                                },
                                model: {
                                  value: _vm.company.name,
                                  callback: function($$v) {
                                    _vm.$set(_vm.company, "name", $$v)
                                  },
                                  expression: "company.name"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "vs-col",
                            {
                              staticClass: "mb-4",
                              attrs: { "vs-align": "center", "vs-sm": "12" }
                            },
                            [
                              _c("vs-input", {
                                staticClass: "w-full",
                                attrs: {
                                  type: "text",
                                  "icon-pack": "feather",
                                  icon: "icon-map-pin",
                                  "icon-no-border": "",
                                  label: "Address"
                                },
                                model: {
                                  value: _vm.company.address,
                                  callback: function($$v) {
                                    _vm.$set(_vm.company, "address", $$v)
                                  },
                                  expression: "company.address"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "vs-col",
                            {
                              staticClass: "mb-4",
                              attrs: { "vs-align": "center", "vs-sm": "12" }
                            },
                            [
                              _c("vs-input", {
                                staticClass: "w-full",
                                attrs: {
                                  type: "text",
                                  "icon-pack": "feather",
                                  icon: "icon-mail",
                                  "icon-no-border": "",
                                  label: "Email"
                                },
                                model: {
                                  value: _vm.company.email,
                                  callback: function($$v) {
                                    _vm.$set(_vm.company, "email", $$v)
                                  },
                                  expression: "company.email"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "vs-col",
                            {
                              staticClass: "mb-4",
                              attrs: { "vs-align": "center", "vs-sm": "12" }
                            },
                            [
                              _c("vs-input", {
                                staticClass: "w-full",
                                attrs: {
                                  type: "text",
                                  "icon-pack": "feather",
                                  icon: "icon-phone",
                                  "icon-no-border": "",
                                  label: "Phone"
                                },
                                model: {
                                  value: _vm.company.phone,
                                  callback: function($$v) {
                                    _vm.$set(_vm.company, "phone", $$v)
                                  },
                                  expression: "company.phone"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "vs-col",
                            {
                              staticClass: "mb-4",
                              attrs: { "vs-align": "center", "vs-sm": "12" }
                            },
                            [
                              _c("vs-input", {
                                staticClass: "w-full",
                                attrs: {
                                  type: "text",
                                  "icon-pack": "feather",
                                  icon: "icon-hash",
                                  "icon-no-border": "",
                                  label: "Company No."
                                },
                                model: {
                                  value: _vm.company.number,
                                  callback: function($$v) {
                                    _vm.$set(_vm.company, "number", $$v)
                                  },
                                  expression: "company.number"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "vs-row",
                        {
                          attrs: {
                            "vs-justify": "center",
                            "vs-align": "center"
                          }
                        },
                        [
                          _c(
                            "vs-col",
                            {
                              staticClass: "mt-4",
                              attrs: {
                                "vs-type": "flex",
                                "vs-justify": "center",
                                "vs-align": "center",
                                "vs-w": "12"
                              }
                            },
                            [
                              _c(
                                "vs-button",
                                {
                                  attrs: {
                                    "icon-pack": "feather",
                                    icon: "icon-save",
                                    color: "primary"
                                  },
                                  on: {
                                    click: function($event) {
                                      return _vm.updateCompanyInfo()
                                    }
                                  }
                                },
                                [_vm._v("Save")]
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
                ],
                1
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "vs-col",
            {
              staticClass: "mb-4",
              attrs: {
                "vs-align": "center",
                "vs-sm": "12",
                "vs-w": "12",
                "vs-md": "6",
                "vs-lg": "4"
              }
            },
            [
              _c(
                "div",
                { staticClass: "flex" },
                [
                  _c(
                    "vx-card",
                    {
                      staticClass: "h-100",
                      attrs: { title: "Inventory Items" }
                    },
                    [
                      _c(
                        "vs-row",
                        [
                          _c(
                            "vs-col",
                            {
                              staticClass: "mb-5",
                              attrs: {
                                "vs-type": "flex",
                                "vs-justify": "center",
                                "vs-align": "center",
                                "vs-w": "12"
                              }
                            },
                            [
                              _c(
                                "vs-list",
                                [
                                  _c("vs-list-header", {
                                    attrs: { title: "Item Name" }
                                  }),
                                  _vm._v(" "),
                                  _vm._l(_vm.company.items, function(item) {
                                    return _c(
                                      "vs-list-item",
                                      {
                                        attrs: {
                                          title: item.name,
                                          subtitle: item.description
                                        }
                                      },
                                      [
                                        _c(
                                          "vs-button",
                                          {
                                            attrs: {
                                              size: "small",
                                              "icon-pack": "feather",
                                              icon: "icon-edit",
                                              color: "primary"
                                            },
                                            on: {
                                              click: function($event) {
                                                return _vm.openEditPopUp(item)
                                              }
                                            }
                                          },
                                          [_vm._v("Edit")]
                                        )
                                      ],
                                      1
                                    )
                                  }),
                                  _vm._v(" "),
                                  _vm.company.items.length == 0
                                    ? _c("vs-list-item", {
                                        attrs: {
                                          title: "No items added yet",
                                          subtitle:
                                            "Items will be displayed here"
                                        }
                                      })
                                    : _vm._e()
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
                ],
                1
              )
            ]
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "flex" }, [
      _c("h3", { staticClass: "mt-6 mb-5" }, [
        _vm._v("\n                Company\n            ")
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/client/Company.vue":
/*!***************************************************!*\
  !*** ./resources/js/src/views/client/Company.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Company_vue_vue_type_template_id_32ce4723___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Company.vue?vue&type=template&id=32ce4723& */ "./resources/js/src/views/client/Company.vue?vue&type=template&id=32ce4723&");
/* harmony import */ var _Company_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Company.vue?vue&type=script&lang=js& */ "./resources/js/src/views/client/Company.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Company_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Company_vue_vue_type_template_id_32ce4723___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Company_vue_vue_type_template_id_32ce4723___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/client/Company.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/client/Company.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/src/views/client/Company.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Company_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Company.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/client/Company.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Company_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/client/Company.vue?vue&type=template&id=32ce4723&":
/*!**********************************************************************************!*\
  !*** ./resources/js/src/views/client/Company.vue?vue&type=template&id=32ce4723& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Company_vue_vue_type_template_id_32ce4723___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Company.vue?vue&type=template&id=32ce4723& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/client/Company.vue?vue&type=template&id=32ce4723&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Company_vue_vue_type_template_id_32ce4723___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Company_vue_vue_type_template_id_32ce4723___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);