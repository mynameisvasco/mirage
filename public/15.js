(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/client/Tickets.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/client/Tickets.vue?vue&type=script&lang=js& ***!
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
//
//
//
//
//
//
//
//
//
//
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
      editPopupActive: false,
      newPopupActive: false,
      deletePopUpActive: false,
      tickets: [],
      viewTicket: [],
      newMessage: [],
      clients: [],
      newTicket: {
        client_id: null,
        title: null
      }
    };
  },
  methods: {
    getTicketStatus: function getTicketStatus(status) {
      if (status === 1) {
        return {
          status: 'success',
          text: 'Replied'
        };
      } else if (status === 0) {
        return {
          status: 'warning',
          text: 'Waiting for reply'
        };
      } else if (status === 2) {
        return {
          status: 'primary',
          text: 'Resolved'
        };
      } else {
        return {
          status: 'Unknown',
          text: 'danger'
        };
      }
    },
    getTickets: function getTickets() {
      var _this = this;

      this.$http.get('/api/tickets', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(function (response) {
        _this.tickets = response.data;
      })["catch"](function (error) {
        console.log(error);
      });
    },
    getTicket: function getTicket(id) {
      var _this2 = this;

      this.editPopupActive = true;
      this.$http.get('/api/tickets/' + id, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(function (response) {
        _this2.viewTicket = response.data;
        console.log(_this2.viewTicket);
      })["catch"](function (error) {
        console.log(error);
      });
    },
    getDate: function getDate() {
      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      return date + ' ' + time;
    },
    replyTicket: function replyTicket(id) {
      var _this3 = this;

      var message = {
        body: this.newMessage,
        ticket_id: this.viewTicket.id
      };
      this.$http.post('/api/messages', message, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(function (response) {
        _this3.viewTicket.messages.push(response.data);

        for (var i = 0; i < _this3.tickets.length; i++) {
          if (_this3.tickets[i].id == _this3.viewTicket.id) {
            _this3.$set(_this3.tickets[i], 'status', response.data.ticket.status);
          }
        }
      })["catch"](function (error) {
        console.log(error);
      });
    },
    createTicket: function createTicket(user_id) {
      var _this4 = this;

      var message = {
        body: this.newMessage,
        staff_id: 0,
        user_id: this.$store.state.AppActiveUser.id,
        title: this.newTicket.title
      };
      this.$http.post('/api/messages', message, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(function (response) {
        _this4.tickets.push(response.data[0]);

        _this4.$vs.notify({
          title: 'Success!',
          text: 'Message was sent and ticket was creted!',
          color: 'success',
          position: 'top-right'
        });
      })["catch"](function (error) {
        console.log(error);
      });
    }
  },
  computed: {
    user: function user() {
      return this.$store.state.AppActiveUser;
    }
  },
  mounted: function mounted() {
    this.getTickets();

    if (this.$route.fullPath.split("?")[1]) {
      this.getTicket(this.$route.fullPath.split("?")[1]);
    }
  },
  //Only admin clients and support clients can access this route
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    if (_store_store__WEBPACK_IMPORTED_MODULE_0__["default"].state.AppActiveUser.company_rank != 3 && _store_store__WEBPACK_IMPORTED_MODULE_0__["default"].state.AppActiveUser.company_rank != 1) {
      next('/login');
    } else {
      next();
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/client/Tickets.vue?vue&type=template&id=67b4bc8d&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/client/Tickets.vue?vue&type=template&id=67b4bc8d& ***!
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
    { staticClass: "flex mb-4" },
    [
      _c(
        "vs-popup",
        {
          staticClass: "holamundo",
          attrs: {
            "background-color": "rgba(0,0,0,.6)",
            title: "Are you sure you want to delete this ticket?",
            active: _vm.deletePopUpActive
          },
          on: {
            "update:active": function($event) {
              _vm.deletePopUpActive = $event
            }
          }
        },
        [
          _c(
            "vs-row",
            { attrs: { "vs-justify": "right", "vs-align": "flex-end" } },
            [
              _c(
                "vs-col",
                {
                  staticClass: "mb-4",
                  attrs: {
                    "vs-justify": "right",
                    "vs-align": "flex-end",
                    "vs-w": "12"
                  }
                },
                [
                  _c("p", [
                    _vm._v(
                      "After take this action you won't be able to go back. Please, make sure it's what you want to do"
                    )
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "vs-col",
                {
                  attrs: {
                    "vs-justify": "right",
                    "vs-align": "flex-end",
                    "vs-w": "12"
                  }
                },
                [
                  _c(
                    "vs-button",
                    {
                      attrs: {
                        color: "danger",
                        "icon-pack": "feather",
                        icon: "icon-trash",
                        type: "filled"
                      },
                      on: {
                        click: function($event) {
                          return _vm.deleteTicket(_vm.viewTicket.id)
                        }
                      }
                    },
                    [_vm._v("Delete")]
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
      _c(
        "vs-popup",
        {
          staticClass: "holamundo",
          attrs: { title: "New Ticket", active: _vm.newPopupActive },
          on: {
            "update:active": function($event) {
              _vm.newPopupActive = $event
            }
          }
        },
        [
          _c(
            "div",
            { staticStyle: { "margin-bottom": "10px" } },
            [
              _c(
                "vs-row",
                [
                  _c(
                    "vs-col",
                    {
                      staticClass: "mb-4",
                      attrs: { "vs-align": "center", "vs-w": "12" }
                    },
                    [
                      _c("vs-input", {
                        staticClass: "w-full",
                        attrs: {
                          type: "text",
                          "icon-pack": "feather",
                          icon: "icon-edit",
                          "icon-no-border": "",
                          label: "Title"
                        },
                        model: {
                          value: _vm.newTicket.title,
                          callback: function($$v) {
                            _vm.$set(_vm.newTicket, "title", $$v)
                          },
                          expression: "newTicket.title"
                        }
                      })
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
          _c(
            "vs-row",
            [
              _c("vs-col", { attrs: { "vs-w": "12" } }, [
                _c(
                  "label",
                  { staticClass: "ml-2", staticStyle: { "font-size": "12px" } },
                  [_vm._v("Message")]
                ),
                _c("br")
              ]),
              _vm._v(" "),
              _c(
                "vs-col",
                {
                  attrs: {
                    "vs-type": "flex",
                    "vs-justify": "center",
                    "vs-align": "center",
                    "vs-w": "12"
                  }
                },
                [
                  _c("vs-textarea", {
                    staticStyle: { height: "140px" },
                    model: {
                      value: _vm.newMessage,
                      callback: function($$v) {
                        _vm.newMessage = $$v
                      },
                      expression: "newMessage"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "vs-col",
                {
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
                      attrs: { color: "success", type: "filled" },
                      on: {
                        click: function($event) {
                          return _vm.createTicket()
                        }
                      }
                    },
                    [_vm._v("Send")]
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
      _c(
        "vs-popup",
        {
          staticClass: "holamundo",
          attrs: { title: _vm.viewTicket.title, active: _vm.editPopupActive },
          on: {
            "update:active": function($event) {
              _vm.editPopupActive = $event
            }
          }
        },
        [
          _vm._l(_vm.viewTicket.messages, function(message) {
            return _c(
              "div",
              {
                key: _vm.viewTicket.messages.id,
                staticStyle: { "margin-bottom": "50px" }
              },
              [
                _c(
                  "vs-row",
                  [
                    _c(
                      "vs-col",
                      {
                        attrs: {
                          "vs-type": "flex",
                          "vs-justify": "center",
                          "vs-align": "center",
                          "vs-w": "2"
                        }
                      },
                      [
                        message.user.picture
                          ? _c("vs-avatar", {
                              attrs: {
                                src: "/storage/avatars/" + message.user.picture
                              }
                            })
                          : _vm._e(),
                        _vm._v(" "),
                        !message.user.picture
                          ? _c("vs-avatar", {
                              attrs: {
                                color: "primary",
                                text: message.user.name
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
                          "vs-type": "",
                          "vs-justify": "center",
                          "vs-align": "center",
                          "vs-w": "10"
                        }
                      },
                      [
                        _c("p", [_vm._v(_vm._s(message.body))]),
                        _vm._v(" "),
                        _c("small", [_vm._v(_vm._s(message.created_at))])
                      ]
                    )
                  ],
                  1
                )
              ],
              1
            )
          }),
          _vm._v(" "),
          _c(
            "vs-row",
            { attrs: { "vs-justify": "center", "vs-align": "center" } },
            [
              _c(
                "vs-col",
                {
                  attrs: {
                    "vs-type": "flex",
                    "vs-justify": "center",
                    "vs-align": "center",
                    "vs-w": "12"
                  }
                },
                [
                  _c("vs-textarea", {
                    staticStyle: { height: "140px" },
                    attrs: { label: "Your message" },
                    model: {
                      value: _vm.newMessage,
                      callback: function($$v) {
                        _vm.newMessage = $$v
                      },
                      expression: "newMessage"
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
                  attrs: {
                    "vs-type": "flex",
                    "vs-justify": "center",
                    "vs-align": "center",
                    "vs-w": "3",
                    "vs-md": "4",
                    "vs-sm": "12"
                  }
                },
                [
                  _c(
                    "vs-button",
                    {
                      attrs: {
                        color: "success",
                        "icon-pack": "feather",
                        icon: "icon-send",
                        type: "filled"
                      },
                      on: {
                        click: function($event) {
                          return _vm.replyTicket(_vm.viewTicket.id)
                        }
                      }
                    },
                    [_vm._v("Reply")]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        2
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
            [_vm._v("New Ticket")]
          ),
          _vm._v(" "),
          _c(
            "vs-table",
            {
              attrs: {
                search: "",
                "max-items": "10",
                pagination: "",
                data: _vm.tickets
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
                          _c(
                            "vs-td",
                            { attrs: { data: data[indextr].title } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(data[indextr].title) +
                                  "\n                        "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "vs-td",
                            { attrs: { data: data[indextr].status } },
                            [
                              _c(
                                "vs-chip",
                                {
                                  attrs: {
                                    color: _vm.getTicketStatus(
                                      data[indextr].status
                                    ).status
                                  }
                                },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.getTicketStatus(data[indextr].status)
                                        .text
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
                            { attrs: { data: data[indextr].updated_at } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(data[indextr].updated_at) +
                                  "\n                        "
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
                                  attrs: { color: "primary" },
                                  on: {
                                    click: function($event) {
                                      return _vm.getTicket(data[indextr].id)
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
                  _vm._v("\n\t\t\t\t\t\tTickets\n\t\t\t\t\t")
                ])
              ]),
              _vm._v(" "),
              _c(
                "template",
                { slot: "thead" },
                [
                  _c("vs-th", [_vm._v("\n\t\t\t\t\t\tTitle\n\t\t\t\t\t")]),
                  _vm._v(" "),
                  _c("vs-th", { attrs: { "sort-key": "status" } }, [
                    _vm._v("\n\t\t\t\t\t\tStatus\n\t\t\t\t\t")
                  ]),
                  _vm._v(" "),
                  _c("vs-th", { attrs: { "sort-key": "updated_at" } }, [
                    _vm._v("\n\t\t\t\t\t\tLast Reply Date\n\t\t\t\t\t")
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

/***/ "./resources/js/src/views/client/Tickets.vue":
/*!***************************************************!*\
  !*** ./resources/js/src/views/client/Tickets.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Tickets_vue_vue_type_template_id_67b4bc8d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tickets.vue?vue&type=template&id=67b4bc8d& */ "./resources/js/src/views/client/Tickets.vue?vue&type=template&id=67b4bc8d&");
/* harmony import */ var _Tickets_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tickets.vue?vue&type=script&lang=js& */ "./resources/js/src/views/client/Tickets.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Tickets_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Tickets_vue_vue_type_template_id_67b4bc8d___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Tickets_vue_vue_type_template_id_67b4bc8d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/client/Tickets.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/client/Tickets.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/src/views/client/Tickets.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tickets_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Tickets.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/client/Tickets.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tickets_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/client/Tickets.vue?vue&type=template&id=67b4bc8d&":
/*!**********************************************************************************!*\
  !*** ./resources/js/src/views/client/Tickets.vue?vue&type=template&id=67b4bc8d& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tickets_vue_vue_type_template_id_67b4bc8d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Tickets.vue?vue&type=template&id=67b4bc8d& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/client/Tickets.vue?vue&type=template&id=67b4bc8d&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tickets_vue_vue_type_template_id_67b4bc8d___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tickets_vue_vue_type_template_id_67b4bc8d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);