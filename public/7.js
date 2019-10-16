(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/Company.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/admin/Company.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
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
        taxes: [{}],
        items: [{}]
      },
      taxToAdd: {
        name: "",
        percentage: null
      },
      itemToAdd: {
        name: "",
        description: ""
      }
    };
  },
  methods: {
    getCompanyInfo: function getCompanyInfo() {
      var _this = this;

      this.$http.get('/api/companyinformations', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(function (response) {
        _this.company = response.data;
        _this.company.taxes = JSON.parse(response.data.taxes);
        _this.company.items = JSON.parse(response.data.items);
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
      formData.append('taxes', JSON.stringify(this.company.taxes));
      formData.append('items', JSON.stringify(this.company.items));
      formData.append('logo', this.company.logo);
      formData.append('_method', 'PUT');
      this.$http.post('/api/companyinformations/' + this.company.id, formData, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.token,
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        _this2.company = response.data;
        _this2.company.taxes = JSON.parse(response.data.taxes);
        _this2.company.items = JSON.parse(response.data.items);

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
      this.company.logo = event.target.files[0];
    },
    addTax: function addTax() {
      this.company.taxes.push(this.taxToAdd);
    },
    addItem: function addItem() {
      this.company.items.push(this.itemToAdd);
    },
    removeTax: function removeTax(name) {
      for (var i = 0; i < this.company.taxes.length; i++) {
        if (this.company.taxes[i].name == name) {
          this.$delete(this.company.taxes, i);
        }
      }
    },
    removeItem: function removeItem(name) {
      for (var i = 0; i < this.company.items.length; i++) {
        if (this.company.items[i].name == name) {
          this.$delete(this.company.items, i);
        }
      }
    }
  },
  mounted: function mounted() {
    this.getCompanyInfo();
  },
  //Only admins can access this route
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    if (_store_store__WEBPACK_IMPORTED_MODULE_0__["default"].state.AppActiveUser.rank != 3) {
      next('/login');
    } else {
      next();
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/Company.vue?vue&type=template&id=f019e6fa&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/admin/Company.vue?vue&type=template&id=f019e6fa& ***!
  \***************************************************************************************************************************************************************************************************************/
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
                              staticClass: "mb-5",
                              attrs: { "vs-w": "12", "vs-lg": "6" }
                            },
                            [
                              _c(
                                "label",
                                {
                                  staticClass: "ml-1",
                                  staticStyle: { "font-size": "13px" }
                                },
                                [_vm._v("Current Logo")]
                              ),
                              _vm._v(" "),
                              _c("p", [
                                _c("img", {
                                  staticClass: "mb-4",
                                  staticStyle: {
                                    "background-color": "#eaeaea",
                                    "border-radius": "10px",
                                    padding: "6px"
                                  },
                                  attrs: {
                                    src:
                                      "/storage/company/logo.png?" +
                                      Math.random(),
                                    width: "100%"
                                  }
                                })
                              ])
                            ]
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
                        [
                          _c(
                            "vs-col",
                            {
                              staticClass: "mt-4",
                              attrs: { "vs-type": "flex", "vs-w": "12" }
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
                    { staticClass: "h-100", attrs: { title: "Taxes" } },
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
                                "vs-w": "12",
                                "vs-lg": "12"
                              }
                            },
                            [
                              _c("vs-input", {
                                staticClass: "w-full",
                                attrs: {
                                  type: "text",
                                  "icon-pack": "feather",
                                  icon: "icon-edit",
                                  "icon-no-border": "",
                                  label: "Name"
                                },
                                model: {
                                  value: _vm.taxToAdd.name,
                                  callback: function($$v) {
                                    _vm.$set(_vm.taxToAdd, "name", $$v)
                                  },
                                  expression: "taxToAdd.name"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "vs-col",
                            {
                              staticClass: "mb-5",
                              attrs: {
                                "vs-type": "flex",
                                "vs-justify": "center",
                                "vs-align": "center",
                                "vs-w": "12",
                                "vs-lg": "12"
                              }
                            },
                            [
                              _c("vs-input", {
                                staticClass: "w-full",
                                attrs: {
                                  type: "number",
                                  step: "1",
                                  "icon-pack": "feather",
                                  icon: "icon-percent",
                                  "icon-no-border": "",
                                  label: "Percentage"
                                },
                                model: {
                                  value: _vm.taxToAdd.percentage,
                                  callback: function($$v) {
                                    _vm.$set(_vm.taxToAdd, "percentage", $$v)
                                  },
                                  expression: "taxToAdd.percentage"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "vs-col",
                            {
                              staticClass: "mb-6",
                              attrs: { "vs-w": "12", "vs-lg": "12" }
                            },
                            [
                              _c(
                                "vs-button",
                                {
                                  attrs: {
                                    "icon-pack": "feather",
                                    icon: "icon-plus",
                                    color: "primary"
                                  },
                                  on: {
                                    click: function($event) {
                                      return _vm.addTax()
                                    }
                                  }
                                },
                                [_vm._v("Add")]
                              )
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
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
                                    attrs: { title: "Tax Name" }
                                  }),
                                  _vm._v(" "),
                                  _vm._l(_vm.company.taxes, function(tax) {
                                    return _c(
                                      "vs-list-item",
                                      {
                                        attrs: {
                                          title:
                                            tax.name +
                                            " (" +
                                            tax.percentage +
                                            "%)"
                                        }
                                      },
                                      [
                                        _c(
                                          "vs-button",
                                          {
                                            attrs: {
                                              size: "small",
                                              "icon-pack": "feather",
                                              icon: "icon-x",
                                              color: "danger"
                                            },
                                            on: {
                                              click: function($event) {
                                                return _vm.removeTax(tax.name)
                                              }
                                            }
                                          },
                                          [_vm._v("Remove")]
                                        )
                                      ],
                                      1
                                    )
                                  }),
                                  _vm._v(" "),
                                  _vm.company.taxes.length == 0
                                    ? _c("vs-list-item", {
                                        attrs: {
                                          title: "No taxes added yet",
                                          subtitle:
                                            "Taxes will be displayed here"
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
                      ),
                      _vm._v(" "),
                      _c(
                        "vs-row",
                        [
                          _c(
                            "vs-col",
                            {
                              staticClass: "mt-5",
                              attrs: { "vs-type": "flex", "vs-w": "12" }
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
                                "vs-w": "12",
                                "vs-lg": "12"
                              }
                            },
                            [
                              _c("vs-input", {
                                staticClass: "w-full",
                                attrs: {
                                  type: "text",
                                  "icon-pack": "feather",
                                  icon: "icon-box",
                                  "icon-no-border": "",
                                  label: "Name"
                                },
                                model: {
                                  value: _vm.itemToAdd.name,
                                  callback: function($$v) {
                                    _vm.$set(_vm.itemToAdd, "name", $$v)
                                  },
                                  expression: "itemToAdd.name"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "vs-col",
                            {
                              staticClass: "mb-5",
                              attrs: {
                                "vs-type": "flex",
                                "vs-justify": "center",
                                "vs-align": "center",
                                "vs-w": "12",
                                "vs-lg": "12"
                              }
                            },
                            [
                              _c("vs-input", {
                                staticClass: "w-full",
                                attrs: {
                                  type: "text",
                                  step: "1",
                                  "icon-pack": "feather",
                                  icon: "icon-edit",
                                  "icon-no-border": "",
                                  label: "Description"
                                },
                                model: {
                                  value: _vm.itemToAdd.description,
                                  callback: function($$v) {
                                    _vm.$set(_vm.itemToAdd, "description", $$v)
                                  },
                                  expression: "itemToAdd.description"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "vs-col",
                            {
                              staticClass: "mb-6",
                              attrs: { "vs-w": "12", "vs-lg": "12" }
                            },
                            [
                              _c(
                                "vs-button",
                                {
                                  attrs: {
                                    "icon-pack": "feather",
                                    icon: "icon-plus",
                                    color: "primary"
                                  },
                                  on: {
                                    click: function($event) {
                                      return _vm.addItem()
                                    }
                                  }
                                },
                                [_vm._v("Add")]
                              )
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
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
                                              icon: "icon-x",
                                              color: "danger"
                                            },
                                            on: {
                                              click: function($event) {
                                                return _vm.removeItem(item.name)
                                              }
                                            }
                                          },
                                          [_vm._v("Remove")]
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
                      ),
                      _vm._v(" "),
                      _c(
                        "vs-row",
                        [
                          _c(
                            "vs-col",
                            {
                              staticClass: "mt-5",
                              attrs: { "vs-type": "flex", "vs-w": "12" }
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

/***/ "./resources/js/src/views/admin/Company.vue":
/*!**************************************************!*\
  !*** ./resources/js/src/views/admin/Company.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Company_vue_vue_type_template_id_f019e6fa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Company.vue?vue&type=template&id=f019e6fa& */ "./resources/js/src/views/admin/Company.vue?vue&type=template&id=f019e6fa&");
/* harmony import */ var _Company_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Company.vue?vue&type=script&lang=js& */ "./resources/js/src/views/admin/Company.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Company_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Company_vue_vue_type_template_id_f019e6fa___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Company_vue_vue_type_template_id_f019e6fa___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/admin/Company.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/admin/Company.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/src/views/admin/Company.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Company_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Company.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/Company.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Company_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/admin/Company.vue?vue&type=template&id=f019e6fa&":
/*!*********************************************************************************!*\
  !*** ./resources/js/src/views/admin/Company.vue?vue&type=template&id=f019e6fa& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Company_vue_vue_type_template_id_f019e6fa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Company.vue?vue&type=template&id=f019e6fa& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/Company.vue?vue&type=template&id=f019e6fa&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Company_vue_vue_type_template_id_f019e6fa___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Company_vue_vue_type_template_id_f019e6fa___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);