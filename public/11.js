(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/Tickets.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/admin/Tickets.vue?vue&type=script&lang=js& ***!
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      resolvePopUpActive: false,
      tickets: [],
      viewTicket: {
        user: {
          company: {}
        }
      },
      newMessage: [],
      clients: [],
      newTicket: {
        client_id: null,
        title: null
      },
      resTicket: {}
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
    getClients: function getClients() {
      var _this2 = this;

      this.$http.get('/api/users/rank/0', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
          _this2.clients.push({
            label: response.data[i].name,
            value: response.data[i].id
          });
        }
      })["catch"](function (error) {
        console.log(error);
      });
    },
    getTicket: function getTicket(id) {
      var _this3 = this;

      this.editPopupActive = true;
      this.$http.get('/api/tickets/' + id, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(function (response) {
        _this3.viewTicket = response.data;
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
      var _this4 = this;

      var message = {
        body: this.newMessage,
        ticket_id: this.viewTicket.id
      };
      this.$http.post('/api/messages', message, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(function (response) {
        _this4.viewTicket.message.push(response.data);

        for (var i = 0; i < _this4.tickets.length; i++) {
          if (_this4.tickets[i].id == _this4.viewTicket.id) {
            _this4.$set(_this4.tickets[i], 'status', response.data.ticket.status);
          }
        }
      })["catch"](function (error) {
        console.log(error);
      });
    },
    resolveTicket: function resolveTicket(id) {
      var _this5 = this;

      var ticket = {
        status: 2,
        working_minutes: this.resTicket.working_minutes,
        _method: 'PUT'
      };
      this.$http.post('/api/tickets/' + id, ticket, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(function (response) {
        for (var i = 0; i < _this5.tickets.length; i++) {
          if (_this5.tickets[i].id == response.data.id) {
            _this5.$set(_this5.tickets[i], 'status', response.data.status);
          }
        }

        _this5.$vs.notify({
          title: 'Success!',
          text: 'Ticket was marked as resolved',
          color: 'success',
          position: 'top-right'
        });

        _this5.resolvePopUpActive = false;
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
    },
    deleteTicket: function deleteTicket(id) {
      var _this6 = this;

      this.$http["delete"]('/api/tickets/' + id, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(function (response) {
        for (var i = 0; i < _this6.tickets.length; i++) {
          if (_this6.tickets[i].id == id) {
            _this6.$delete(_this6.tickets, i);
          }
        }

        _this6.$vs.notify({
          title: 'Success!',
          text: 'Ticket was deleted with success',
          color: 'success',
          position: 'top-right'
        });

        _this6.deletePopUpActive = false;
        _this6.editPopupActive = false;
      })["catch"](function (error) {
        //Show error notification
        Object.keys(error['response'].data.errors).forEach(function (key) {
          var message = String(error['response'].data.errors[key]).replace('["', '').replace('"]', ''); //Show error notification

          _this6.$vs.notify({
            title: 'Error!',
            text: message,
            color: 'danger',
            position: 'top-right'
          });
        });
      });
    },
    createTicket: function createTicket(user_id) {
      var _this7 = this;

      var message = {
        body: this.newMessage,
        staff_id: this.user.id,
        user_id: this.newTicket.user_id.value,
        title: this.newTicket.title
      };
      this.$http.post('/api/messages', message, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(function (response) {
        _this7.tickets.unshift(response.data[0]);

        _this7.newPopupActive = false;

        _this7.$vs.notify({
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
    this.getClients();
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    //Only admins and supports have access to this route
    if (_store_store__WEBPACK_IMPORTED_MODULE_0__["default"].state.AppActiveUser.rank != 3 && _store_store__WEBPACK_IMPORTED_MODULE_0__["default"].state.AppActiveUser.rank != 1) {
      next('/login');
    } else {
      next();
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/Tickets.vue?vue&type=template&id=864cfc26&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/admin/Tickets.vue?vue&type=template&id=864cfc26& ***!
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
            [
              _c("vs-col", { staticClass: "mb-4", attrs: { "vs-w": "12" } }, [
                _c("p", [
                  _vm._v(
                    "After take this action you won't be able to go back. Please, make sure it's what you want to do."
                  )
                ])
              ]),
              _vm._v(" "),
              _c(
                "vs-col",
                { attrs: { "vs-w": "12" } },
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
          attrs: {
            "background-color": "rgba(0,0,0,.6)",
            title: "Resolve Ticket",
            active: _vm.resolvePopUpActive
          },
          on: {
            "update:active": function($event) {
              _vm.resolvePopUpActive = $event
            }
          }
        },
        [
          _c(
            "vs-row",
            [
              _c("vs-col", { staticClass: "mb-4", attrs: { "vs-w": "12" } }, [
                _c("p", [
                  _vm._v(
                    "Please indicate bellow the minutes spent resolving this ticket"
                  )
                ])
              ]),
              _vm._v(" "),
              _c(
                "vs-col",
                {
                  staticClass: "mb-4",
                  attrs: {
                    "vs-align": "center",
                    "vs-w": "12",
                    "vs-sm": "12",
                    "vs-md": "6",
                    "vs-lg": "6"
                  }
                },
                [
                  _c("vs-input", {
                    staticClass: "w-full",
                    attrs: {
                      type: "text",
                      "icon-pack": "feather",
                      icon: "icon-clock",
                      "icon-no-border": "",
                      label: "Working Minutes"
                    },
                    model: {
                      value: _vm.resTicket.working_minutes,
                      callback: function($$v) {
                        _vm.$set(_vm.resTicket, "working_minutes", $$v)
                      },
                      expression: "resTicket.working_minutes"
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
                        icon: "icon-check",
                        type: "filled"
                      },
                      on: {
                        click: function($event) {
                          return _vm.resolveTicket(_vm.viewTicket.id)
                        }
                      }
                    },
                    [_vm._v("Resolve")]
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
                  _c("vs-col", { attrs: { "vs-w": "12" } }, [
                    _c(
                      "label",
                      {
                        staticClass: "ml-2",
                        staticStyle: { "font-size": "12px" }
                      },
                      [_vm._v("Client")]
                    ),
                    _c("br")
                  ]),
                  _vm._v(" "),
                  _c(
                    "vs-col",
                    { staticClass: "mb-4", attrs: { "vs-w": "12" } },
                    [
                      _c("v-select", {
                        attrs: { options: _vm.clients },
                        model: {
                          value: _vm.newTicket.user_id,
                          callback: function($$v) {
                            _vm.$set(_vm.newTicket, "user_id", $$v)
                          },
                          expression: "newTicket.user_id"
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
          _c(
            "div",
            [
              _c(
                "vs-tabs",
                { attrs: { alignment: "center" } },
                [
                  _c(
                    "vs-tab",
                    {
                      attrs: {
                        label: "Messages",
                        "icon-pack": "feather",
                        icon: "icon-message-square"
                      }
                    },
                    [
                      _c(
                        "div",
                        { staticClass: "mt-4" },
                        _vm._l(_vm.viewTicket.message, function(message) {
                          return _c(
                            "div",
                            {
                              key: _vm.viewTicket.message.id,
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
                                              src:
                                                "/storage/avatars/" +
                                                message.user.picture
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
                                      _c("small", [
                                        _vm._v(_vm._s(message.created_at))
                                      ])
                                    ]
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          )
                        }),
                        0
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
                                    color: "primary",
                                    "icon-pack": "feather",
                                    icon: "icon-check",
                                    type: "filled"
                                  },
                                  on: {
                                    click: function($event) {
                                      _vm.resolvePopUpActive = true
                                    }
                                  }
                                },
                                [_vm._v("Resolved")]
                              )
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
                                    color: "danger",
                                    "icon-pack": "feather",
                                    icon: "icon-trash",
                                    type: "filled"
                                  },
                                  on: {
                                    click: function($event) {
                                      _vm.deletePopUpActive = true
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
                    "vs-tab",
                    {
                      attrs: {
                        label: "Inventory",
                        "icon-pack": "feather",
                        icon: "icon-archive"
                      }
                    },
                    [
                      _c(
                        "div",
                        { staticClass: "vx-col w-full " },
                        [
                          _c(
                            "vs-list",
                            [
                              _c("vs-list-header", {
                                attrs: { title: "Items" }
                              }),
                              _vm._v(" "),
                              _vm._l(
                                _vm.viewTicket.user.company.items,
                                function(item) {
                                  return _c("vs-list-item", {
                                    attrs: {
                                      index: item.id,
                                      title: item.name,
                                      subtitle:
                                        item.quantity +
                                        " units. - " +
                                        item.description
                                    }
                                  })
                                }
                              )
                            ],
                            2
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
                            { attrs: { data: data[indextr].user.name } },
                            [
                              _vm._v(
                                "\n\t\t\t\t\t" +
                                  _vm._s(data[indextr].user.company.name) +
                                  "\n\t\t\t\t"
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "vs-td",
                            { attrs: { data: data[indextr].title } },
                            [
                              _vm._v(
                                "\n\t\t\t\t\t" +
                                  _vm._s(data[indextr].title) +
                                  "\n\t\t\t\t"
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
                                "\n\t\t\t\t\t" +
                                  _vm._s(data[indextr].updated_at) +
                                  "\n\t\t\t\t"
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
                  _vm._v("\n\t\t\t\t\tTickets\n\t\t\t\t")
                ])
              ]),
              _vm._v(" "),
              _c(
                "template",
                { slot: "thead" },
                [
                  _c("vs-th", [_vm._v("\n\t\t\t\t\tCompany Name\n\t\t\t\t")]),
                  _vm._v(" "),
                  _c("vs-th", [_vm._v("\n\t\t\t\t\tTitle\n\t\t\t\t")]),
                  _vm._v(" "),
                  _c("vs-th", { attrs: { "sort-key": "status" } }, [
                    _vm._v("\n\t\t\t\t\tStatus\n\t\t\t\t")
                  ]),
                  _vm._v(" "),
                  _c("vs-th", { attrs: { "sort-key": "updated_at" } }, [
                    _vm._v("\n\t\t\t\t\tLast Reply Date\n\t\t\t\t")
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

/***/ "./resources/js/src/views/admin/Tickets.vue":
/*!**************************************************!*\
  !*** ./resources/js/src/views/admin/Tickets.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Tickets_vue_vue_type_template_id_864cfc26___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tickets.vue?vue&type=template&id=864cfc26& */ "./resources/js/src/views/admin/Tickets.vue?vue&type=template&id=864cfc26&");
/* harmony import */ var _Tickets_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tickets.vue?vue&type=script&lang=js& */ "./resources/js/src/views/admin/Tickets.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Tickets_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Tickets_vue_vue_type_template_id_864cfc26___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Tickets_vue_vue_type_template_id_864cfc26___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/admin/Tickets.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/admin/Tickets.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/src/views/admin/Tickets.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tickets_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Tickets.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/Tickets.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tickets_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/admin/Tickets.vue?vue&type=template&id=864cfc26&":
/*!*********************************************************************************!*\
  !*** ./resources/js/src/views/admin/Tickets.vue?vue&type=template&id=864cfc26& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tickets_vue_vue_type_template_id_864cfc26___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Tickets.vue?vue&type=template&id=864cfc26& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/Tickets.vue?vue&type=template&id=864cfc26&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tickets_vue_vue_type_template_id_864cfc26___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tickets_vue_vue_type_template_id_864cfc26___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);