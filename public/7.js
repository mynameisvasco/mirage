(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/Staff.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/admin/Staff.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      staffs: [],
      editStaff: {
        name: null,
        email: null,
        rank: 0,
        picture: null
      },
      newStaff: {
        name: null,
        email: null,
        rank: 0,
        password: null,
        password_confirmation: null,
        picture: null
      }
    };
  },
  methods: {
    convertRankName: function convertRankName(rank) {
      if (rank == 1) {
        return ['Support', 'success'];
      } else if (rank == 2) {
        return ['Financial', 'primary'];
      } else if (rank == 3) {
        return ['Administrator', 'warning'];
      } else return [null, null];
    },
    getStaffs: function getStaffs() {
      var _this = this;

      this.$http.get('/api/users/rank/staff', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(function (response) {
        _this.staffs = response.data;
      })["catch"](function (error) {
        console.log(error);
      });
    },
    getStaff: function getStaff(id) {
      var _this2 = this;

      this.editPopupActive = true;
      this.$http.get('/api/users/' + id, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(function (response) {
        _this2.editStaff = response.data;
      })["catch"](function (error) {
        console.log(error);
      });
    },
    onFileChangeNew: function onFileChangeNew(event) {
      this.newStaff.picture = event.target.files[0];
    },
    onFileChangeEdit: function onFileChangeEdit(event) {
      this.editStaff.picture = event.target.files[0];
    },
    createStaff: function createStaff() {
      var _this3 = this;

      var formData = new FormData();
      formData.append('picture', this.newStaff.picture);
      formData.append('name', this.newStaff.name);
      formData.append('email', this.newStaff.email);
      formData.append('password', this.newStaff.password);
      formData.append('password_confirmation', this.newStaff.password_confirmation);
      formData.append('rank', this.newStaff.rank.value);
      this.$http.post('/api/auth/signup', formData, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token,
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        _this3.staffs.push(response.data);

        _this3.$vs.notify({
          title: 'Success!',
          text: 'Staff was added with success',
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
    updateStaff: function updateStaff() {
      var _this4 = this;

      var formData = new FormData();
      formData.append('picture', this.editStaff.picture);
      formData.append('name', this.editStaff.name);
      formData.append('email', this.editStaff.email);
      formData.append('rank', this.editStaff.rank.value);
      formData.append('_method', "PUT");
      this.$http.post('/api/users/' + this.editStaff.id, formData, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token,
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        for (var i = 0; i < _this4.staffs.length; i++) {
          if (_this4.staffs[i].id == response.data.id) {
            _this4.$set(_this4.staffs, i, response.data);
          }
        }

        _this4.$vs.notify({
          title: 'Success!',
          text: 'Staff was edited with success',
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
    deleteStaff: function deleteStaff(id) {
      var _this5 = this;

      this.$http["delete"]('/api/users/' + id, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(function (response) {
        for (var i = 0; i < _this5.staffs.length; i++) {
          if (_this5.staffs[i].id == id) {
            _this5.$delete(_this5.staffs, i);
          }
        }

        _this5.$vs.notify({
          title: 'Success!',
          text: 'Staff was deleted with success',
          color: 'success',
          position: 'top-right'
        });

        _this5.editPopupActive = false;
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
    this.getStaffs();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/Staff.vue?vue&type=template&id=b72a6634&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/admin/Staff.vue?vue&type=template&id=b72a6634& ***!
  \*************************************************************************************************************************************************************************************************************/
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
          attrs: { title: "Add a new staff", active: _vm.newPopupActive },
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
                    value: _vm.newStaff.name,
                    callback: function($$v) {
                      _vm.$set(_vm.newStaff, "name", $$v)
                    },
                    expression: "newStaff.name"
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
                    value: _vm.newStaff.email,
                    callback: function($$v) {
                      _vm.$set(_vm.newStaff, "email", $$v)
                    },
                    expression: "newStaff.email"
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
                    value: _vm.newStaff.password,
                    callback: function($$v) {
                      _vm.$set(_vm.newStaff, "password", $$v)
                    },
                    expression: "newStaff.password"
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
                    value: _vm.newStaff.password_confirmation,
                    callback: function($$v) {
                      _vm.$set(_vm.newStaff, "password_confirmation", $$v)
                    },
                    expression: "newStaff.password_confirmation"
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
                    value: _vm.convertRankName(_vm.newStaff.rank.value)[0],
                    options: [
                      { label: "Administrator", value: 3 },
                      { label: "Financial", value: 2 },
                      { label: "Support", value: 1 }
                    ]
                  },
                  model: {
                    value: _vm.newStaff.rank,
                    callback: function($$v) {
                      _vm.$set(_vm.newStaff, "rank", $$v)
                    },
                    expression: "newStaff.rank"
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
                        return _vm.createStaff()
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
          attrs: { title: "Edit staff", active: _vm.editPopupActive },
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
                    value: _vm.editStaff.name,
                    callback: function($$v) {
                      _vm.$set(_vm.editStaff, "name", $$v)
                    },
                    expression: "editStaff.name"
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
                    value: _vm.editStaff.email,
                    callback: function($$v) {
                      _vm.$set(_vm.editStaff, "email", $$v)
                    },
                    expression: "editStaff.email"
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
                    placeholder: _vm.convertRankName(_vm.editStaff.rank)[0],
                    options: [
                      { label: "Administrator", value: 3 },
                      { label: "Financial", value: 2 },
                      { label: "Support", value: 1 }
                    ]
                  },
                  model: {
                    value: _vm.editStaff.rank,
                    callback: function($$v) {
                      _vm.$set(_vm.editStaff, "rank", $$v)
                    },
                    expression: "editStaff.rank"
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
                        return _vm.updateStaff()
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
                        return _vm.deleteStaff(_vm.editStaff.id)
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
            [_vm._v("New Staff")]
          ),
          _vm._v(" "),
          _c(
            "vs-table",
            {
              attrs: {
                search: "",
                "max-items": "10",
                pagination: "",
                data: _vm.staffs
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
                            { attrs: { data: data[indextr].email } },
                            [
                              _vm._v(
                                "\n\t\t\t\t\t" +
                                  _vm._s(data[indextr].email) +
                                  "\n\t\t\t\t"
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "vs-td",
                            { attrs: { data: data[indextr].rank } },
                            [
                              _c(
                                "vs-chip",
                                {
                                  attrs: {
                                    color: _vm.convertRankName(
                                      data[indextr].rank
                                    )[1]
                                  }
                                },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.convertRankName(data[indextr].rank)[0]
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
                                    icon: "icon-edit",
                                    color: "primary"
                                  },
                                  on: {
                                    click: function($event) {
                                      return _vm.getStaff(data[indextr].id)
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
                  _vm._v("\n\t\t\t\t\tStaffs\n\t\t\t\t")
                ])
              ]),
              _vm._v(" "),
              _c(
                "template",
                { slot: "thead" },
                [
                  _c("vs-th", [_vm._v("\n\t\t\t\t\tName\n\t\t\t\t")]),
                  _vm._v(" "),
                  _c("vs-th", [_vm._v("\n\t\t\t\t\tEmail\n\t\t\t\t")]),
                  _vm._v(" "),
                  _c("vs-th", { attrs: { "sort-key": "status" } }, [
                    _vm._v("\n\t\t\t\t\tRole\n\t\t\t\t")
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

/***/ "./resources/js/src/views/admin/Staff.vue":
/*!************************************************!*\
  !*** ./resources/js/src/views/admin/Staff.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Staff_vue_vue_type_template_id_b72a6634___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Staff.vue?vue&type=template&id=b72a6634& */ "./resources/js/src/views/admin/Staff.vue?vue&type=template&id=b72a6634&");
/* harmony import */ var _Staff_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Staff.vue?vue&type=script&lang=js& */ "./resources/js/src/views/admin/Staff.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Staff_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Staff_vue_vue_type_template_id_b72a6634___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Staff_vue_vue_type_template_id_b72a6634___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/admin/Staff.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/admin/Staff.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/src/views/admin/Staff.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Staff_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Staff.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/Staff.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Staff_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/admin/Staff.vue?vue&type=template&id=b72a6634&":
/*!*******************************************************************************!*\
  !*** ./resources/js/src/views/admin/Staff.vue?vue&type=template&id=b72a6634& ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Staff_vue_vue_type_template_id_b72a6634___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Staff.vue?vue&type=template&id=b72a6634& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/Staff.vue?vue&type=template&id=b72a6634&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Staff_vue_vue_type_template_id_b72a6634___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Staff_vue_vue_type_template_id_b72a6634___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);