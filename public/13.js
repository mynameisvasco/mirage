(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/client/Employees.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/client/Employees.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
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

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      newPopupActive: false,
      editPopupActive: false,
      clients: [],
      editClient: {
        company: []
      },
      newClient: {
        company_rank: {}
      }
    };
  },
  methods: {
    getClients: function getClients() {
      var _this = this;

      this.$http.get('/api/users/rank/0', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(function (response) {
        _this.clients = response.data;
      })["catch"](function (error) {
        console.log(error);
      });
    },
    getClient: function getClient(id) {
      var _this2 = this;

      this.editPopupActive = true;
      this.$http.get('/api/users/' + id, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(function (response) {
        _this2.editClient = response.data;
      })["catch"](function (error) {
        console.log(error);
      });
    },
    onFileChangeNew: function onFileChangeNew(event) {
      this.newClient.picture = event.target.files[0];
    },
    onFileChangeEdit: function onFileChangeEdit(event) {
      this.editClient.picture = event.target.files[0];
    },
    createClient: function createClient() {
      var _this3 = this;

      console.log(this.newClient.company_rank.value);
      var formData = new FormData();
      formData.append('picture', this.newClient.picture);
      formData.append('name', this.newClient.name);
      formData.append('email', this.newClient.email);
      formData.append('password', this.newClient.password);
      formData.append('password_confirmation', this.newClient.password_confirmation);
      formData.append('company_rank', this.newClient.company_rank.value);
      formData.append('rank', 0);
      this.$http.post('/api/auth/signup', formData, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token,
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        _this3.clients.push(response.data);

        _this3.newPopupActive = false;

        _this3.$vs.notify({
          title: 'Success!',
          text: 'Client was added with success',
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
    },
    updateClient: function updateClient() {
      var _this4 = this;

      var formData = new FormData();
      formData.append('picture', this.editClient.picture);
      formData.append('name', this.editClient.name);
      formData.append('email', this.editClient.email);
      formData.append('_method', "PUT");
      this.$http.post('/api/users/' + this.editClient.id, formData, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token,
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        for (var i = 0; i < _this4.clients.length; i++) {
          if (_this4.clients[i].id == response.data.id) {
            _this4.$set(_this4.clients, i, response.data);
          }
        }

        _this4.editPopupActive = false;

        _this4.$vs.notify({
          title: 'Success!',
          text: 'Client was edited with success',
          color: 'success',
          position: 'top-right'
        });
      })["catch"](function (error) {
        //Show error notification
        Object.keys(error['response'].data.errors).forEach(function (key) {
          var message = String(error['response'].data.errors[key]).replace('["', '').replace('"]', ''); //Show error notification

          _this4.$vs.notify({
            title: 'Error!',
            text: message,
            color: 'danger',
            position: 'top-right'
          });
        });
      });
    },
    deleteClient: function deleteClient(id) {
      var _this5 = this;

      this.$http["delete"]('/api/users/' + id, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(function (response) {
        for (var i = 0; i < _this5.clients.length; i++) {
          if (_this5.clients[i].id == id) {
            _this5.$delete(_this5.clients, i);
          }
        }

        _this5.editPopupActive = false;

        _this5.$vs.notify({
          title: 'Success!',
          text: 'Client was deleted with success',
          color: 'success',
          position: 'top-right'
        });
      })["catch"](function (error) {
        //Show error notification
        Object.keys(error['response'].data.errors).forEach(function (key) {
          var message = String(error['response'].data.errors[key]).replace('["', '').replace('"]', ''); //Show error notification

          _this5.$vs.notify({
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
    this.getClients();
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/client/Employees.vue?vue&type=template&id=4182caab&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/client/Employees.vue?vue&type=template&id=4182caab& ***!
  \******************************************************************************************************************************************************************************************************************/
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
    { staticClass: "flex mb-4" },
    [
      _c(
        "vs-popup",
        {
          staticClass: "holamundo",
          attrs: { title: "Add a new employee", active: _vm.newPopupActive },
          on: {
            "update:active": function($event) {
              _vm.newPopupActive = $event
            }
          }
        },
        [
          _c("div", { staticClass: "vx-row mb-6" }, [
            _c(
              "div",
              { staticClass: "vx-col w-full" },
              [
                _c("vs-input", {
                  staticClass: "w-full",
                  attrs: {
                    "icon-pack": "feather",
                    icon: "icon-user",
                    "icon-no-border": "",
                    label: "Name"
                  },
                  model: {
                    value: _vm.newClient.name,
                    callback: function($$v) {
                      _vm.$set(_vm.newClient, "name", $$v)
                    },
                    expression: "newClient.name"
                  }
                })
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "vx-row mb-6" }, [
            _c(
              "div",
              { staticClass: "vx-col w-full" },
              [
                _c("vs-input", {
                  staticClass: "w-full",
                  attrs: {
                    type: "text ",
                    "icon-pack": "feather",
                    icon: "icon-mail",
                    "icon-no-border": "",
                    label: "Email"
                  },
                  model: {
                    value: _vm.newClient.email,
                    callback: function($$v) {
                      _vm.$set(_vm.newClient, "email", $$v)
                    },
                    expression: "newClient.email"
                  }
                })
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "vx-row mb-6" }, [
            _c(
              "div",
              { staticClass: "vx-col w-full" },
              [
                _c("vs-input", {
                  staticClass: "w-full",
                  attrs: {
                    type: "password",
                    autocomplete: "new-password",
                    "icon-pack": "feather",
                    icon: "icon-lock",
                    "icon-no-border": "",
                    label: "Password"
                  },
                  model: {
                    value: _vm.newClient.password,
                    callback: function($$v) {
                      _vm.$set(_vm.newClient, "password", $$v)
                    },
                    expression: "newClient.password"
                  }
                })
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "vx-row mb-6" }, [
            _c(
              "div",
              { staticClass: "vx-col w-full" },
              [
                _c("vs-input", {
                  staticClass: "w-full",
                  attrs: {
                    type: "password",
                    "icon-pack": "feather",
                    icon: "icon-lock",
                    "icon-no-border": "",
                    label: "Password Confirmation"
                  },
                  model: {
                    value: _vm.newClient.password_confirmation,
                    callback: function($$v) {
                      _vm.$set(_vm.newClient, "password_confirmation", $$v)
                    },
                    expression: "newClient.password_confirmation"
                  }
                })
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "vx-row mb-6" }, [
            _c(
              "div",
              { staticClass: "vx-col w-full" },
              [
                _c(
                  "label",
                  { staticClass: "ml-2", staticStyle: { "font-size": "12px" } },
                  [_vm._v("Role")]
                ),
                _vm._v(" "),
                _c("v-select", {
                  attrs: {
                    placeholder: "Select a role",
                    options: [
                      { label: "Administrator", value: 3 },
                      { label: "Financial", value: 2 },
                      { label: "Support", value: 1 }
                    ]
                  },
                  model: {
                    value: _vm.newClient.company_rank,
                    callback: function($$v) {
                      _vm.$set(_vm.newClient, "company_rank", $$v)
                    },
                    expression: "newClient.company_rank"
                  }
                })
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "vx-row mb-6" }, [
            _c(
              "div",
              { staticClass: "vx-col w-full" },
              [
                _c("vs-input", {
                  staticClass: "w-full",
                  attrs: {
                    type: "file",
                    "icon-pack": "feather",
                    icon: "icon-file",
                    "icon-no-border": "",
                    label: "Picture file"
                  },
                  on: { change: _vm.onFileChangeNew }
                })
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "vx-row mb-6" }, [
            _c(
              "div",
              {
                staticClass:
                  "vx-col w-full align-items-right justify-content-flex-end"
              },
              [
                _c(
                  "vs-button",
                  {
                    staticClass: "mr-3 mb-2",
                    attrs: { "icon-pack": "feather", icon: "icon-plus" },
                    on: {
                      click: function($event) {
                        return _vm.createClient()
                      }
                    }
                  },
                  [_vm._v("Create")]
                )
              ],
              1
            )
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "vs-popup",
        {
          staticClass: "holamundo",
          attrs: { title: "Edit employee", active: _vm.editPopupActive },
          on: {
            "update:active": function($event) {
              _vm.editPopupActive = $event
            }
          }
        },
        [
          _c("div", { staticClass: "vx-row mb-6" }, [
            _c(
              "div",
              { staticClass: "vx-col w-full" },
              [
                _c("vs-input", {
                  staticClass: "w-full",
                  attrs: {
                    "icon-pack": "feather",
                    icon: "icon-user",
                    "icon-no-border": "",
                    label: "Name"
                  },
                  model: {
                    value: _vm.editClient.name,
                    callback: function($$v) {
                      _vm.$set(_vm.editClient, "name", $$v)
                    },
                    expression: "editClient.name"
                  }
                })
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "vx-row mb-6" }, [
            _c(
              "div",
              { staticClass: "vx-col w-full" },
              [
                _c("vs-input", {
                  staticClass: "w-full",
                  attrs: {
                    type: "text ",
                    "icon-pack": "feather",
                    icon: "icon-mail",
                    "icon-no-border": "",
                    label: "Email"
                  },
                  model: {
                    value: _vm.editClient.email,
                    callback: function($$v) {
                      _vm.$set(_vm.editClient, "email", $$v)
                    },
                    expression: "editClient.email"
                  }
                })
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "vx-row mb-8" }, [
            _c(
              "div",
              { staticClass: "vx-col w-full" },
              [
                _c("vs-input", {
                  staticClass: "w-full",
                  attrs: {
                    type: "file",
                    "icon-pack": "feather",
                    icon: "icon-file",
                    "icon-no-border": "",
                    label: "Picture file"
                  },
                  on: { change: _vm.onFileChangeEdit }
                })
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "vx-row mb-6" }, [
            _c(
              "div",
              {
                staticClass:
                  "vx-col mr-0 pr-0 align-items-right justify-content-flex-end"
              },
              [
                _c(
                  "vs-button",
                  {
                    staticClass: "mr-3 mb-2",
                    attrs: { "icon-pack": "feather", icon: "icon-save" },
                    on: {
                      click: function($event) {
                        return _vm.updateClient()
                      }
                    }
                  },
                  [_vm._v("Save")]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass:
                  "vx-col ml-0 pl-0 align-items-right justify-content-flex-end"
              },
              [
                _c(
                  "vs-button",
                  {
                    staticClass: "mr-3 mb-2",
                    attrs: {
                      color: "danger",
                      "icon-pack": "feather",
                      icon: "icon-trash"
                    },
                    on: {
                      click: function($event) {
                        return _vm.deleteClient(_vm.editClient.id)
                      }
                    }
                  },
                  [_vm._v("Delete")]
                )
              ],
              1
            )
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "w-full mt-6" },
        [
          _c(
            "vs-button",
            {
              staticClass: "mb-4",
              attrs: { "icon-pack": "feather", icon: "icon-plus" },
              on: {
                click: function($event) {
                  _vm.newPopupActive = true
                }
              }
            },
            [_vm._v("New Employee")]
          ),
          _vm._v(" "),
          _c(
            "vs-table",
            {
              attrs: {
                search: "",
                "max-items": "10",
                pagination: "",
                data: _vm.clients
              },
              scopedSlots: _vm._u([
                {
                  key: "default",
                  fn: function(ref) {
                    var data = ref.data
                    return _vm._l(data, function(tr, indextr) {
                      return _c(
                        "vs-tr",
                        { key: indextr },
                        [
                          _c("vs-td", { attrs: { data: data[indextr].name } }, [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "grid-layout-container alignment-block"
                              },
                              [
                                _c(
                                  "vs-row",
                                  {
                                    attrs: {
                                      "vs-align": "center",
                                      "vs-type": "flex",
                                      "vs-w": "12"
                                    }
                                  },
                                  [
                                    _c(
                                      "vs-col",
                                      {
                                        staticClass: "mb-4",
                                        attrs: {
                                          "vs-type": "flex",
                                          "vs-align": "center",
                                          "vs-lg": "3",
                                          "vs-md": "6",
                                          "vs-sm": "6",
                                          "vs-xs": "12"
                                        }
                                      },
                                      [
                                        data[indextr].picture
                                          ? _c("vs-avatar", {
                                              attrs: {
                                                src:
                                                  "/storage/avatars/" +
                                                  data[indextr].picture
                                              }
                                            })
                                          : _vm._e(),
                                        _vm._v(" "),
                                        !data[indextr].picture
                                          ? _c("vs-avatar", {
                                              attrs: {
                                                color: "primary",
                                                text: data[indextr].name
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
                                        attrs: {
                                          "vs-type": "flex",
                                          "vs-align": "center",
                                          "vs-lg": "6",
                                          "vs-md": "6",
                                          "vs-sm": "6",
                                          "vs-xs": "12"
                                        }
                                      },
                                      [
                                        _c(
                                          "span",
                                          {
                                            staticStyle: {
                                              "margin-top": "-10px"
                                            }
                                          },
                                          [_vm._v(_vm._s(data[indextr].name))]
                                        )
                                      ]
                                    )
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ]),
                          _vm._v(" "),
                          _c(
                            "vs-td",
                            { attrs: { data: data[indextr].company.name } },
                            [
                              _vm._v(
                                "\n\t\t\t\t\t\t" +
                                  _vm._s(data[indextr].company.name) +
                                  "\n\t\t\t\t\t"
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "vs-td",
                            { attrs: { data: data[indextr].created_at } },
                            [
                              _vm._v(
                                "\n\t\t\t\t\t\t" +
                                  _vm._s(
                                    data[indextr].created_at.split(" ")[0]
                                  ) +
                                  "\n\t\t\t\t\t"
                              )
                            ]
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
                                    icon: "icon-edit",
                                    color: "primary"
                                  },
                                  on: {
                                    click: function($event) {
                                      return _vm.getClient(data[indextr].id)
                                    }
                                  }
                                },
                                [_vm._v("Edit")]
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
                  _vm._v("\n\t\t\t\t\t\tEmployee\n\t\t\t\t\t")
                ])
              ]),
              _vm._v(" "),
              _c(
                "template",
                { slot: "thead" },
                [
                  _c("vs-th", [_vm._v("\n\t\t\t\t\t\tName\n\t\t\t\t\t")]),
                  _vm._v(" "),
                  _c("vs-th", [_vm._v("\n\t\t\t\t\t\tCompany\n\t\t\t\t\t")]),
                  _vm._v(" "),
                  _c("vs-th", { attrs: { "sort-key": "status" } }, [
                    _vm._v("\n\t\t\t\t\t\tSince\n\t\t\t\t\t")
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
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/client/Employees.vue":
/*!*****************************************************!*\
  !*** ./resources/js/src/views/client/Employees.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Employees_vue_vue_type_template_id_4182caab___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Employees.vue?vue&type=template&id=4182caab& */ "./resources/js/src/views/client/Employees.vue?vue&type=template&id=4182caab&");
/* harmony import */ var _Employees_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Employees.vue?vue&type=script&lang=js& */ "./resources/js/src/views/client/Employees.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Employees_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Employees_vue_vue_type_template_id_4182caab___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Employees_vue_vue_type_template_id_4182caab___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/client/Employees.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/client/Employees.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/src/views/client/Employees.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Employees_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Employees.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/client/Employees.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Employees_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/client/Employees.vue?vue&type=template&id=4182caab&":
/*!************************************************************************************!*\
  !*** ./resources/js/src/views/client/Employees.vue?vue&type=template&id=4182caab& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Employees_vue_vue_type_template_id_4182caab___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Employees.vue?vue&type=template&id=4182caab& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/client/Employees.vue?vue&type=template&id=4182caab&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Employees_vue_vue_type_template_id_4182caab___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Employees_vue_vue_type_template_id_4182caab___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);