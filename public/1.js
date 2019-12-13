(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/basic-set/Warehouse.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/basic-set/Warehouse.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      currentPage: 1,
      //默认显示页面为1
      pagesize: 5,
      //    每页的数据条数
      tableData: [],
      //需要data定义一些，tableData定义一个空数组，请求的数据都是存放这里面
      multipleSelection: [],
      textTitle: "",
      formSubUrl: "",
      dialogFormVisible: false,
      form: {
        id: "",
        house_code: "",
        house_name: "",
        position: "",
        capacity: "",
        remain_capacity: "",
        warehouse_status: "1",
        storeman: "",
        storeman_contact: ""
      },
      rules: {
        house_name: [{
          required: true,
          message: "请输入仓库名称",
          trigger: "blur"
        }, {
          min: 2,
          message: "长度在 2 个字符以上",
          trigger: "blur"
        }],
        warehouse_status: [{
          required: true,
          message: "请选中仓库状态",
          trigger: "blur"
        }],
        position: [{
          required: true,
          message: "请输入仓库地址",
          trigger: "blur"
        }]
      }
    };
  },
  mounted: function mounted() {
    this.getData();
  },
  computed: {},
  methods: {
    //获取数据
    getData: function getData() {
      var _this = this;

      axios.get("api/v1/warehouse-list").then(function (res) {
        _this.tableData = res.data["data"];
      })["catch"](function (err) {
        console.error(err);
      });
    },
    //状态查询
    handleStatusText: function handleStatusText(val) {
      //返回值为1和0，可用三元运算
      val.warehouse_status === 1 ? this.statusText = "已启用" : this.statusText = "未启用";
    },
    //状态对应样式
    handleStatusStyle: function handleStatusStyle(val) {
      if (val.warehouse_status === 1) {
        return "success";
      }

      return "info";
    },
    //每页下拉显示数据
    handleSizeChange: function handleSizeChange(size) {
      this.pagesize = size;
      /*console.log(this.pagesize) */
    },
    //点击第几页
    handleCurrentChange: function handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    //获取选中行
    handleCurrentRow: function handleCurrentRow(val) {
      this.currentRow = val;
      /* console.log(this.currentRow); */
    },
    //获取多选
    handleSelectionChange: function handleSelectionChange(val) {
      this.multipleSelection = val;
      /* console.log(this.multipleSelection); */
    },
    //新增仓库
    addWarehouse: function addWarehouse() {},
    //删除多选
    dropMultiTable: function dropMultiTable() {
      var _this2 = this;

      //console.log(this.multipleSelection);
      //取出选中id
      var warehouse_id = {
        id: []
      }; //循环id值压入对象数组内

      for (var index = 0; index < this.multipleSelection.length; index++) {
        warehouse_id.id.push(this.multipleSelection[index].id);
      }

      if (warehouse_id.id.length === 0) {
        this.$notify.info({
          title: "消息",
          message: "请至少选择一项！"
        });
        return;
      } //删除判断


      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        axios["delete"]("api/v1/warehouse-dropMulti", {
          data: warehouse_id
        }).then(function (res) {
          switch (res.data["status"]) {
            case "4002":
              _this2.$notify.error({
                title: "错误",
                message: "操作失败"
              });

              break;

            case "2001":
              _this2.$notify.success({
                title: "成功",
                message: "操作成功",
                type: "success"
              }); //刷新数据


              _this2.getData();

              break;

            default:
              _this2.$notify.info({
                title: "消息",
                message: "请至少选择一项!"
              });

              break;
          }
        })["catch"](function (err) {
          console.error(err);
        });
      })["catch"](function () {});
    },
    //编辑判断
    handleEdit: function handleEdit(type, row) {
      //console.log(val);
      //判断传递的是编辑还是新增
      if (type === "addNew") {
        this.textTitle = "新增仓库"; //拷贝对象--解决切换有值问题

        this.form = Object.assign({}, row);
        this.formSubUrl = "api/v1/warehouse-add";
      } else {
        this.textTitle = "编辑仓库";
        this.formSubUrl = "api/v1/warehouse-edit"; //将值拷贝到表单
        //status值需转换为字符串类型

        this.form = Object.assign({}, row);
        this.form.warehouse_status = row.warehouse_status.toString();
        this.form.id = row.id;
      }
    },
    //提交表单
    submitForm: function submitForm(name) {
      var _this3 = this;

      this.$refs[name].validate(function (valid) {
        if (valid) {
          //提交表单信息
          axios.post(_this3.formSubUrl, _this3.form).then(function (res) {
            switch (res.data.status) {
              case "4001":
                _this3.$notify.error({
                  title: "错误",
                  message: "输入数据有误"
                });

                break;

              case "4002":
                _this3.$notify.error({
                  title: "错误",
                  message: "数据写入失败"
                });

                break;

              default:
                _this3.$notify.success({
                  title: "成功",
                  message: "操作成功",
                  type: "success"
                }); //重置表单


                _this3.$refs[name].resetFields(); //关闭dialog


                _this3.dialogFormVisible = false; //刷新数据

                _this3.getData();

                break;
            }
          })["catch"](function (err) {
            console.error(err);
          });
        }
      });
    },
    //重置表单
    resetForm: function resetForm(name) {
      this.$refs[name].resetFields();
    },
    //删除
    handleDelete: function handleDelete(index, row) {
      var _this4 = this;

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        axios["delete"]("api/v1/warehouse-drop", {
          data: {
            id: row.id
          }
        }).then(function (res) {
          switch (res.data["status"]) {
            case "1001":
              _this4.$notify.info({
                title: "消息",
                message: "参数不能为空"
              });

              break;

            case "1002":
              _this4.$notify.error({
                title: "错误",
                message: "数据不存在"
              });

              break;

            default:
              _this4.$notify.success({
                title: "成功",
                message: "操作成功",
                type: "success"
              }); //刷新数据


              _this4.getData();

              break;
          }
        })["catch"](function (err) {
          console.error(err);
        });
      })["catch"](function () {//   this.$notify.info({
        //     title: "消息",
        //     message: "取消删除"
        //   });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/basic-set/Warehouse.vue?vue&type=template&id=0c28685c&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/basic-set/Warehouse.vue?vue&type=template&id=0c28685c& ***!
  \**********************************************************************************************************************************************************************************************************************/
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
    { staticClass: "warehouse-set" },
    [
      _c(
        "div",
        { staticClass: "bread" },
        [
          _c(
            "el-breadcrumb",
            { attrs: { separator: "/" } },
            [
              _c("el-breadcrumb-item", [_vm._v("基本设置")]),
              _vm._v(" "),
              _c("el-breadcrumb-item", [_vm._v("仓库设置")])
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-row",
        { staticClass: "main" },
        [
          _c(
            "el-row",
            {
              staticClass: "button-style",
              attrs: { type: "flex", justify: "end" }
            },
            [
              _c(
                "el-button",
                {
                  attrs: {
                    type: "primary",
                    icon: "el-icon-plus",
                    size: "small"
                  },
                  on: {
                    click: function($event) {
                      return _vm.handleEdit(
                        "addNew",
                        (_vm.dialogFormVisible = true)
                      )
                    }
                  }
                },
                [_vm._v("新增仓库")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: {
                    type: "danger",
                    icon: "el-icon-delete",
                    size: "small"
                  },
                  on: { click: _vm.dropMultiTable }
                },
                [_vm._v("删除数据")]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-row",
            { staticClass: "main-table" },
            [
              _c(
                "el-table",
                {
                  staticStyle: { width: "100%" },
                  attrs: {
                    data: _vm.tableData.slice(
                      (_vm.currentPage - 1) * _vm.pagesize,
                      _vm.currentPage * _vm.pagesize
                    ),
                    "highlight-current-row": "",
                    "default-sort": { prop: "updated_at", order: "descending" },
                    stripe: "",
                    border: "",
                    height: "450"
                  },
                  on: {
                    "current-change": _vm.handleCurrentRow,
                    "selection-change": _vm.handleSelectionChange
                  }
                },
                [
                  _c("el-table-column", {
                    attrs: { type: "selection", width: "55" }
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: {
                      type: "index",
                      width: "50",
                      align: "center",
                      label: "序号"
                    }
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: {
                      prop: "house_code",
                      align: "center",
                      label: "仓库代码"
                    }
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: {
                      prop: "house_name",
                      align: "center",
                      label: "库名"
                    }
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: { prop: "position", align: "center", label: "地址" }
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: { prop: "capacity", align: "center", label: "容量" }
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: {
                      prop: "remain_capacity",
                      align: "center",
                      label: "余量"
                    }
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: {
                      prop: "storeman",
                      align: "center",
                      label: "负责人"
                    }
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: {
                      prop: "storeman_contact",
                      align: "center",
                      label: "联系方式"
                    }
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: {
                      prop: "warehouse_status",
                      align: "center",
                      label: "仓库状态"
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(scope) {
                          return [
                            _c(
                              "div",
                              {
                                staticClass: "name-wrapper",
                                attrs: { slot: "reference" },
                                slot: "reference"
                              },
                              [
                                _c(
                                  "el-tag",
                                  {
                                    attrs: {
                                      type: _vm.handleStatusStyle(scope.row),
                                      statusText: _vm.handleStatusText(
                                        scope.row
                                      ),
                                      size: "medium"
                                    }
                                  },
                                  [_vm._v(_vm._s(_vm.statusText))]
                                )
                              ],
                              1
                            )
                          ]
                        }
                      }
                    ])
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: {
                      prop: "updated_at",
                      width: "160",
                      align: "center",
                      label: "更新时间"
                    }
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: { label: "操作", width: "150", align: "center" },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(scope) {
                          return [
                            _c(
                              "el-button",
                              {
                                attrs: { size: "mini" },
                                on: {
                                  click: function($event) {
                                    return _vm.handleEdit(
                                      "edit",
                                      scope.row,
                                      (_vm.dialogFormVisible = true)
                                    )
                                  }
                                }
                              },
                              [_vm._v("编辑")]
                            ),
                            _vm._v(" "),
                            _c(
                              "el-button",
                              {
                                attrs: { size: "mini", type: "danger" },
                                on: {
                                  click: function($event) {
                                    return _vm.handleDelete(
                                      scope.$index,
                                      scope.row
                                    )
                                  }
                                }
                              },
                              [_vm._v("删除")]
                            )
                          ]
                        }
                      }
                    ])
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-row",
                { staticClass: "pagination", attrs: { type: "flex" } },
                [
                  _c("el-pagination", {
                    attrs: {
                      background: "",
                      "current-page": _vm.currentPage,
                      "page-sizes": [5, 10, 20, 40],
                      "page-size": _vm.pagesize,
                      layout: "total, sizes,prev, pager, next",
                      total: _vm.tableData.length,
                      "prev-text": "上一页",
                      "next-text": "下一页"
                    },
                    on: {
                      "size-change": _vm.handleSizeChange,
                      "current-change": _vm.handleCurrentChange
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
        "el-row",
        [
          _c(
            "el-dialog",
            {
              attrs: {
                title: _vm.textTitle,
                top: "10vh",
                visible: _vm.dialogFormVisible,
                center: "",
                width: "30%"
              },
              on: {
                "update:visible": function($event) {
                  _vm.dialogFormVisible = $event
                }
              }
            },
            [
              _c(
                "el-form",
                {
                  ref: "form",
                  attrs: {
                    model: _vm.form,
                    "status-icon": "",
                    rules: _vm.rules,
                    "label-width": "120px"
                  }
                },
                [
                  _c(
                    "el-form-item",
                    { attrs: { label: "仓库代码(拼音)", prop: "house_code" } },
                    [
                      _c("el-input", {
                        attrs: { autocomplete: "off" },
                        model: {
                          value: _vm.form.house_code,
                          callback: function($$v) {
                            _vm.$set(_vm.form, "house_code", $$v)
                          },
                          expression: "form.house_code"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { attrs: { label: "仓库名称", prop: "house_name" } },
                    [
                      _c("el-input", {
                        attrs: { autocomplete: "off" },
                        model: {
                          value: _vm.form.house_name,
                          callback: function($$v) {
                            _vm.$set(_vm.form, "house_name", $$v)
                          },
                          expression: "form.house_name"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { attrs: { label: "地址", prop: "position" } },
                    [
                      _c("el-input", {
                        attrs: { autocomplete: "off" },
                        model: {
                          value: _vm.form.position,
                          callback: function($$v) {
                            _vm.$set(_vm.form, "position", $$v)
                          },
                          expression: "form.position"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { attrs: { label: "仓库容量(数字)", prop: "capacity" } },
                    [
                      _c("el-input", {
                        attrs: { autocomplete: "off" },
                        model: {
                          value: _vm.form.capacity,
                          callback: function($$v) {
                            _vm.$set(_vm.form, "capacity", $$v)
                          },
                          expression: "form.capacity"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        label: "仓库余量(数字)",
                        prop: "remain_capacity"
                      }
                    },
                    [
                      _c(
                        "el-tooltip",
                        {
                          staticClass: "item",
                          attrs: {
                            effect: "dark",
                            content: "余量不能大于容量哦!",
                            placement: "top"
                          }
                        },
                        [
                          _c("el-input", {
                            attrs: { autocomplete: "off" },
                            model: {
                              value: _vm.form.remain_capacity,
                              callback: function($$v) {
                                _vm.$set(_vm.form, "remain_capacity", $$v)
                              },
                              expression: "form.remain_capacity"
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
                    "el-form-item",
                    { attrs: { label: "仓库状态", prop: "warehouse_status" } },
                    [
                      _c(
                        "el-radio",
                        {
                          attrs: { label: "1" },
                          model: {
                            value: _vm.form.warehouse_status,
                            callback: function($$v) {
                              _vm.$set(_vm.form, "warehouse_status", $$v)
                            },
                            expression: "form.warehouse_status"
                          }
                        },
                        [_vm._v("已启用")]
                      ),
                      _vm._v(" "),
                      _c(
                        "el-radio",
                        {
                          attrs: { label: "-1" },
                          model: {
                            value: _vm.form.warehouse_status,
                            callback: function($$v) {
                              _vm.$set(_vm.form, "warehouse_status", $$v)
                            },
                            expression: "form.warehouse_status"
                          }
                        },
                        [_vm._v("未启用")]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { attrs: { label: "负责人", prop: "storeman" } },
                    [
                      _c("el-input", {
                        attrs: { autocomplete: "off" },
                        model: {
                          value: _vm.form.storeman,
                          callback: function($$v) {
                            _vm.$set(_vm.form, "storeman", $$v)
                          },
                          expression: "form.storeman"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        label: "联系方式(数字)",
                        prop: "storeman_contact"
                      }
                    },
                    [
                      _c("el-input", {
                        attrs: { autocomplete: "off" },
                        model: {
                          value: _vm.form.storeman_contact,
                          callback: function($$v) {
                            _vm.$set(_vm.form, "storeman_contact", $$v)
                          },
                          expression: "form.storeman_contact"
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
                "div",
                {
                  staticClass: "dialog-footer",
                  attrs: { slot: "footer" },
                  slot: "footer"
                },
                [
                  _c(
                    "el-button",
                    {
                      on: {
                        click: function($event) {
                          _vm.dialogFormVisible = false
                        }
                      }
                    },
                    [_vm._v("取 消")]
                  ),
                  _vm._v(" "),
                  _c(
                    "el-button",
                    {
                      attrs: { type: "primary" },
                      on: {
                        click: function($event) {
                          return _vm.submitForm("form")
                        }
                      }
                    },
                    [_vm._v("确 定")]
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
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/basic-set/Warehouse.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/basic-set/Warehouse.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Warehouse_vue_vue_type_template_id_0c28685c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Warehouse.vue?vue&type=template&id=0c28685c& */ "./resources/js/components/basic-set/Warehouse.vue?vue&type=template&id=0c28685c&");
/* harmony import */ var _Warehouse_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Warehouse.vue?vue&type=script&lang=js& */ "./resources/js/components/basic-set/Warehouse.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Warehouse_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Warehouse_vue_vue_type_template_id_0c28685c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Warehouse_vue_vue_type_template_id_0c28685c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/basic-set/Warehouse.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/basic-set/Warehouse.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/basic-set/Warehouse.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Warehouse_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Warehouse.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/basic-set/Warehouse.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Warehouse_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/basic-set/Warehouse.vue?vue&type=template&id=0c28685c&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/basic-set/Warehouse.vue?vue&type=template&id=0c28685c& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Warehouse_vue_vue_type_template_id_0c28685c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Warehouse.vue?vue&type=template&id=0c28685c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/basic-set/Warehouse.vue?vue&type=template&id=0c28685c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Warehouse_vue_vue_type_template_id_0c28685c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Warehouse_vue_vue_type_template_id_0c28685c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);