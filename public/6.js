(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/Invoices.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/admin/Invoices.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuejs_datepicker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuejs-datepicker */ "./node_modules/vuejs-datepicker/dist/vuejs-datepicker.esm.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  components: {
    Datepicker: vuejs_datepicker__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      editPopupActive: false,
      newPopupActive: false,
      deletePopUpActive: false,
      invoices: [],
      clients: [],
      newInvoice: {
        items: [],
        itemToAdd: {}
      },
      deleteInvoice: {},
      taxes: []
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
          status: 'primary',
          text: 'Overdue'
        };
      } else {
        return {
          status: 'danger',
          text: 'Unknown'
        };
      }
    },
    getTaxes: function getTaxes() {
      var _this = this;

      this.$http.get('/api/companyinformations', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(function (response) {
        for (var i = 0; i < JSON.parse(response.data.taxes).length; i++) {
          _this.taxes.push({
            label: JSON.parse(response.data.taxes)[i].name,
            value: JSON.parse(response.data.taxes)[i].percentage
          });
        }

        console.log(_this.taxes);
      })["catch"](function (error) {
        console.log(error);
      });
    },
    getInvoices: function getInvoices() {
      var _this2 = this;

      this.$http.get('/api/invoices', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(function (response) {
        _this2.invoices = response.data;
      })["catch"](function (error) {
        console.log(error);
      });
    },
    getClients: function getClients() {
      var _this3 = this;

      this.$http.get('/api/users/rank/0', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
          _this3.clients.push({
            label: response.data[i].name,
            value: response.data[i].id
          });
        }
      })["catch"](function (error) {
        console.log(error);
      });
    },
    createInvoice: function createInvoice() {
      var _this4 = this;

      var invoice = {
        name: this.newInvoice.name,
        user_id: this.newInvoice.user_id.value,
        items: this.newInvoice.items,
        description: this.newInvoice.description,
        notes: this.newInvoice.notes,
        dueDate: this.newInvoice.dueDate,
        currency: this.newInvoice.currency,
        status: this.newInvoice.status.value,
        taxes: JSON.stringify(this.newInvoice.taxes).replace(/label/g, 'name').replace(/value/g, 'percentage')
      };
      this.$http.post('/api/invoices', invoice, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(function (response) {
        _this4.invoices.push(response.data);

        _this4.$vs.notify({
          title: 'Success!',
          text: 'Invoice was created!',
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
    addInvoiceItem: function addInvoiceItem() {
      this.newInvoice.items.push({
        name: this.newInvoice.itemToAdd.name,
        price: this.newInvoice.itemToAdd.price
      });
    },
    deleteInvoiceItem: function deleteInvoiceItem(name, price) {
      for (var i = 0; i < this.newInvoice.items.length; i++) {
        if (this.newInvoice.items[i].name == name && this.newInvoice.items[i].price == price) {
          this.$delete(this.newInvoice.items, i);
        }
      }
    }
  },
  mounted: function mounted() {
    this.getInvoices();
    this.getClients();
    this.getTaxes();
  },
  computed: {
    user: function user() {
      return this.$store.state.AppActiveUser;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/Invoices.vue?vue&type=template&id=26986760&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/admin/Invoices.vue?vue&type=template&id=26986760& ***!
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
    { staticClass: "flex" },
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
                          return _vm.deleteInvoice(_vm.deleteInvoice.id)
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
          staticClass: "holamundo popup-md",
          attrs: {
            fullscreen: "",
            title: "New Invoice",
            active: _vm.newPopupActive
          },
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
                      attrs: {
                        "vs-w": "12",
                        "vs-sm": "12",
                        "vs-md": "6",
                        "vs-lg": "4"
                      }
                    },
                    [
                      _c(
                        "label",
                        {
                          staticClass: "ml-2",
                          staticStyle: { "font-size": "12px" }
                        },
                        [_vm._v("Client")]
                      ),
                      _c("br"),
                      _vm._v(" "),
                      _c("v-select", {
                        attrs: { options: _vm.clients },
                        model: {
                          value: _vm.newInvoice.user_id,
                          callback: function($$v) {
                            _vm.$set(_vm.newInvoice, "user_id", $$v)
                          },
                          expression: "newInvoice.user_id"
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
                        "vs-align": "center",
                        "vs-w": "12",
                        "vs-sm": "12",
                        "vs-md": "6",
                        "vs-lg": "4"
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
                          value: _vm.newInvoice.name,
                          callback: function($$v) {
                            _vm.$set(_vm.newInvoice, "name", $$v)
                          },
                          expression: "newInvoice.name"
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
                        "vs-align": "center",
                        "vs-w": "12",
                        "vs-sm": "12",
                        "vs-md": "6",
                        "vs-lg": "4"
                      }
                    },
                    [
                      _c("vs-input", {
                        staticClass: "w-full",
                        attrs: {
                          type: "text",
                          "icon-pack": "feather",
                          icon: "icon-align-left",
                          "icon-no-border": "",
                          label: "Description"
                        },
                        model: {
                          value: _vm.newInvoice.description,
                          callback: function($$v) {
                            _vm.$set(_vm.newInvoice, "description", $$v)
                          },
                          expression: "newInvoice.description"
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
                        "vs-align": "center",
                        "vs-w": "12",
                        "vs-sm": "12",
                        "vs-md": "6",
                        "vs-lg": "4"
                      }
                    },
                    [
                      _c("vs-input", {
                        staticClass: "w-full",
                        attrs: {
                          type: "text",
                          "icon-pack": "feather",
                          icon: "icon-bell",
                          "icon-no-border": "",
                          label: "Notes"
                        },
                        model: {
                          value: _vm.newInvoice.notes,
                          callback: function($$v) {
                            _vm.$set(_vm.newInvoice, "notes", $$v)
                          },
                          expression: "newInvoice.notes"
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
                        "vs-w": "12",
                        "vs-md": "6",
                        "vs-sm": "12",
                        "vs-lg": "4"
                      }
                    },
                    [
                      _c(
                        "label",
                        {
                          staticClass: "ml-1",
                          staticStyle: { "font-size": "12px" }
                        },
                        [_vm._v("Due date")]
                      ),
                      _c("br"),
                      _vm._v(" "),
                      _c("datepicker", {
                        attrs: { format: "yyyy-MM-dd" },
                        model: {
                          value: _vm.newInvoice.dueDate,
                          callback: function($$v) {
                            _vm.$set(_vm.newInvoice, "dueDate", $$v)
                          },
                          expression: "newInvoice.dueDate"
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
                        "vs-w": "12",
                        "vs-md": "6",
                        "vs-sm": "12",
                        "vs-lg": "4"
                      }
                    },
                    [
                      _c(
                        "label",
                        {
                          staticClass: "ml-2",
                          staticStyle: { "font-size": "12px" }
                        },
                        [_vm._v("Taxes")]
                      ),
                      _c("br"),
                      _vm._v(" "),
                      _c("v-select", {
                        attrs: { multiple: "", options: _vm.taxes },
                        model: {
                          value: _vm.newInvoice.taxes,
                          callback: function($$v) {
                            _vm.$set(_vm.newInvoice, "taxes", $$v)
                          },
                          expression: "newInvoice.taxes"
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
                        "vs-align": "center",
                        "vs-w": "12",
                        "vs-sm": "12",
                        "vs-md": "6",
                        "vs-lg": "4"
                      }
                    },
                    [
                      _c("vs-input", {
                        staticClass: "w-full",
                        attrs: {
                          type: "text",
                          "icon-pack": "feather",
                          icon: "icon-dollar-sign",
                          "icon-no-border": "",
                          label: "Currency"
                        },
                        model: {
                          value: _vm.newInvoice.currency,
                          callback: function($$v) {
                            _vm.$set(_vm.newInvoice, "currency", $$v)
                          },
                          expression: "newInvoice.currency"
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
                        "vs-w": "12",
                        "vs-md": "6",
                        "vs-sm": "12",
                        "vs-lg": "4"
                      }
                    },
                    [
                      _c(
                        "label",
                        {
                          staticClass: "ml-1",
                          staticStyle: { "font-size": "12px" }
                        },
                        [_vm._v("Status")]
                      ),
                      _c("br"),
                      _vm._v(" "),
                      _c("v-select", {
                        attrs: {
                          options: [
                            { label: "Unpaid", value: 0 },
                            { label: "Paid", value: 1 },
                            { label: "Overdue", value: 2 }
                          ]
                        },
                        model: {
                          value: _vm.newInvoice.status,
                          callback: function($$v) {
                            _vm.$set(_vm.newInvoice, "status", $$v)
                          },
                          expression: "newInvoice.status"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("vs-col", {
                    staticClass: "mb-4",
                    attrs: {
                      "vs-w": "12",
                      "vs-md": "6",
                      "vs-sm": "12",
                      "vs-lg": "4"
                    }
                  }),
                  _vm._v(" "),
                  _c("vs-col", {
                    staticClass: "mb-4",
                    attrs: {
                      "vs-w": "12",
                      "vs-md": "6",
                      "vs-sm": "12",
                      "vs-lg": "4"
                    }
                  })
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
                      _c("vs-input", {
                        staticClass: "w-full",
                        attrs: {
                          type: "text",
                          "icon-pack": "feather",
                          icon: "icon-package",
                          "icon-no-border": "",
                          label: "Item Name"
                        },
                        model: {
                          value: _vm.newInvoice.itemToAdd.name,
                          callback: function($$v) {
                            _vm.$set(_vm.newInvoice.itemToAdd, "name", $$v)
                          },
                          expression: "newInvoice.itemToAdd.name"
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
                        "vs-align": "center",
                        "vs-sm": "12",
                        "vs-w": "12",
                        "vs-md": "6",
                        "vs-lg": "4"
                      }
                    },
                    [
                      _c("vs-input", {
                        staticClass: "w-full",
                        attrs: {
                          type: "number",
                          step: "0.5",
                          "icon-pack": "feather",
                          icon: "icon-credit-card",
                          "icon-no-border": "",
                          label: "Item Price"
                        },
                        model: {
                          value: _vm.newInvoice.itemToAdd.price,
                          callback: function($$v) {
                            _vm.$set(_vm.newInvoice.itemToAdd, "price", $$v)
                          },
                          expression: "newInvoice.itemToAdd.price"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "vs-col",
                    {
                      staticClass: "mb-4 mt-6",
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
                        "vs-button",
                        {
                          attrs: {
                            "icon-pack": "feather",
                            icon: "icon-plus",
                            color: "primary"
                          },
                          on: {
                            click: function($event) {
                              return _vm.addInvoiceItem()
                            }
                          }
                        },
                        [_vm._v("Add Item")]
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
            "vs-row",
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
                  _c(
                    "vs-list",
                    [
                      _c("vs-list-header", { attrs: { title: "Items" } }),
                      _vm._v(" "),
                      _vm.newInvoice.items.length == 0
                        ? _c("vs-list-item", {
                            attrs: {
                              title: "No items added yet",
                              subtitle:
                                "Please use the input above to add new items to this invoice"
                            }
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _vm._l(_vm.newInvoice.items, function(item) {
                        return _c(
                          "vs-list-item",
                          {
                            attrs: {
                              title: item.name,
                              subtitle: "£" + item.price
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
                                    return _vm.deleteInvoiceItem(
                                      item.name,
                                      item.price
                                    )
                                  }
                                }
                              },
                              [_vm._v("Remove")]
                            )
                          ],
                          1
                        )
                      })
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
            {
              attrs: {
                "vs-align": "flex-end",
                "vs-type": "flex",
                "vs-justify": "center"
              }
            },
            [
              _c(
                "vs-col",
                {
                  staticClass: "popup-md-btn mt-6 mt-md-0",
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
                        color: "success",
                        "icon-pack": "feather",
                        icon: "icon-send",
                        type: "filled"
                      },
                      on: {
                        click: function($event) {
                          return _vm.createInvoice()
                        }
                      }
                    },
                    [_vm._v("Create")]
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
            [_vm._v("New Invoice")]
          ),
          _vm._v(" "),
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
                        { key: indextr },
                        [
                          _c(
                            "vs-td",
                            { attrs: { data: data[indextr].user.name } },
                            [
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
                                          data[indextr].user.picture
                                            ? _c("vs-avatar", {
                                                attrs: {
                                                  src:
                                                    "/storage/avatars/" +
                                                    data[indextr].user.picture
                                                }
                                              })
                                            : _vm._e(),
                                          _vm._v(" "),
                                          !data[indextr].user.picture
                                            ? _c("vs-avatar", {
                                                attrs: {
                                                  color: "primary",
                                                  text: data[indextr].user.name
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
                                            [
                                              _vm._v(
                                                _vm._s(data[indextr].user.name)
                                              )
                                            ]
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
                          _c("vs-td", { attrs: { data: data[indextr].name } }, [
                            _vm._v(
                              "\n\t\t\t\t\t\t\t" +
                                _vm._s(data[indextr].name) +
                                "\n\t\t\t\t\t\t"
                            )
                          ]),
                          _vm._v(" "),
                          _c(
                            "vs-td",
                            { attrs: { data: data[indextr].totalMoney } },
                            [
                              _vm._v(
                                "\n\t\t\t\t\t\t\t" +
                                  _vm._s(data[indextr].totalMoney) +
                                  "\n\t\t\t\t\t\t"
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
                                  attrs: { color: "primary" },
                                  on: {
                                    click: function($event) {
                                      return _vm.getInvoice(data[indextr].id)
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
                  _vm._v("\n\t\t\t\t\t\tInvoices\n\t\t\t\t\t")
                ])
              ]),
              _vm._v(" "),
              _c(
                "template",
                { slot: "thead" },
                [
                  _c("vs-th", [
                    _vm._v("\n\t\t\t\t\t\tClient Name\n\t\t\t\t\t")
                  ]),
                  _vm._v(" "),
                  _c("vs-th", [_vm._v("\n\t\t\t\t\t\tName\n\t\t\t\t\t")]),
                  _vm._v(" "),
                  _c("vs-th", { attrs: { "sort-key": "status" } }, [
                    _vm._v("\n\t\t\t\t\t\tAmount(£)\n\t\t\t\t\t")
                  ]),
                  _vm._v(" "),
                  _c("vs-th", { attrs: { "sort-key": "status" } }, [
                    _vm._v("\n\t\t\t\t\t\tStatus\n\t\t\t\t\t")
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

/***/ "./resources/js/src/views/admin/Invoices.vue":
/*!***************************************************!*\
  !*** ./resources/js/src/views/admin/Invoices.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Invoices_vue_vue_type_template_id_26986760___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Invoices.vue?vue&type=template&id=26986760& */ "./resources/js/src/views/admin/Invoices.vue?vue&type=template&id=26986760&");
/* harmony import */ var _Invoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Invoices.vue?vue&type=script&lang=js& */ "./resources/js/src/views/admin/Invoices.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Invoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Invoices_vue_vue_type_template_id_26986760___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Invoices_vue_vue_type_template_id_26986760___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/admin/Invoices.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/admin/Invoices.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/src/views/admin/Invoices.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Invoices.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/Invoices.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/admin/Invoices.vue?vue&type=template&id=26986760&":
/*!**********************************************************************************!*\
  !*** ./resources/js/src/views/admin/Invoices.vue?vue&type=template&id=26986760& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_template_id_26986760___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Invoices.vue?vue&type=template&id=26986760& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/Invoices.vue?vue&type=template&id=26986760&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_template_id_26986760___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_template_id_26986760___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);