<template>
  <div class="in-bound">
    <div class="bread">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>库存管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品入库</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div>
      <el-row class="main">
        <el-row type="flex" class="inbound-header-button">
          <!-- 时间筛选 -->
          <el-row class="inbound-date-select">
            <el-col :span="22" class="block">
              <span class="demonstration">更新时间</span>
              <el-date-picker
                size="small"
                v-model="inboundDate"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="handleInputEmpty"
              ></el-date-picker>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="dateQuery" size="small">查询</el-button>
            </el-col>
          </el-row>
          <!-- 复合搜索框 -->
          <el-row class="inbound-header-search">
            <el-col>
              <el-autocomplete
                class="inline-input"
                size="small"
                placeholder="输入关键字搜索"
                v-model="inboundHeadInput"
                @clear="handleInputEmpty"
                :fetch-suggestions="querySearch"
                :trigger-on-focus="false"
                clearable
              >
                <el-select
                  size="small"
                  v-model="inboundHeadSelect"
                  slot="prepend"
                  placeholder="请选择"
                >
                  <el-option label="订单号" value="1"></el-option>
                  <el-option label="产品名称" value="2"></el-option>
                </el-select>
                <el-button
                  size="small"
                  slot="append"
                  @click="handleItemQuery"
                  icon="el-icon-search"
                ></el-button>
              </el-autocomplete>
            </el-col>
          </el-row>
          <!-- 顶部按钮 -->
          <el-row class="button-style">
            <el-button
              type="primary"
              @click="handleEvent('addNew',dialogFormVisible=true)"
              icon="el-icon-plus"
              size="small"
            >新增入库</el-button>
            <el-button type="danger" @click="dropMultiTable" icon="el-icon-delete" size="small">删除数据</el-button>
          </el-row>
        </el-row>
        <el-row class="main-table">
          <el-table
            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            highlight-current-row
            @current-change="handleCurrentRow"
            @selection-change="handleSelectionChange"
            :default-sort="{prop: 'updated_at', order: 'descending'}"
            stripe
            border
            height="450"
            style="width: 100%"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="inbound-table-expand">
                  <el-form-item label="产品名称">
                    <span>{{props.row.item_name}}</span>
                  </el-form-item>
                  <el-form-item label="产品规格">
                    <span>{{props.row.spec}}</span>
                  </el-form-item>
                  <el-form-item label="单位">
                    <span>{{props.row.unit}}</span>
                  </el-form-item>
                  <el-form-item label="产品数量">
                    <span>{{props.row.item_qty}}</span>
                  </el-form-item>
                  <el-form-item label="供应商">
                    <span>{{props.row.supplier}}</span>
                  </el-form-item>
                  <el-form-item label="联系人">
                    <span>{{props.row.contact_man}}</span>
                  </el-form-item>
                  <el-form-item label="联系方式">
                    <span>{{props.row.contact_number}}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
            <el-table-column prop="order_num" align="center" label="订单号"></el-table-column>
            <el-table-column prop="house_name" align="center" label="所入仓库"></el-table-column>
            <el-table-column prop="remarks" align="center" label="备注"></el-table-column>
            <el-table-column prop="status" align="center" label="状态">
              <template v-slot="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag
                    :type="handleStatusStyle(scope.row)"
                    :statusText="handleStatusText(scope.row)"
                    size="medium"
                  >{{statusText}}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="operator" align="center" label="操作员"></el-table-column>
            <el-table-column prop="updated_at" width="160" align="center" label="更新时间"></el-table-column>
            <el-table-column label="操作" fixed="right" width="150" align="center">
              <template v-slot="scope">
                <el-button
                  size="mini"
                  @click="handleEvent('edit',scope.row,dialogFormVisible=true)"
                >编辑</el-button>
                <el-button size="mini" type="danger" @click="dropMultiTable('drop',scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row type="flex" class="pagination">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 40]"
              :page-size="pagesize"
              layout="total, sizes,prev, pager, next"
              :total="tableData.length"
              prev-text="上一页"
              next-text="下一页"
            ></el-pagination>
          </el-row>
        </el-row>
      </el-row>
    </div>
    <!-- 弹出框- -->
    <el-row>
      <el-dialog :title="textTitle" top="10vh" :visible.sync="dialogFormVisible" center width="50%">
        <el-form :model="form" status-icon :rules="rules" ref="form" label-width="120px">
          <el-row>
            <!-- 产品 -->
            <el-col :span="12" style="border-right:solid 1px #e5e9f2; padding-right:30px;">
              <el-form-item label="产品名称" prop="item_name">
                <el-input v-model="form.item_name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="产品规格" prop="spec">
                <el-tooltip class="item" effect="dark" content="只能输入数字哦!" placement="top">
                  <el-input v-model="form.spec" autocomplete="off"></el-input>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="产品单位" prop="unit">
                <el-tooltip class="item" effect="dark" content="只能输入数字哦!" placement="top">
                  <el-input v-model="form.unit" autocomplete="off"></el-input>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="产品数量" prop="item_qty">
                <el-tooltip class="item" effect="dark" content="只能输入数字哦!" placement="top">
                  <el-input v-model="form.item_qty" autocomplete="off"></el-input>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="供应商" prop="supplier">
                <el-input v-model="form.supplier" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="联系人" prop="contact_man">
                <el-input v-model="form.contact_man" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="联系方式" prop="contact_number">
                <el-input v-model="form.contact_number" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <!-- 仓库 -->
            <el-col :span="12">
              <el-form-item label="仓库名称" prop="house_name">
                <el-autocomplete
                  style="width:100%;"
                  v-model="form.house_name"
                  :fetch-suggestions="houseSearch"
                  :trigger-on-focus="false"
                  @select="handleSelect"
                ></el-autocomplete>
              </el-form-item>
              <el-form-item label="备注" prop="remarks">
                <el-input v-model="form.remarks" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="订单状态" prop="status">
                <el-radio v-model="form.status" label="1">已入库</el-radio>
                <el-radio v-model="form.status" label="-1">未入库</el-radio>
              </el-form-item>
              <el-form-item label="操作员" prop="operator">
                <el-input v-model="form.operator" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </div>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import { log, isNull } from "util";
export default {
  data() {
    return {
      currentPage: 1, //默认显示页面为1
      pagesize: 10, //    每页的数据条数
      tableData: [], //需要data定义一些，tableData定义一个空数组，请求的数据都是存放这里面
      multipleSelection: [],
      textTitle: "",
      formType: "", //判断共用的对话框表单类型
      formSubUrl: "api/v1/inbounds/",
      dialogFormVisible: false,
      inboundDate: "",
      selectData: [],
      houseData: [],
      inboundHeadInput: "",
      inboundHeadSelect: "",
      axios_type: "",
      form: {
        id: "",
        item_name: "",
        spec: "",
        unit: "",
        item_qty: "",
        supplier: "",
        contact_man: "",
        contact_number: "",
        remarks: "",
        status: "1",
        operator: "",
        house_name: "",
        warehouse_id: ""
      },
      rules: {
        item_name: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          { min: 2, message: "长度在 2 个字符以上", trigger: "blur" }
        ],
        status: [
          { required: true, message: "请选中订单状态", trigger: "blur" }
        ],
        house_name: [
          { required: true, message: "请输入仓库名称", trigger: "blur" }
        ],
        operator: [{ required: true, message: "请输入操作员", trigger: "blur" }]
      }
    };
  },
  mounted() {
    // console.log(this.$router.name);
    this.getData();
    this.getHouse();
    let sum = 0.1+0.2;
    //console.log(sum.toFixed(2));
    console.log(0.1+0.2);
  },
  watch: {
    //监听头部搜索建议-下拉选择框
    inboundHeadInput: function() {
      //console.log(this.inboundHeadInput);
      //有值先判断是否选择select，若未选则提示需先选择
      if (this.inboundHeadInput) {
        if (!this.inboundHeadSelect) {
          this.$notify.warning({
            title: "消息",
            message: "请先选择内容！",
            type:info
          });
          return;
        }
        //若已选获取下拉框所选内容并筛选当前数据

        //根据id返回不同值
        switch (this.inboundHeadSelect) {
          case "1":
            for (let index = 0; index < this.tableData.length; index++) {
              this.selectData.push({
                value: this.tableData[index].order_num
              });
            }
            break;
          case "2":
            for (let index = 0; index < this.tableData.length; index++) {
              this.selectData.push({
                value: this.tableData[index].item_name
              });
            }
            break;
        }
      }
    }
  },
  methods: {
    //获取关联数据
    getData() {
      axios
        .get("api/v1/inbounds")
        .then(res => {
          this.tableData = res.data["data"];
        })
        .catch(err => {
          console.error(err);
        });
    },
    //获取仓库数据
    getHouse() {
      axios
        .get("api/v1/warehouse-list")
        .then(res => {
          this.houseData = res.data["data"];
        })
        .catch(err => {
          console.error(err);
        });
    },
    //时间查询-头部
    dateQuery() {
      if (!this.inboundDate) {
        this.getData();
        return;
      }
      let start_time = this.inboundDate[0];
      let end_time = this.inboundDate[1];
      axios
        .get("api/v1/inbounds-date", {
          params: { start_time: start_time, end_time: end_time }
        })
        .then(res => {
          this.tableData = res.data["data"];
        })
        .catch(err => {
          console.error(err);
        });
    },
    //输入建议-头部
    querySearch(queryString, cb) {
      let data = this.selectData;
      let results = queryString
        ? data.filter(this.createFilter(queryString))
        : data;
      //调用 callback 返回建议列表的数据
      cb(results);
      //   console.log(results);
    },
    //输入建议-仓库名称
    houseSearch(queryString, cb) {
      //循环将仓库名称插入变量模型内
      for (let index = 0; index < this.houseData.length; index++) {
        this.selectData.push({
          value: this.houseData[index].house_name,
          warehouse_id: this.houseData[index].id
        });
      }
      let data = this.selectData;
      let results = queryString
        ? data.filter(this.createFilter(queryString))
        : data;
      //调用 callback 返回建议列表的数据
      cb(results);
    },
    //输入建议-过滤补全
    createFilter(queryString) {
      return data => {
        return (
          //value为固定返回格式(框架内定)
          data.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      this.form.warehouse_id = item.warehouse_id;
    },
    //点击搜索-头部
    handleItemQuery() {
      //select_item值1为订单号，2为产品名称，依次传递到api查询对应结果
      let select_item = this.inboundHeadSelect;
      let item_data = this.inboundHeadInput;
      // console.log(select_item+'---'+item_data);
      if (!select_item || !item_data) {
        this.getData();
        return;
      }
      axios
        .get("api/v1/inbounds-item", {
          params: { select_item: select_item, item_data: item_data }
        })
        .then(res => {
          this.tableData = res.data["data"];
        })
        .catch(err => {
          console.error(err);
        });
    },
    //数据清空的时候
    handleInputEmpty() {
      this.getData();
    },
    //状态查询
    handleStatusText(val) {
      //返回值为1和0，可用三元运算
      val.status === 1
        ? (this.statusText = "已入库")
        : (this.statusText = "未入库");
    },
    //状态对应样式
    handleStatusStyle(val) {
      if (val.status === 1) {
        return "success";
      }
      return "info";
    },
    //每页下拉显示数据
    handleSizeChange: function(size) {
      this.pagesize = size;
      /*console.log(this.pagesize) */
    },
    //点击第几页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    //获取选中行
    handleCurrentRow: function(val) {
      this.currentRow = val;
      /* console.log(this.currentRow); */
    },
    //获取多选
    handleSelectionChange: function(val) {
      this.multipleSelection = val;
      /* console.log(this.multipleSelection); */
    },
    //删除
    dropMultiTable: function(val, row) {
      //取出选中id
      var inbound_id = {
        id: []
      };
      //循环id值压入对象数组内,多个字符串数字需转换为数字类型，否则会被当成一个字符串处理，用parseInt
      for (let index = 0; index < this.multipleSelection.length; index++) {
        inbound_id.id.push(parseInt(this.multipleSelection[index].id));
      }
      //若点击行内删除按钮
      if (val == "drop") {
        inbound_id.id.push(row.id);
      }
      if (inbound_id.id.length === 0) {
        this.$notify.info({
          title: "消息",
          message: "请至少选择一项！"
        });
        return;
      }
      //删除判断
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios //ES6变量数据编写方式
            .delete(`${this.formSubUrl}${inbound_id.id}`)
            .then(res => {
              switch (res.data["status"]) {
                case "4002":
                  this.$notify.error({
                    title: "错误",
                    message: "操作失败"
                  });
                  break;
                case "2001":
                  this.$notify.success({
                    title: "成功",
                    message: "操作成功",
                    type: "success"
                  });
                  //刷新数据
                  this.getData();
                  break;

                default:
                  this.$notify.info({
                    title: "消息",
                    message: "请至少选择一项!"
                  });
                  break;
              }
            })
            .catch(err => {
              console.error(err);
            });
        })
        .catch(() => {});
    },
    //事件(编辑/新增)判断
    handleEvent(type, row) {
      //console.log(val);
      //判断传递的是编辑还是新增
      if (type === "addNew") {
        this.textTitle = "新增入库";
        this.formType = "newBound";
        //拷贝对象--解决切换有值问题
        this.form = Object.assign({}, row);
      } else {
        this.textTitle = "编辑订单";
        this.formType = "editBound";
        //将值拷贝到表单
        //status值需转换为字符串类型
        this.form = Object.assign({}, row);
        this.form.status = row.status.toString();
        this.form.id = row.id;
      }
    },
    //提交表单
    submitForm(name) {
      //console.log(this.formType);
      //if (this.formType == "editBound")
      this.$refs[name].validate(valid => {
        //输入验证
        if (valid) {
          //新增入库
          if (this.formType == "newBound") {
            this.axios_type = "post";
          }
          //编辑订单
          if (this.formType == "editBound") {
            this.axios_type = "put";
          }

          //axios发送--灵活变换更新或新增所用的不同http方法
          axios({
            method: this.axios_type,
            url:
              this.axios_type == "put"
                ? this.formSubUrl + this.form.id
                : this.formSubUrl,
            data: this.form
          })
            .then(res => {
              switch (res.data.status) {
                case "4001":
                  this.$notify.error({
                    title: "错误",
                    message: "输入数据有误"
                  });
                  break;
                case "4002":
                  this.$notify.error({
                    title: "错误",
                    message: "数据写入失败"
                  });
                  break;

                default:
                  this.$notify.success({
                    title: "成功",
                    message: "操作成功",
                    type: "success"
                  });
                  //重置表单
                  this.$refs[name].resetFields();
                  //关闭dialog
                  this.dialogFormVisible = false;
                  //刷新数据
                  this.getData();
                  break;
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  }
};
</script>

<style>
</style>
