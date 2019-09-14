(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/Profile.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/Profile.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      profile: []
    };
  },
  methods: {
    getProfile: function getProfile() {
      var _this = this;

      this.$http.get('/api/auth/user', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(function (response) {
        _this.profile = response.data;
        console.log(_this.profile);
      })["catch"](function (error) {
        console.log(error);
      });
    },
    onFileChange: function onFileChange(event) {
      this.profile.picture = event.target.files[0];
    },
    updateProfile: function updateProfile() {
      var _this2 = this;

      var formData = new FormData();
      formData.append('picture', this.profile.picture);
      formData.append('name', this.profile.name);
      formData.append('email', this.profile.email);
      formData.append('vat', this.profile.vat);
      formData.append('address', this.profile.address);
      formData.append('_method', "PUT");
      this.$http.post('/api/users/' + this.profile.id, formData, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token,
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        _this2.profile = response.data;

        _this2.$vs.notify({
          title: 'Success!',
          text: 'Client was edited with success',
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
    }
  },
  mounted: function mounted() {
    this.getProfile();
    console.log(this.profile);
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/Profile.vue?vue&type=template&id=6e59b4ef&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/Profile.vue?vue&type=template&id=6e59b4ef& ***!
  \*********************************************************************************************************************************************************************************************************/
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
                "vs-md": "12",
                "vs-lg": "6",
                "vs-xl": "4"
              }
            },
            [
              _c(
                "div",
                { staticClass: "flex" },
                [
                  _c(
                    "vx-card",
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
                              !_vm.profile.picture
                                ? _c("vs-avatar", {
                                    attrs: {
                                      size: "100px",
                                      color: "primary",
                                      text: _vm.profile.name
                                    }
                                  })
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.profile.picture
                                ? _c("vs-avatar", {
                                    attrs: {
                                      size: "100px",
                                      src:
                                        "storage/avatars/" + _vm.profile.picture
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
                              staticClass: "mb-4",
                              attrs: {
                                "vs-w": "12",
                                "vs-lg": "8",
                                "vs-md": "6",
                                "vs-sm": "12"
                              }
                            },
                            [
                              _c("vs-input", {
                                staticClass: "w-full l mt-6",
                                attrs: {
                                  type: "file",
                                  "icon-pack": "feather",
                                  icon: "icon-file",
                                  "icon-no-border": "",
                                  label: "Upload Picture"
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
                                  icon: "icon-user",
                                  "icon-no-border": "",
                                  label: "Name"
                                },
                                model: {
                                  value: _vm.profile.name,
                                  callback: function($$v) {
                                    _vm.$set(_vm.profile, "name", $$v)
                                  },
                                  expression: "profile.name"
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
                                  value: _vm.profile.address,
                                  callback: function($$v) {
                                    _vm.$set(_vm.profile, "address", $$v)
                                  },
                                  expression: "profile.address"
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
                                  value: _vm.profile.email,
                                  callback: function($$v) {
                                    _vm.$set(_vm.profile, "email", $$v)
                                  },
                                  expression: "profile.email"
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
                                  label: "Tax No"
                                },
                                model: {
                                  value: _vm.profile.vat,
                                  callback: function($$v) {
                                    _vm.$set(_vm.profile, "vat", $$v)
                                  },
                                  expression: "profile.vat"
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
                                      return _vm.updateProfile()
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
        _vm._v("\n                Profile\n            ")
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/Profile.vue":
/*!********************************************!*\
  !*** ./resources/js/src/views/Profile.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Profile_vue_vue_type_template_id_6e59b4ef___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Profile.vue?vue&type=template&id=6e59b4ef& */ "./resources/js/src/views/Profile.vue?vue&type=template&id=6e59b4ef&");
/* harmony import */ var _Profile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Profile.vue?vue&type=script&lang=js& */ "./resources/js/src/views/Profile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Profile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Profile_vue_vue_type_template_id_6e59b4ef___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Profile_vue_vue_type_template_id_6e59b4ef___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/Profile.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/Profile.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/src/views/Profile.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Profile.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/Profile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/Profile.vue?vue&type=template&id=6e59b4ef&":
/*!***************************************************************************!*\
  !*** ./resources/js/src/views/Profile.vue?vue&type=template&id=6e59b4ef& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_template_id_6e59b4ef___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Profile.vue?vue&type=template&id=6e59b4ef& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/Profile.vue?vue&type=template&id=6e59b4ef&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_template_id_6e59b4ef___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_template_id_6e59b4ef___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);